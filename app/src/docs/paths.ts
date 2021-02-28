import {
  authPath,
  mePath,
  usersPath,
  userPath,
  surveyPath,
  surveysPath,
  answersPath
} from "./paths/";
    
export default {
  "/auth": authPath,
  "/me": mePath,
  "/user": usersPath,
  "/user/{id}": userPath,
  "/survey/{id}": surveyPath,
  "/survey": surveysPath,
  "/answer": answersPath
};