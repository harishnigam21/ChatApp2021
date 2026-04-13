import { validateInput } from "./CommonValidation.js";

export const MessageValidation = (req, res, next) => {
  const { message, media } = req.body;
  if (!message && media.length==0) return;
  if (message && message.trim().length == 0) return;
  // if (media && validateInput("image", image, "photo", res)) return;
  console.log("Message Validation done");
  next();
};
