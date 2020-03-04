import Post from "../models/db/post"
import {ErrorHandler} from "../models/error/error-handler";
import moment from "moment";

export function list({title, date}, {sort = "date", order = "asc"}) {
  const querySort = {};
  const query = {};

  //sort
  if (sort !== "date" && sort !== "title") throw new ErrorHandler(400, "INVALID_SORT");
  if (order !== "desc" && order !== "asc") throw new ErrorHandler(400, "INVALID_ORDER");
  querySort[sort] = order;

  if (title)
    query.title = new RegExp(title, "i");

  // Parse formatted date
  if (date) {
    const dateMoment = moment(date, "YYYY-MM-DD");
    query.date = {
      $gte: dateMoment.toDate(),
      $lte: moment(dateMoment).endOf('day').toDate()
    }
  }

  return Post.find(query, {_id: 1, title: 1, description: 1, text: 1, date: 1})
    .sort(querySort)
    .exec();
}

export function getOne(id) {
  return Post.findOne({_id: id}, {_id: 1, title: 1, description: 1, text: 1, date: 1});
}

export function getOneByTitle(title) {
  return Post.findOne({title}, {_id: 1, title: 1, description: 1, text: 1, date: 1})
}

export function create(postJSON) {
  return Post.create(postJSON);
}

export async function update(id, postJSON) {
  await Post.updateOne({_id: id}, {$set: postJSON}).exec();
  return await getOne(id);
}

export function remove(id) {
  return Post.deleteOne({_id: id}).exec();
}
