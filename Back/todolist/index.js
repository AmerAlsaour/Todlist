const express = require("express")
const mongoose=require('mongoose')
const cors = require('cors')
const app=express()
const bodyParser = require('body-parser');
const Todomodule = require('./models/Todo')

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/test')
app.get('/get',(req,res)=>{
    Todomodule.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
});
app.post('/add',(req,res)=>{
    const task=req.body.task;
    Todomodule.create({
        task:task
    })
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
});

app.put('/update/:id',(req,res)=>{
    const {id}=req.params;
    Todomodule.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
    console.log(id);
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }
  
    Todomodule.findByIdAndDelete({ _id: id }, { done: true })
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });

app.listen(3001,()=>{
    console.log("server is Running on 3001")
})