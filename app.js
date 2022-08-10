const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const app = express();

const bodyParser = require("body-parser");
const fs = require("fs");
const createError = require("http-errors");
const passport = require("passport");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const model = require('./accountsmodel');

//app.set("views", path.join(__dirname, "views"));
app.engine("hbs", exphbs({ defaultLayout: false, extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var userLogin = {};

app.get("/", (req, res) => {
    res.render("landing", {
        title:"landing",
    });
});


app.post("/api/login", async (req, res) => {
    let username = req.body.name;
    const user = await model.getAccount(username);
    if (user) {
        if (user.password == req.body.password) {
            userLogin = req.body;
            res.json({
                    status: "y",
                    meg: "login success",
                    data: username,
                });
        } else {
                res.json({
                    status: "err",
                    meg: "wrong password ",
                });
        }
    } else {
            res.json({
                status: "n",
                meg: "no such user ",
            });
    }
});

app.get("/index", async (req, res) => {
    if (userLogin.name) {
        const booksList = await model.getBookList();
        res.render("index", { username: userLogin.name, books: booksList });
    } else {
        res.render("login");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/logout", (req, res) => {
    res.render("login", {});
});

app.get("/quittolanding", (req, res) => {
    res.render("landing", {});
});

app.put("/borrow", async (req, res) => {
    const book = req.body;

    model.updateBook(book.value, book.available);

    console.log('Data written to mongodb!');
    res.status(204).end();
});

app.put("/return", (req, res) => {
    const book = req.body;

    model.updateBook(book.value, book.available);

    console.log('Data written to mongodb!');
    res.status(204).end();
});

// const MongoClient = require('mongodb').MongoClient; 

// const db = client.db(lib1)
// exports.borrowreturn = function (req,resp) {
//     let book = req.body;
  
//     let data = [book.borrow];
//     db.base(sql,data,(result) =>{
//         if(result.affectedRows == 1){
//             let avaliable = req.body.true;
//             resp.redirect('/')
//         }
//     })
// };
// let avaliable = req.body.true;

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on:`, port));