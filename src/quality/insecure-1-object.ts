const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// No exponer el framework en la cabecera X-Powered-By
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));

// Lista blanca de caracteres: letras, numeros, espacios, punto, guion y guion bajo
const sanitizeUsername = (value: unknown): string =>
  String(value ?? '')
    .replace(/[^\w .-]/g, '')
    .slice(0, 50);

// Se responde JSON (no HTML): la entrada del usuario nunca se interpreta como marcado
app.post('/', (req, res) => {
  const username = sanitizeUsername(req.body.username);
  res.json({ message: `Hello ${username}` });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
