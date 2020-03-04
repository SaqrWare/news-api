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
    postData.forEach(async (item) => await Post.remove({_id: item._id}).exec());
  });

  it('Should return all data', async () => {
    const result = await PostService.list({}, {});
    expect(result).to.have.lengthOf(5);
  });

  it('Should filter by title', async () => {
    const result = await PostService.list({title: "ornare"}, {});
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("ornare suspendisse sed");
  });

  it('Should filter by date', async () => {
    const result = await PostService.list({date: "2020-03-01"}, {});
    expect(result).to.have.lengthOf(1);
    expect(result[0].title).to.equal("felis eget velit");
  });

  it('Should sort by date', async () => {
    const result = await PostService.list({}, {sort: "date"});
    expect(result[0]._id.toString()).to.equal("5e5f34191d4a9139b6b1096b");
    expect(result[1]._id.toString()).to.equal("5e5f33b11d4a9139b6b10969");
  });

  it('Should sort by title', async () => {
    const result = await PostService.list({}, {sort: "title"});
    expect(result[0]._id.toString()).to.equal("5e5f33671d4a9139b6b10968");
    expect(result[1]._id.toString()).to.equal("5e5f34571d4a9139b6b1096c");
    expect(result[2]._id.toString()).to.equal("5e5f34191d4a9139b6b1096b");
    expect(result[3]._id.toString()).to.equal("5e5f33b11d4a9139b6b10969");
    expect(result[4]._id.toString()).to.equal("5e5f332f1d4a9139b6b10967");
  });

});
