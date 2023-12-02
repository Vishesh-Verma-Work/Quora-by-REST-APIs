const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')

const { v4: uuidv4 } = require('uuid');

app.use(methodOverride('_method'))
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
        id : uuidv4(),
        username : "Vishesh",
        content : "I love web dev",
    },  
    {
        id : uuidv4(),
        username : "Gargi",
        content : "I love sleeping",
    },
    {
        id : uuidv4(),
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
    let id = uuidv4();
    posts.push({ id,username,content})
    res.redirect("/posts");
})
 
// fir yaha aae, yaha data add hua, ab chahate h sare post main wale pe show ho to use krenge res.redirect(url), upr use kiya hai

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((xyz) => id === xyz.id);
    res.render("show.ejs" , {post});
});

app.patch("/posts/:id", (req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((xyz) => id === xyz.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req,res) =>{
    let {id} = req.params;
    let post = posts.find((xyz) => id === xyz.id);
    res.render("edit.ejs", {post}); 
})




// dlt req

app.delete("/posts/:id", (req,res) =>{
    let {id} = req.params;
    posts = posts.filter((xyz) => id !== xyz.id);
    res.redirect("/posts");
})