const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000
const NodeClam = require('clamscan');
const ClamScan = new NodeClam().init();

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
    ClamScan.then(async clamscan => {
        try {
              // You can re-use the `clamscan` object as many times as you want
              clamscan.is_infected(`${__dirname}/uploads/${file.name}`).then(result => {
                  const {file, is_infected, viruses} =  result;
                  if (is_infected) console.log(`${file} is infected with ${viruses.join(', ')}.`);
                  else console.log("Sucess");
              }).then(err => {
                  console.error(err);
              })
          } catch (err) {
              // Handle any errors raised by the code in the try block
              console.error(err);
          }
      })
})


app.listen(port, ()=>console.log(`server started at ${port}`))