const express = require('express');
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const {OpenAIApi, Configuration} = require('openai');
const { response } = require('express');

const app = express()
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey:process.env.API
})

const openai = new OpenAIApi(configuration);

app.post('/ask',async(req,res)=>{
    const prompt = req.body.prompt;
    if(!prompt){
        return req.status(400).send({error:"Required"})
    }
    try{
      await  openai.createCompletion({
            model:'text-davinci-003',
            prompt:prompt,
            temperature:0,
            max_tokens:2000
        }).then((response)=>{
            res.send({data:response.data.choices[0].text})
        })
    }catch(err){
        console.log(err)
        res.status(500).send({error})
    }
})

app.listen(4000,()=>{
    console.log('Connected');
})