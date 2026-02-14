const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(methodOverride('_method'))
const { v4:uuidv4 }=require('uuid');

 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

let posts=[
    {
        id:uuidv4(),
        username:"Adam",
        content:"Full stack development is still in demand"
    },
     {
        id:uuidv4(),
        username:"Xavir",
        content:"Checkout the AI generated funny videos"
    },
     {
        id:uuidv4(),
        username:"Amir",
        content:" Explore the the greneery tourist places here"
    },
    
]
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
 })

 app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
 })

app.post("/posts",(req,res)=>{
   let {username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content});
    res.redirect("/posts")
}) 
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    res.render("show.ejs",{post});
});
    
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
  let { content: newcontent } = req.body;
let post=posts.find((p)=> id === p.id);
    post.content=newcontent;
     res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
     let {id}=req.params;
     let post=posts.find((p)=> id === p.id);
     res.render("edit.ejs",{post});
    
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=> id!==p.id);
     res.redirect("/posts");
});
app.listen(port,()=>{
    console.log('server is listening on port '+port);
});
