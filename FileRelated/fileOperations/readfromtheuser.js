const fs = require("fs");
const prompt = require("prompt");
const sha1 = require('sha1')

prompt.start();

const appendDataFromUser = () => {
  prompt.get(["content"], (err, result) => {
    if (err) return err;
    console.log(`Content received is  : ${result.content}`);
    fs.appendFile("fileOperations/output.txt", result.content + '\n', (err) => {
      if (err) {
        throw err;
      }
      console.log(`Data has been appended to the file`);
    });
  });
};

let buffer = new Buffer.alloc(1024);
const hashFileData = () => {
    fs.open("fileOperations/output.txt", "r", (err, fd) => {
        if (err) throw err;
        //   console.log(fd)
        fs.read(fd, buffer, 0, buffer.length, null, (err, bytesRead, buffer) => {
            if (err) {
                console.log(err);
            }
            console.log(`Bytes read is : ${bytesRead}`);
            console.log(`Buffer is : \n${buffer.toString()}`);
            const hashData = sha1(buffer)
            console.log(`Hash of file data is : ${hashData}`)
        });
    })
}

module.exports = { appendDataFromUser, hashFileData }
