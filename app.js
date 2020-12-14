const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(fileUpload())

app.get('/',(req,res)=>{
    res.send('welcome to upload handler<br>POST uploads to /upload as multipart-form')
})

app.post('/upload',(req,res)=>{
    if(req.files === null) {
        return res.status(400).json({msg: 'no file was specified'})
    }
    const file = req.files.file
    file.mv(`${__dirname}/uploads/${file.name}`,err=> {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({"uploaded": file.name})
    })
})