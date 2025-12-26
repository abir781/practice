const express = require('express');
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());



let messages=[];

// যদি চাও specific origin allow করতে
// app.use(cors({ origin: "http://example.com" }));

app.use(express.json())

app.get('/',(req,res)=>{

    res.send("what i found?");

})

app.post('/message',(req,res)=>{
    const newmessage=req.body;
    messages.push(newmessage);
    res.send(newmessage);
})
app.get('/message',(req,res)=>{
   
    res.send(messages);

})
app.delete('/message',(req,res)=>{
    messages=[];
     res.json({ success: true });
})

app.listen(port);