const express = require("express");

const app = express();

//register view engine

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  const blogs = [
    {title : 'Intro to Ethereum', snippet: 'One stop guide to Ethereum'},
    {title : 'Intro to Ethereum', snippet: 'One stop guide to Ethereum'},
    {title : 'Intro to Ethereum', snippet: 'One stop guide to Ethereum'},
  ]
  res.render('index', {title : 'Home', blogs})
});

app.get("/about", (req, res) => {
  res.render('about', {title : 'about'})
});

app.get('/blogs/create', (req, res) => {
  res.render('create', {title : 'Create a new Blog'})
})

//404 -> If any route above doesnt match with the url requested by the user then following method will be fired. **POSITION OF BELOW CODE IS IMPORTANT. SHOULD BE AT LAST. WE ARE TELLING TO EXPRESS THAT -> IF NOTHING MATCHES EXECUTE BELOW.**
app.use((req, res) => {
    res.status(404).render('404', {title : '404'})
})

app.listen(3000, () => {
  console.log("Listening on port 8000");
});

//compare this code with the file 'serverAndClient/server.js'. Express make things a lot easier.
