const express =  require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const swaggerDocument = yaml.load('./swagger.yaml')

const fileUpload = require('express-fileupload')

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(express.json()) // body parser
app.use(fileUpload())

let courses = [{
        id: "11",
        name: "Learn ReactJS",
        price: 299
    },{
        id: "12",
        name: "Learn JS",
        price: 499
    },{
        id: "13",
        name: "Learn CSS",
        price: 199
}]


app.get("/", (req, res) => {
    res.send('Hello')
})

app.get("/api/v1/learn", (req, res) => {
    res.status(200).send('Hello from learn section')
})

app.get("/api/v1/learnObject", (req, res) => {
    res.status(200).send({id: 55, name:"Learn BE", price:999})
})

app.get("/api/v1/courses", (req, res) => {
    res.status(200).send(courses)
})

// sending data in URL - path
app.get("/api/v1/mycourse/:courseId", (req, res) => {

    const temp = courses.find(course => course.id === req.params.courseId)
    if(!temp)
        res.status(404).send("not found")

    res.status(200).send(temp)
})

app.post("/api/v1/addCourse", (req, res) => {
    courses.push(req.body)
    res.send(true)
})

// handle url query -> localhost:4000/api/v1/coursequery?location=pune&device=macbook
app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location
    let device = req.query.device

    console.log(req.query)
    res.send({location, device})
})

app.post("/api/v1/uploadImage", (req, res) => {
    const file = req.files.file
    let path = __dirname+`/images/${Date.now()}.jpg` // upload image to images folder
    console.log(path)

    file.mv(path, err => {        
        res.send(true)
    })
})

app.listen(4000, ()=> console.log(`server is running at port 4000...`))