const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js"); // it require the date.js and gets the module and store into date 

const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // this helps us to use the css in our website 

app.get("/", function(req, res){

    const day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items}); // it will send the value of day to the list.ejs file in views folder so that it can be render in the template file
});

app.post("/", function(req, res){
    const item = req.body.newItem; // we will get the value from the input box from the template

    if (req.body.list === "Work List"){
        workItems.push(item);
        res.redirect("/work"); // it will redirect to the work route and get trigger the app.get in work route and then render the value in the templete
    } else {
        items.push(item);
        res.redirect("/"); // it will redirect to the home route and get trigger the app.get in home route and then render the both value in the templete
    }
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
    const item= req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server started at port 3000");
});