//Express Web application and create student data base and use post man

const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const readStudData = () => {
    return JSON.parse(fs.readFileSync('./students.json'))
}
const writeStudData = (data) => {
    fs.writeFileSync('./students.json', JSON.stringify(data))
}
app
    .get('/', (req, res) => {
        const studData = readStudData()
        res.json(studData)
    })
    .post('/', (req, res) => {
        console.log(req.body)
        const studData = readStudData()
        const newStud = req.body
        studData.push(newStud)
        writeStudData(studData)
        res.json(studData)
    })
    .put('/', (req, res) => {
        const studData = readStudData()
        const stud = req.body
        const curStud = studData.find(s => s.id === stud.id)
        curStud.name = stud.name
        curStud.branch = stud.branch
        writeStudData(studData)
        res.json(studData)
    })
    .delete('/', (req, res) => {
        let studData = readStudData()
        const { id } = req.body
        studData = studData.filter(stud => stud.id !== id)
        writeStudData(studData)
        res.json(studData)
    })


app.listen(8081, () => console.log("server started"))