import {whitelist} from "../../config/whitelist.js";
//This middleware checks request coming, is included in our whitelist or not, this handles CORS 
const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};
export default credentials;
