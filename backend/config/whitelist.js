import { envList } from "../envConfig.js";

//whishlist, only this origin can have access to our backend
export const whitelist = [envList.FRONTEND_HOST];
