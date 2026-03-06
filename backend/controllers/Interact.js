import Request from "../models/Interact.js";
import User from "../models/User.js";
import Interact from "../models/Interact.js";
import mongoose from "mongoose";
export const follow = async (req, res) => {};
export const unfollow = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const followingExist = await User.findById(req.params.id)
      .session(session)
      .lean();
    if (!followingExist) {
      await session.abortTransaction();
      console.log(`following person doesn't exist`);
      return res
        .status(404)
        .json({ message: `following person doesn't exist` });
    }
    if (followingExist.following.some((id) => id.toString() == req.params.id)) {
      await Interact.deleteOne(
        {
          follower_id: req.user.id,
          following_id: req.params.id,
        },
        { session },
      );
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $pull: { followers: req.user.id },
        },
        { session },
      );
      const updatedList = await User.findByIdAndUpdate(
        req.user.id,
        {
          $pull: { following: req.params.id },
        },
        { returnDocument: "after", session },
      )
        .select("following")
        .lean();

      await session.commitTransaction();
      console.log("Successfully unFollowed");
      return res.status(200).json({
        message: "Successfully unFollowed",
        data: updatedList,
      });
    }
    await session.abortTransaction();
    console.log("You have not followed this person yet!");
    return res
      .status(406)
      .json({ message: "You have not followed this person yet!" });
  } catch (error) {
    await session.abortTransaction();
    console.log("Error from follow controller : ", error);
    return res.status(500).json("Internal Server Error");
  } finally {
    await session.endSession();
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
