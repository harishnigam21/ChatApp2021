export const MessageValidation = (req, res, next) => {
  const { message, image } = req.body;
  if (!message && !image) return;
  if (message && message.trim().length == 0) return;
  if (image && image.trim().length == 0) return;
  console.log("Message Validation done");
  next();
};
