const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser'); 

const app = express();
const PORT = 3000;

app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));

function renderPage(filePath, res, studentData) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (studentData) {
            data = data.replace('<%= student.code %>', studentData.code || '');
            data = data.replace('<%= student.firstName %>', studentData.firstName || '');
            data = data.replace('<%= student.lastName %>', studentData.lastName || '');
            data = data.replace('<%= student.gender %>', studentData.gender || '');
            data = data.replace('<%= student.age %>', studentData.age || '');
            data = data.replace('<%= student.studyField %>', studentData.studyField || '');
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

app.post('/student', (req, res) => {
    const studentData = req.body; 
    const studentCode = studentData.code; 

    fs.writeFile(`./${studentCode}.txt`, JSON.stringify(studentData), (err) => {
        if (err) {
            console.error(`Error saving data to file: ${err}`);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(`Data saved to ${studentCode}.txt`);
    });

    res.redirect('/student');
});

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});





