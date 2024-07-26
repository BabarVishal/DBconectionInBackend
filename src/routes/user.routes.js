import { Router } from "express";
import { loginUser, logOut, registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middleware/malter.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1
      },
      {
        name: "coverImage",
        maxCount: 1 
      }
    ]),
    registerUser
);

router.route("/Login").post(
  loginUser
)

//secured routes
router.route("/logOut").post(
 verifyJWT, logOut
)

export { router as userRouter };
