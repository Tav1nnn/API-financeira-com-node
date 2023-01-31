const express = require('express')
const {v4:uuidv4} =require("uuid")

const app = express();

app.listen('3000')

app.use(express.json())
const custumers = []

app.post('/account', (request, response)=>{
    const {cpf, name} = request.body

    const validandoCPF = custumers.some(
        (custumers)=> custumers.cpf === cpf
    )

    if(validandoCPF){
        return response.status(400).json({error : "cpf existente"})
    }

    const id = uuidv4();
    console.log(id);
    custumers.push({
        cpf,
        name,
        id,
        statement: []
    })

    return response.status(201).send()
})