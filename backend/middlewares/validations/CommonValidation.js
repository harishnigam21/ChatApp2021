import { envList } from "../../envConfig.js";
import { convertToByte } from "../../utils/byteConversion.js";

export const sendError = (error, res) => {
  console.error(error);
  res.status(422).json({ message: error });
  return true;
};
export const validateInput = (type, value, res) => {
  const patterns = {
    password:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-])[^\s]{8,}$/,
    name: /^[a-zA-Z][a-zA-Z\s\-']{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  switch (type) {
    case "password":
      if (!value) return sendError("Password is required.", res);
      if (/\s/.test(value))
        return sendError("Password cannot contain spaces.", res);
      if (!/(?=.*[A-Z])/.test(value))
        return sendError("Password needs at least one capital letter.", res);
      if (!/(?=.*\d)/.test(value))
        return sendError("Password needs at least one number.", res);
      if (!/(?=.*[!@#$%^&*()_+])/.test(value))
        return sendError("Password needs at least one symbol.", res);
      if (value.length < 8)
        return sendError("Password must be at least 8 characters long.", res);
      break;

    case "email":
      if (!value) return sendError("Email is required.", res);
      if (!patterns.email.test(value))
        return sendError("Please enter a valid email address.", res);
      break;

    case "name":
      if (!value || value.trim().length < 2 || !patterns.name.test(value)) {
        return sendError(
          `Invalid Name : ${value ? value : "not provided"}`,
          res,
        );
      }
      break;

    case "image":
      const maxSize = convertToByte(envList.MAX_IMAGE_SIZE);
      if (value.size > maxSize) {
        return sendError(
          `File is too large (Max ${envList.MAX_IMAGE_SIZE})`,
          res,
        );
      }
      const allowedTypes = envList.IMAGE_FORMAT_ALLOWED.split(",");
      if (!allowedTypes.includes(value.type)) {
        const types = allowedTypes.map((val) => val.split("/")[1]).join(", ");
        return sendError(`Invalid format. Only ${types} are allowed.`, res);
      }
      break;
  }
  return false;
};
