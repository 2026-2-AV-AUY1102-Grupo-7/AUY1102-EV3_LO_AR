const username = "admin'; DROP TABLE Users; --";
const queryString = `SELECT * FROM Users WHERE username='${username}'`;

// XSS

const userInput = '<script>alert("XSS");</script>';
const html = `<div>${userInput}</div>`;

// CSRF

app.post('/change-password', (req, res) => {
  const newPassword = req.body.newPassword;
  // Cambiar la contraseña sin verificar el token CSRF
});

// Deserialización

const data = JSON.parse(req.body);

// Credenciales

const dbPassword = process.env.DB_PASSWORD ?? '';
// const apiSecretKey = 'supersecretkey123'; // No usar en producción
const config = {
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  apiKey: process.env.API_KEY,
};

const hashedPassword = hash(dbPassword);

console.log("Error: la contraseña configurada no es válida");
