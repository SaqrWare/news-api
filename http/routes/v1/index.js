import {Router} from "express";
import PostRouter from "./post";

const router = Router();

router.use("/post", PostRouter);
export default router;
