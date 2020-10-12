const express = require("express");
const morgon = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { render } = require("ejs");

const app = express();

//connect to db
const DB_URI =
  "mongodb+srv://krishna:Mongodb1919@@ecommerce.wxheo.mongodb.net/Node-tuts";

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("Connected to DB");
      console.log("Listening on port 8000");
    });
  })
  .catch((err) => console.log(err));

//add a new blog
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "New Blog",
    snippet: "About my new blog",
    body: "More about my new blog",
  });
  const blog2 = new Blog({
    title: "New Blog 2",
    snippet: "About my new blog",
    body: "More about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));

  blog2
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

//get all blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//get single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("5f83d21c67e66e7ac3972ffe")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//------------------------------

//register view engine
app.set("view engine", "ejs");

//middleware
// app.use((req, res, next) => {
//   console.log('New request was made')
//   console.log("host : ", req.hostname)
//   console.log("path : ", req.path)
//   console.log('method : ', req.method)
//   next()
// })

//using morgon
app.use(morgon("dev"));

//middleware & static files -> images, .css etc...
app.use(express.static("views/partials/public"));
//provide the full path of a folder you want to make public.

//All the data will be added to request object. -> req.body
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});

//blog-routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => console.log(err));
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.json({
        redirect : '/blogs'
      })
    })
    .catch((err) => console.log(err));
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404 -> If any route above doesnt match with the url requested by the user then following method will be fired. **POSITION OF BELOW CODE IS IMPORTANT. SHOULD BE AT LAST. WE ARE TELLING TO EXPRESS THAT -> IF NOTHING MATCHES EXECUTE BELOW.**
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

//compare this code with the file 'serverAndClient/server.js'. Express make things a lot easier.
