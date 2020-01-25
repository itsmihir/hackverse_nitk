var express = require("express");
var app = express();
var mongooes = require("mongoose");
var bodyParser = require("body-parser");
var route = require("route");


var PORT = process.env.PORT || 8080;


//mongodb configration
const db = require('./setup/myurl.js').mongoURL;
const contests = require('./models/contests');


mongooes
    .connect(db)
    .then(() => console.log("Mongodb connected successfully"))
    .catch(err => console.log(err))

//@type GET
//@route /contests
//@desc route to get all the contests
//@access PUBLIC

app.get('/contests', (req, res) => {

    contests.find().then(contest => {
            res.send(contest);
        })
        .catch(err => console.log('error in displaying the contest' + err))

});


//@type POST
//@route /register
//@desc route to register in contest
//@access PUBLIC

app.post('/register', (req, res) => {

});


app.listen(PORT, () => console.log(`server is running at port ${PORT}`));