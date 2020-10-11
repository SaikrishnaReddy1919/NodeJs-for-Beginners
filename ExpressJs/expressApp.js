const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.sendFile("./routes/home.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./routes/about.html", { root: __dirname });
});

//redirect
app.get("/about-us", (req, res) => {
    res.redirect('/about')
})

//404 -> If any route above doesnt match with the url requested by the user then following method will be fired. **POSITION OF BELOW CODE IS IMPORTANT. SHOULD BE AT LAST. WE ARE TELLING TO EXPRESS THAT -> IF NOTHING MATCHES EXECUTE BELOW.**
app.use((req, res) => {
    res.status(404).sendFile("./routes/404.html", { root: __dirname })
})

app.listen(3000, () => {
  const dir = __dirname;
  console.log(dir, "Listening on port 8000");
});

//compare this code with the file 'serverAndClient/server.js'. Express make things a lot easier.
