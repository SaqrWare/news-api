const esImport = require("esm")(module);
const DATABASE = esImport("../config/db").DATABASE;
const postData = require("./data/posts");

const Post = esImport("../models/db/post").default;
const PostService = esImport("../services/post");

const expect = require("chai").expect;
const mongoose = require("mongoose");

mongoose.connect(DATABASE.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

describe('Test Post Service', function () {

  before(async () => {
    console.log("Inserting sample data ...");
    //Insert test data
    await Post.create(postData);
  });

  after(async () => {
    //Delete used data
    postData.forEach(async (item) => await Post.deleteOne({_id: item._id}).exec());
  });

  it('Should return all data', async () => {
    // List all items
    const result = await PostService.list({}, {});

    // Check all items are listed with size of 5
    expect(result).to.have.lengthOf(5);
  });

  it('Should filter by title', async () => {
    // Filter by title
    const result = await PostService.list({title: "ornare"}, {});

    // Check the listed item is the correct one
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("ornare suspendisse sed");
  });

  it('Should filter by date', async () => {
    // Filter by specific date
    const result = await PostService.list({date: "2020-03-01"}, {});

    // Check the listed item is the correct one
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("felis eget velit");
  });

  it('Should sort by date', async () => {

    // Sort by date
    const result = await PostService.list({}, {sort: "date"});

    // Check data is sorted by date
    expect(result[0]._id.toString()).to.equal("5e5f34191d4a9139b6b1096b");
    expect(result[1]._id.toString()).to.equal("5e5f33b11d4a9139b6b10969");
  });

  it('Should sort by title', async () => {

    // Sort by title
    const result = await PostService.list({}, {sort: "title"});

    // Check titles are sorted correctly asc
    expect(result[0]._id.toString()).to.equal("5e5f33671d4a9139b6b10968");
    expect(result[1]._id.toString()).to.equal("5e5f34571d4a9139b6b1096c");
    expect(result[2]._id.toString()).to.equal("5e5f34191d4a9139b6b1096b");
    expect(result[3]._id.toString()).to.equal("5e5f33b11d4a9139b6b10969");
    expect(result[4]._id.toString()).to.equal("5e5f332f1d4a9139b6b10967");
  });

  it('Should get one specifc post', async () => {

    // Get one post with id & check with the correct title
    const result = await PostService.getOne("5e5f33671d4a9139b6b10968");
    expect(result.title).to.equal("ante in nibh");
  });

  it('Should create post ', async () => {

    // Insert post with dummy data
    const result = await PostService.create({
      title: "test title",
      description: "test description",
      text: "test text"
    });

    // Check the post existed
    const searchPost = await PostService.getOne(result._id);
    expect(searchPost.title).to.equal("test title");

    //Clean
    await Post.deleteOne({_id: result._id}).exec()
  });

  it('Should update post', async () => {
    // Update post
    const result = await PostService.update("5e5f332f1d4a9139b6b10967", {
      title: "test title",
      description: "test description",
      text: "test text"
    });

    // Check data updated with the same input
    const searchPost = await PostService.getOne(result._id);
    expect(searchPost.title).to.equal("test title");
    expect(searchPost.description).to.equal("test description");
    expect(searchPost.text).to.equal("test text");
  });

  it('Should delete post', async () => {
    // Delete one post
    await PostService.remove("5e5f332f1d4a9139b6b10967");

    // Check post not listed
    const resultList = await PostService.list({}, {});
    expect(resultList).to.have.lengthOf(4);

    // Check post not found
    const resultOne = await PostService.getOne("5e5f332f1d4a9139b6b10967");
    expect(resultOne).to.be.null;
  });
});
