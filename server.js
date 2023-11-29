const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.get ("/", (req,res) =>{
    console.log("the feedback form is provided")
    res.render('index')
})

app.listen(8000)