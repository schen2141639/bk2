const { MongoClient } = require("mongodb");

// Cloud DB
 //const url =
 mongodb+srv://dbadmin:dbadmin@cluster0.k6rv9.mongodb.net/myFirstDatabase?/retryWrites=true&w=majority"; 

// Local DB
//const url = 'mongodb://localhost:27017/';


const getAccount = async (username) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  console.log("Connected to DB.");
  const db = client.db("ko1");
  const Users = db.collection("users");
  const User = await Users.findOne({username: username});
  console.log(User);
  return User;
};



const getBookList = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db("ko1");
  const Books = db.collection("lib1");
  const BookList = await Books.find().toArray();
  return BookList;
};

const getBooksJson = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db("ko1");
  const Books = db.collection("lib1");
  let BooksJson = await Books.find().toArray();
  //BooksJson = BooksJson.toString();
  console.log(BooksJson);
  return BooksJson;
};

const getBook = async (condition) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  // Choose the database to use
  const db = client.db("ko1");

  // Choose the collection.
  const Books = db.collection("lib1");

  //console.log(condition);

  const Book = await Books.findOne(condition);

  //console.log(Book);

  return Book;
};

const getBookNumber = async () => {
  // Connect to the MongoDB server.
  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  // Choose the database to use
  const db = client.db("ko1");

  // Choose the collection.
  const Books = db.collection("lib1");
  constavailable = available[0].true;
  constavailable = available[0].false;

};

const updateBook = async (code, available) => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });

  // Choose the database to use
  const db = client.db("ko1");

  // Choose the collection.
  const Books = db.collection("lib1");

  console.log(code);
  console.log(available);

  const Book = await Books.findOneAndUpdate({code: code}, {$set: {available: available}});

  //console.log(Book);

  return Book;
};

module.exports = { getAccount, getBookList, getBook, getBookNumber, updateBook, getBooksJson };
