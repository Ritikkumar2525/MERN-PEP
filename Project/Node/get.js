import express from 'express';
const app = express();
app.use(express.json());
const users = [
  { id: 1, name: 'Ritik' },
  { id: 2, name: 'Aman' },
  { id: 3, name: 'Neha' }
];
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

app.post('/userData', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
    });

app.get('/users', (req, res) => {
    res.send(users);
    });

app.put('/users/:id', (req, res) => {  
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = req.body.name || user.name;
    res.json(user); 
    });

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    const deletedUser = users.splice(userIndex, 1);
    res.json(users);
    });


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});