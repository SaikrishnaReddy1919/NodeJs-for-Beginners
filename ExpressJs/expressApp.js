const express = require("express");
const morgon = require("morgan");
const mongoose = require("mongoose");
// const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

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

//register view engine
app.set("view engine", "ejs");

//middleware & static files -> images, .css etc...
app.use(express.static("views/partials/public"));
//provide the full path of a folder you want to make public.

//All the data will be added to request object. -> req.body
app.use(express.urlencoded({ extended: true }));

//using morgon
app.use(morgon("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});


//blogroutes
app.use('/blogs', blogRoutes)

app.get("/about", (req, res) => {
  res.render("about", { title: "about" });
});
//404 -> If any route above doesnt match with the url requested by the user then following method will be fired. **POSITION OF BELOW CODE IS IMPORTANT. SHOULD BE AT LAST. WE ARE TELLING TO EXPRESS THAT -> IF NOTHING MATCHES EXECUTE BELOW.**
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

//compare this code with the file 'serverAndClient/server.js'. Express make things a lot easier.
