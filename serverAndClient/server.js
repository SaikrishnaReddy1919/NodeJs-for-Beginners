const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method);

  //set header content type
  // res.setHeader('Content-Type', 'text/plain')
  // res.write('Hello, World')
  //res.end()

  //html
  // res.setHeader('Content-Type', 'text/html')
  // res.write('<h1>Hello World</h1>')
  // res.write('<h1>Hello Alien</h1>')
  // res.end()

  //use a file to send html
  res.setHeader("Content-Type", "text/html");

  let path = "./";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }
  // console.log(path)
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(8000, "localhost", () => {
  console.log("Listening for requets on port 8000");
});
