import mongoose from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import { io, userSocketMap } from "../server.js";
export const getRelativeUsers = async (req, res) => {
  try {
    const getUsers = await User.find({ _id: { $ne: req.user.id } })
      .select("-__v -createdAt -updatedAt")
      .lean();

    const unSeenMessages = {};
    const promises = getUsers.map(async (user) => {
      const messages = await Message.find({
        sender_id: user._id,
        receiver_id: req.user.id,
        seen: false,
      });
      if (messages.length > 0) {
        unSeenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    console.log("Successfully got relative user and their unseen messages");
    return res.status(200).json({
      message: "Successfully got relative user and their unseen messages",
      data: { user: getUsers, unseen: unSeenMessages },
    });
  } catch (error) {
    console.error("Error from getRelativeUsers Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getRelativeMessages = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const messages = await Message.find(
      {
        $or: [
          {
            sender_id: req.params.id,
            receiver_id: req.user.id,
          },
          {
            sender_id: req.user.id,
            receiver_id: req.params.id,
          },
        ],
      },
      null,
      { session },
    ).lean();
    await Message.updateMany(
      { sender_id: req.params.id, receiver_id: req.user.id },
      { seen: true },
      { session },
    );
    await session.commitTransaction();
    const senderSocketId = userSocketMap[req.params.id];
    if (senderSocketId) {
      io.to(senderSocketId).emit("allMessageSeen", req.user.id);
    }
    console.log("Successfully got relative messages");
    return res
      .status(200)
      .json({ message: "Successfully got relative messages", data: messages });
  } catch (error) {
    await session.abortTransaction();
    console.error("Error from getRelativeMessages Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await session.endSession();
  }
};

export const sendMessage = async (req, res) => {
  const { image, message } = req.body;
  try {
    let imageUrl = null;
    if (image) {
      const upload = await cloudinary.uploader.upload(image);
      imageUrl = upload.secure_url;
    }
    const newMessage = await Message.create({
      sender_id: req.user.id,
      receiver_id: req.params.id,
      message: message || "",
      image: imageUrl,
    });

    const receiverSocketId = userSocketMap[req.params.id];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    console.log("Successfully sended message");
    return res
      .status(201)
      .json({ message: "Successfully sended message", data: newMessage });
  } catch (error) {
    console.error("Error from sendMessage Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const markSeen = async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: req.params.id, receiver_id: req.user.id },
      { $set: { seen: true } },
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedMessage) {
      return res.status(404).json({ message: "message not found!" });
    }
    const senderSocketId = userSocketMap[updatedMessage.sender_id];
    if (senderSocketId) {
      const id = updatedMessage._id.toString();
      io.to(senderSocketId).emit("someMessageSeen", id);
    }
    console.log("unseen ----> seen");
    return res.status(200).json({ message: "unseen ----> seen" });
  } catch (error) {
    console.error("Error from markSeen Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
