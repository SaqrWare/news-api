# News API

### Requirements
- Nodejs 8+ (Recommended: 12)
- MongoDB server: 3.6+
___

### Environment variables
- MONGODB_URI: mongodb connection link (default: `mongodb://localhost/news-api-dev`)
- DEBUG_MONGO: TRUE or FALSE, to choose viewing queries while running (default: `TRUE`)
- PORT: http listening port (default: `3000`)
___

### Start
First install modules using the following command

```bash
npm install
```

then run the server
```bash
npm start
```

___

### API

#### List Posts

URL: /api/v1/post  
Method: GET  
Queries:
- title: filters posts with titles, only lists ones with title that contains or exactly matches the keyword
- date: takes date format and filters posts with the same date example `2020-02--2`
- sort: sorting fields which are `date (default)` and `title`
- order: choose ordering method which are `asc (default)` and `desc`

#### Get one post
URL: /api/v1/post{id}  
Method: GET  
Parameters: 
- id: String

#### Create Post

URL: /api/v1/post  
Method: POST  
Data Type: application/json  
Body Data:
- tite: String
- description: String
- text: String

#### Update Post

URL: /api/v1/post/{id}  
Method: PUT  
Data Type: application/json  
Parameters: 
- id: String  
  
Body Data:
- tite: String
- description: String
- text: String


#### Delete Post
URL: /api/v1/post/{id}  
Method: DELETE


___

### Test 

This project test doesn't include in memory database so you need a running test MongoDB server before you start, it's also recommended to update env var `MONGODB_URI` to make sure you don't test on an existed database

in order to run test run the following command
```bash
npm test
``` 
___

### Note

This project have a text search using MongoDB, it's recommended  to use text indexing server like ElasticSearch in this feature, documents on ElasticSearch should have references to MongoDB documents.
