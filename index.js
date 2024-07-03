const express = require('express');
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: 'java' },
    { id: 2, name: 'javascript' },
    { id: 3, name: 'python' }
];

// GET endpoint to retrieve all courses
app.get('/courses', (req, res) => {
    res.json(courses);
});

// POST endpoint to add a new course
app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.json(course);
});

// PUT endpoint to update a course by ID
app.put('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).send('Course not found');
    }

    course.name = req.body.name;
    res.json(course);
});

// DELETE endpoint to delete a course by ID
app.delete('/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === id);

    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }

    const deletedCourse = courses.splice(courseIndex, 1);
    res.json(deletedCourse);
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
