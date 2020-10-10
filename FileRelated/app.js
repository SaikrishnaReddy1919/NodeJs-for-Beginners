const {
  deleteFile,
  readFile,
  createAndWriteToFile,
  appendToFile,
  readIntoBuffer,
} = require("./fileOperations/fileOperations");

const {
  hashFileData, appendDataFromUser,
} = require("./fileOperations/readfromtheuser");

deleteFile();

readFile();

createAndWriteToFile();
//This will replace all the data inside the file with the data you want.

appendToFile();
//this line will append the data to the existing data isside a file.

readIntoBuffer();

appendDataFromUser();

hashFileData();
