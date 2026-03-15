import { validateInput } from "./CommonValidation.js";

export const MessageValidation = (req, res, next) => {
  const { message, image } = req.body;
  if (!message && !image) return;
  if (message && message.trim().length == 0) return;
  if (image && validateInput("image", image, "photo", res)) return;
  console.log("Message Validation done");
  next();
};
