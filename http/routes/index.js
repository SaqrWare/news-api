import {Router} from "express";
import v1API from "./v1";

const router = Router();

router.get("/", (req, res) => {
  res.json({message: "Welcome to our API !"});
});

router.use("/api/v1", v1API);

export default router;
