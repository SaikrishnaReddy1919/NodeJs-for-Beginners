const fs = require("fs");

//module required to accept input from the user

const deleteFile = () => {
  fs.unlink("output.txt", (err, success) => {
    console.log("file removed successfully");
  });
};

const readFile = () => {
  fs.readFile("../output.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
};

//reading content into the buffer:
let buffer = new Buffer.alloc(1024);
const readIntoBuffer = () => {
  fs.open("./output.txt", "r", (err, fd) => {
    if (err) throw err;
    //   console.log(fd)
    fs.read(fd, buffer, 0, buffer.length, null, (err, bytesRead, buffer) => {
      if (err) {
        console.log(err);
      }
      console.log(`Bytes read is : ${bytesRead}`);
      console.log(`Buffer is : \n${buffer.toString()}`);
    });
  });
};

//reading content from the command line and append it to the file


const createAndWriteToFile = () => {
  fs.writeFile("output.txt", "Saikrishna", (err) => {
    if (err) {
      throw err;
    }
    console.log(`File created and data has been replaced`);
  });
};

const appendToFile = () => {
  fs.appendFile("./output.txt", "Saikrishna-reddy \n", (err) => {
    if (err) {
      throw err;
    }
    console.log(`Data has been appended to the file`);
  });
};

module.exports = {
  deleteFile,
  readFile,
  createAndWriteToFile,
  appendToFile,
  readIntoBuffer,
};
