import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
export const updateProfile = async (req, res) => {
  const { name, bio, pic, banner } = req.body;
  try {
    const toUpdate = {};
    if (name) {
      toUpdate["name"] = name;
    }
    if (bio) {
      toUpdate["bio"] = bio;
    }//TODO:What if the data of image is sended is not in base64 format
    if (pic) {
      const upload = await cloudinary.uploader.upload(pic);
      const imageUrl = upload.secure_url;
      toUpdate["pic"] = imageUrl;
    }
    if (banner) {
      const upload = await cloudinary.uploader.upload(banner);
      const imageUrl = upload.secure_url;
      toUpdate["banner"] = imageUrl;
    }
    if (Object.keys(toUpdate).length <= 0) {
      return res.status(304).json({ message: "Nothing to update" });
    }
    const update = await User.findByIdAndUpdate(
      req.user.id,
      { $set: toUpdate },
      { returnDocument: "after", runValidators: true },
    )
      .select("-createdAt -updatedAt -__v")
      .lean();
    console.log("Successfully Updated Profile");
    return res
      .status(200)
      .json({ message: "Successfully Updated Profile", data: update });
  } catch (error) {
    console.error("Error from updateProfile Controller : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
