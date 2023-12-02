const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded ({extended : true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let port = 8080;

app.listen(port, ()=> {
    console.log(`Server is listening on port : ${port}`);
});


let posts =[
    {
        id : "1a",
        username : "Vishesh",
        content : "I love web dev",
    },  
    {
        id : "2b",
        username : "Gargi",
        content : "I love sleeping",
    },
    {
        id : "3c",
        username : "aman",
        content : "I love outdoor games",
    }
]

app.get("/posts", (req,res) => {
    res.render("index.ejs" , { posts});
})


app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
})

// /posts/new kon req gyi to form khul gya, uske baad data add hua

app.post("/posts", (req,res) => {
    let {username , content} = req.body;
    posts.push({username,content})
    res.redirect("/posts");
})
 
// fir yaha aae, yaha data add hua, ab chahate h sare post main wale pe show ho to use krenge res.redirect(url), upr use kiya hai

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((xyz) => id === xyz.id);
    res.render("show.ejs" , {post});
});