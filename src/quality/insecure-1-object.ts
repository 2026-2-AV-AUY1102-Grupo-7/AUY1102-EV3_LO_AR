const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();

// No exponer el framework en la cabecera X-Powered-By
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));

// Lista blanca de caracteres: letras, numeros, espacios, punto, guion y guion bajo
const sanitizeUsername = (value: unknown): string =>
  String(value ?? '')
    .replace(/[^\w .-]/g, '')
    .slice(0, 50);

const template = pug.compile(`
doctype
html
head
    title= 'Hello world'
body
    form(action='/' method='post')
        input#username.form-control(type='text' name='username' value=username)
        button.btn.btn-primary(type='submit') Submit
    p Hello #{username}`);

app.post('/', (req, res) => {
  const username = sanitizeUsername(req.body.username);
  res.type('html').send(template({ username }));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
