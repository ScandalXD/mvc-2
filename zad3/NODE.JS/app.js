
const express = require('express');
const fs = require('fs');


const app = express();


const PORT = 3000;


app.use(express.static('views'));


function renderPage(filePath, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
}


app.get('/', (req, res) => {
    renderPage(__dirname + '/views/home.html', res);
});

app.get('/student', (req, res) => {
    renderPage(__dirname + '/views/student.html', res);
});

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});


