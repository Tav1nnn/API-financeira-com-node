const express = require('express')
const {v4:uuidv4} =require("uuid")

const app = express();

app.listen('3000')

app.use(express.json())
const costumers = []

app.post('/account', (request, response)=>{
    const {cpf, name} = request.body
    const id = uuidv4();
    costumers.push({
        cpf,
        name,
        id,
        statement: []
    })

    return response.status(201).send()
})