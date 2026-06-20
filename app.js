const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

let goals = [ 
{ id: 1, title: 'Learn Express' }, 
{ id: 2, title: 'Build a CRUD API' } 
];

app.get('/goals', (req, res) => {
  res.json(goals);
});

app.post('/goals', (req, res) => { 
  let newGoal = { id: Date.now(), title: req.body.title }; 
  goals.push(newGoal); 
  res.status(201).json(newGoal); 
}); 

app.put('/goals/:id', (req, res) => { 
  let id = parseInt(req.params.id); 
  let index = goals.findIndex(g => g.id === id); 
  if (index !== -1) { 
  goals[index] = { ...goals[index], title: req.body.title }; 
  res.json(goals[index]); 
  } else { 
  res.status(404).json({ error: 'Goal not found' }); 
  }
});

app.delete('/goals/:id', (req, res) => { 
  let id = parseInt(req.params.id); 
  goals = goals.filter(g => g.id !== id); 
  res.json({ message: 'Deleted successfully' }); 
}); 

app.listen(PORT, () => { 
console.log(`Server is running at ${PORT}`); 
}); 