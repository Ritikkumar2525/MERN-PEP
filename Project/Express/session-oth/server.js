import express from 'express';
import session from 'express-session';

const app = express();

app.use(express.json());

app.use(session({
    secret: 'hello123',
    resave: false,
    saveUninitialized: true
}));

const USER ={
    username: "Ritik",
    password: "1234"
}

app.post('/login',(req,res)=>{
    const {username, password} = req.body;

    if(username === USER.username && password === USER.password){
        req.session.user = username;
        return res.json({message: "Login successful"});
    }

    res.status(401).json({message: "Invalid credentials"});

});

app.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.json({message: `Welcome to the dashboard, ${req.session.user}!`});
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});