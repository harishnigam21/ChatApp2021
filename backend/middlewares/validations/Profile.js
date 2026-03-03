import { validateInput } from "./CommonValidation.js";
export const updateValidation = (req, res, next) => {
  const { pic, bio, name, banner } = req.body;
  if (validateInput("name", name, res)) return;
  if (pic && validateInput("image", pic, "pic", res)) return;
  if (banner && validateInput("image", banner, "banner", res)) return;
  console.log("Profile Validation done");
  next();
};
