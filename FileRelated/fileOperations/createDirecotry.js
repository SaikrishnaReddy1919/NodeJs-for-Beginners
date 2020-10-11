const fs = require('fs')

//create directory if doesnt exist and remove if it exists.

if (!fs.existsSync('./assets')) {
    fs.mkdir('./assets', (err) => {
        if (err) console.log(err)
        console.log('Folder created.')
    })
} else {
    fs.rmdir('./assets', (err) => {
        if (err) console.log(err)
        console.log('Folder deleted.')
    })
}

//run this program to create and delete folder 'assets'