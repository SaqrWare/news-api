import {getOne, getOneByTitle} from "../../services/post";
import {ErrorHandler} from "../../models/error/error-handler";

export async function validatePostFound(req, res, next) {
  try {
    const {id} = req.params;

    // Handle post not found
    const post = await getOne(id);
    if (!post) throw new ErrorHandler(404, 'ENTITY_NOTFOUND');
    req.post = post;
    next()
  } catch (e) {
    next(e)
  }
}

export async function validateTitleNotUsed(req, res, next) {
  try {
    const {id} = req.params;
    const {title} = req.body;

    // Handle post with same title before
    const post = await getOneByTitle(title);
    if (post && !post._id.equals(id)) throw new ErrorHandler(400, 'TITLE_USED');

    next()
  } catch (e) {
    next(e)
  }
}

export async function validateRequiredFields(req, res, next) {
  try {
    const {title, description, text} = req.body;

    // Error FIELD_REQUIRED means field or more are required
    if (!title || !description || !text) throw new ErrorHandler(400, 'FIELDS_REQUIRED');

    next()
  } catch (e) {
    next(e)
  }
}
