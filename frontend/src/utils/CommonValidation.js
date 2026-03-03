import toast from "react-hot-toast";
import { envList } from "../../envConfig";
import { convertToByte } from "./byteConversion";

export const sendError = (error) => {
  toast.error(error);
  return true;
};
export const validateInput = (type, value, valueType) => {
  const patterns = {
    password:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-])[^\s]{8,}$/,
    name: /^[a-zA-Z][a-zA-Z\s\-']{1,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  switch (type) {
    case "password":
      if (!value) return sendError("Password is required.");
      if (/\s/.test(value)) return sendError("Password cannot contain spaces.");
      if (!/(?=.*[A-Z])/.test(value))
        return sendError("Password needs at least one capital letter.");
      if (!/(?=.*\d)/.test(value))
        return sendError("Password needs at least one number.");
      if (!/(?=.*[!@#$%^&*()_+])/.test(value))
        return sendError("Password needs at least one symbol.");
      if (value.length < 8)
        return sendError("Password must be at least 8 characters long.");
      break;

    case "email":
      if (!value) return sendError("Email is required.");
      if (!patterns.email.test(value))
        return sendError("Please enter a valid email addreds.");
      break;

    case "name":
      if (!value || value.trim().length < 2 || !patterns.name.test(value)) {
        return sendError(`Invalid --> ${value ? value : "name not provided"}`);
      }
      break;

    case "image":
      const typeSize =
        valueType == "pic"
          ? envList.MAX_PIC_SIZE
          : valueType == "banner"
            ? envList.MAX_BANNER_SIZE
            : envList.MAX_PHOTO_SIZE;
      const maxSize = convertToByte(typeSize);
      const sizeInBytes = value.size;
      if (sizeInBytes > maxSize) {
        return sendError(`${valueType} is too large (Max ${typeSize})`);
      }

      const allowedTypes = envList.IMAGE_FORMAT_ALLOWED.split(",");
      const mimeType = value.split(";")[0].split(":")[1]; // "image/jpeg"
      const extension = mimeType.split("/")[1]; // "jpeg"
      if (!allowedTypes.includes(extension)) {
        const types = allowedTypes.map((val) => val.split("/")[1]).join(", ");
        return sendError(`Invalid format. Only ${types} are allowed.`);
      }
      break;
  }
  return false;
};
