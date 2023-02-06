const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

const bodyparser = require("body-parser");
//parse app /x.www form urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());
//setup empty js object
projectdata = {};
//initialize the main folder   الي هيعمل req من علي طريق ده
app.use(express.static("front end"));
//call back function to complete get '/all'
const getall = (req, res) => res.status(200).send(projectdata);
//get route
app.get("/all", getall);
//callback func to complete post 'all'
const postData = (req, res) => {
  projectdata = req.body;
  console.log(projectdata);
  res.status(200), send(projectdata);
};
app.post("/all", postData);

const port = 4000;
const hostname = "125.0.0.2";
//function to test server
const listening = () =>
  console.log(`server running at http:${hostname}:${port}/`);
app.listen(port, listening);
