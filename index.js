const express = require('express')
const {v4:uuidv4} =require("uuid")

const app = express();

app.listen('3000')

app.use(express.json())
const custumers = []

function verificacaoCPF(request, response, next){
    const {cpf} = request.headers
    
    const custumer = custumers.find(custumer => custumer.cpf === cpf)

    if(!custumer){
        return response.status(400).jsonp({error: "conta não existe"})
    }

    request.custumer = custumer

    return next()
}

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
    console.log(custumers);
    return response.status(201).send()
})

app.get("/statement", verificacaoCPF, (request, response)=>{
    const {custumer} = request
    return response.json(custumer.statement)
})

app.post('/deposit', verificacaoCPF, (request, response)=>{
    const {description, amount} = request.body
    const {custumer} = request

    const operacao = {
        description,
        amount,
        date: new Date(),
        type: 'credit'
    }

    custumer.statement.push(operacao)
    
    return response.status(201).send()
})