const express = require('express')
const app = express()

app.use(express.json());

let courses =[
    {id:1, name:'java'},
    {id:2, name:'javascript'},
    {id:3, name:'python'}
];

app.get('/courses', (req, res) => {
    res.json(courses)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.json(course);
});