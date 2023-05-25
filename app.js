const express = require("express");
const bodyParser = require("body-parser");
const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    let today = new Date();
    
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    
    let day = today.toLocaleDateString("en-US", option); // this will generate the today's date with the respective weekday

    res.render("list", {kindOfDay: day, newListItems: items}); // it will send the value of day to the list.ejs file in views folder so that it can be render in the template file
});

app.post("/", function(req, res){
    let item = req.body.newItem; // we will get the value from the input box from the template

    items.push(item);

    res.redirect("/"); // and the it will redirect to the home route and get trigger the app.get in home route adn then render the both value in the templete

    
});

app.listen(3000, function(){
    console.log("Server started at port 3000");
});