const express = require('express');
const fs = require('fs');
const os = require('os');
const app = express();

app.use(express.json());


app.use((req, res, next) => {
    const method = req.method;
    const ip = req.ip;
    const hostname = os.hostname();
    const date = new Date().toISOString();
    console.log(`[${date}] ${method} request from ${ip} on ${hostname}`);
    next();
});


const coursesFilePath = './courses.json';

const readCoursesFromFile = () => {
    const data = fs.readFileSync(coursesFilePath);
    return JSON.parse(data);
};

const writeCoursesToFile = (courses) => {
    fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2));
};

let courses = readCoursesFromFile();


app.get('/courses', (req, res) => {
    res.json(courses);
});


app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    writeCoursesToFile(courses);
    res.json(course);
});


app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).send('Course not found');
    }

    course.name = req.body.name;
    writeCoursesToFile(courses);
    res.json(course);
});


app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }

    const deletedCourse = courses.splice(courseIndex, 1);
    writeCoursesToFile(courses);
    res.json(deletedCourse);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
