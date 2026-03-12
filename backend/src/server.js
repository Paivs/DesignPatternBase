const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let nextId = 1;
const recipes = [];

function isValidRecipe(body) {
  const { title, description, prepTime, ingredients, steps } = body;

  if (
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof prepTime !== 'number' ||
    !Array.isArray(ingredients) ||
    !Array.isArray(steps)
  ) {
    return false;
  }

  return true;
}

app.get('/recipes', (req, res) => {
  res.json(recipes);
});

app.get('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  res.json(recipe);
});

app.post('/recipes', (req, res) => {
  if (!isValidRecipe(req.body)) {
    return res.status(400).json({
      message:
        'Dados inválidos. Esperado: { title: string, description: string, prepTime: number, ingredients: string[], steps: string[] }',
    });
  }

  const recipe = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description,
    prepTime: req.body.prepTime,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
  };

  recipes.push(recipe);

  res.status(201).json(recipe);
});

app.put('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  if (!isValidRecipe(req.body)) {
    return res.status(400).json({
      message:
        'Dados inválidos. Esperado: { title: string, description: string, prepTime: number, ingredients: string[], steps: string[] }',
    });
  }

  const updated = {
    id,
    title: req.body.title,
    description: req.body.description,
    prepTime: req.body.prepTime,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
  };

  recipes[index] = updated;

  res.json(updated);
});

app.delete('/recipes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Receita não encontrada' });
  }

  recipes.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor de receitas rodando em http://localhost:${PORT}`);
});

