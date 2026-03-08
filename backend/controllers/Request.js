import Request from "../models/Request.js";
import User from "../models/User.js";
import Interact from "../models/Interact.js";
import mongoose from "mongoose";
export const allRequest = async (req, res) => {
  try {
    const request = await Request.find({
      $or: [{ sender_id: req.user.id }, { receiver_id: req.user.id }],
    }).lean();
    console.log("Fetched user request");
    return res.status(200).json({ message: "Fetched request", data: request });
  } catch (error) {
    await session.abortTransaction();
    console.log("Error from allRequest controller : ", error);
    return res.status(500).json("Internal Server Error");
  }
};
export const acceptRequest = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const requestExist = await Request.findOneAndUpdate({
      _id: req.params.id,
      receiver_id: req.user.id,
    }).session(session);
    if (!requestExist) {
      await session.abortTransaction();
      console.log("No such request Exist");
      return res.status(404).json({ message: "No such request Exist" });
    }
    await Interact.create(
      [
        {
          follower_id: requestExist.sender_id,
          following_id: requestExist.receiver_id,
        },
      ],
      { session },
    );
    await User.findByIdAndUpdate(
      requestExist.sender_id,
      {
        $addToSet: { following: requestExist.receiver_id },
      },
      { returnDocument: "after", session },
    );
    const updatedList = await User.findByIdAndUpdate(
      requestExist.receiver_id,
      {
        $addToSet: { followers: requestExist.sender_id },
      },
      { returnDocument: "after", session },
    )
      .select("following")
      .lean();

    requestExist.status = "accepted";
    await requestExist.save({ session });
    await session.commitTransaction();
    console.log("Successfully Accepted  Request.");
    return res
      .status(201)
      .json({ message: "Successfully Accepted  Request.", data: updatedList });
  } catch (error) {
    await session.abortTransaction();
    console.log("Error from acceptRequest controller : ", error);
    return res.status(500).json("Internal Server Error");
  } finally {
    await session.endSession();
  }
};
export const rejectRequest = async (req, res) => {
  try {
    const requestExist = await Request.findOneAndUpdate({
      _id: req.params.id,
      receiver_id: req.user.id,
    });
    if (!requestExist) {
      console.log("No such request Exist");
      return res.status(404).json({ message: "No such request Exist" });
    }
    requestExist.status = "rejected";
    await requestExist.save();
    console.log("Successfully Rejected  Request.");
    return res
      .status(200)
      .json({ message: "Successfully Rejected  Request.", data: updatedList });
  } catch (error) {
    console.log("Error from rejectRequest controller : ", error);
    return res.status(500).json("Internal Server Error");
  }
};
