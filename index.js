const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded ({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));

let port = 8080;

app.listen(port, ()=> {
    console.log(`Server is listening on port : ${port}`);
});


let posts =[
    {
        username : "Vishesh",
        content : "I love web dev",
    },
    {
        username : "Gargi",
        content : "I love sleeping",
    },
    {
        username : "aman",
        content : "I love outdoor games",
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs" , { posts});
})
