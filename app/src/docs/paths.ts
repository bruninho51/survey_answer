import {
  authPath,
  mePath,
  usersPath,
  userPath
} from "./paths/";
    
export default {
  "/auth": authPath,
  "/me": mePath,
  "/user": usersPath,
  "/user/{id}": userPath
};