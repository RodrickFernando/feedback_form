const express = require("express");
const db = require('./database');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/feedback", (req, res) => {
    console.log("the feedback form is provided");
    res.render('index');
});

app.post('/feedback', (req, res) => {
    const { name, feedback } = req.body;
    db.run('INSERT INTO users (name, feedback) VALUES (?, ?)', [name, feedback], (err) => {
        if (err) {
            return res.send('error inserting data into database');
        }
        res.send("Data inserted successfully");
        res.json({
            status: true,
            message: 'Registration is successful',
            redirect: nextform
        });
    }); 
});
    
app.get('/viewfeedback', (req, res) => {
    db.all('SELECT id, name, feedback FROM users', [], (err, data) => {
        if (err){
            res.send('error displaying data');
        }else{
        console.log(data);
        res.render('registrations', {
            registrations: data
        });
    }
    });
});

app.get("/delete", (req, res) => {
    console.log("the delete form is provided");
    res.render('index');
});

app.post ('/delete', (req, res) => {
    const idToDelete = req.body.deleteId;
    db.run('DELETE FROM users WHERE id = ?', idToDelete, (err) =>{
        if (err){
            res.send('error deleting data');
        }else{
            res.redirect('/viewfeedback');
        }
    });
});



const port = 8000;
app.listen(port, () => {
    console.log('Server started');
});