const fs = require('fs')

const readStream = fs.createReadStream('./blog.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./blog1.txt')

//data event : every time we get chunk of data we use that chunk in call back
// readStream.on('data', (chunk) => {
//     console.log("-------New Chunk-------")
//     console.log(chunk)
//     writeStream.write('\n NEW CHUNK \n')
//     writeStream.write(chunk)
// })

//piping -> alternative to above code in just one line.
readStream.pipe(writeStream)

