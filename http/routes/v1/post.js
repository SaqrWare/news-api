import {Router} from "express";
import {create, list, remove, update} from "../../../services/post";
import {validatePostFound, validateRequiredFields, validateTitleNotUsed} from "../../middleware/validations";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const {title, date, sort, order} = req.query;
    const posts = await list({title, date}, {sort, order});
    res.json(posts)
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validatePostFound, async (req, res, next) => {
  try {
    res.json(req.post);
  } catch (e) {
    next(e);
  }
});


router.post("/", validateRequiredFields, validateTitleNotUsed, async (req, res, next) => {
  try {
    const {title, description, text} = req.body;

    // Insert in mongodb
    const post = await create({title, description, text});

    res.json(post);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validatePostFound, async (req, res, next) => {
  try {
    const {title, description, text} = req.body;

    // Update post
    const result = await update(req.post._id, {title, description, text});
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validatePostFound, async (req, res, next) => {
  try {
    // Delete post
    remove(req.post._id);
    res.json({message: "POST_DELETED"});
  } catch (e) {
    next(e);
  }
});

export default router;
