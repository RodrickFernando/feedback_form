const express = require("express")
const db = require('./database')
const app = express()



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.get ("/", (req,res) =>{
    console.log("the feedback form is provided")
    res.render('index');
})

app.post('/feedback', (req, res) => {
    const {name, feedback} = req.body;
    db.run('INSERT INTO users (name, feedback) VALUES (?, ?)', [name, feedback], (err) => {
        if (err){
            return res.send('error inserting data into database');
        }
        res.send("Data inserted sucessfully");
    });
});

app.listen(8000)