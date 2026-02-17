import express from 'express';
const app = express();

app.use(express.json());
const USER ={
    username: "Ritik",
    password: "1234"
};

app.post('/login',(req,res)=>{
    const {username, password} = req.body;

    if(username === USER.username && password === USER.password){
        return res.json({message: "Login successful"});
    }

    res.status(401).json({message: "Invalid credentials"});

});

app.get('/dashboard',(req,res)=>{
    res.json({message: "Welcome to the dashboard!"});
});

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
});