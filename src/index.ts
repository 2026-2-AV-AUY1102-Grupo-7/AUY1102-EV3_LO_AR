export * from './value-object';

// Las credenciales se leen del entorno (nunca van escritas en el codigo)
const apiKey = process.env.API_KEY;

function fetchData() {
  if (!apiKey) {
    console.error('API_KEY no definida: se omite la consulta');
    return;
  }
  fetch('https://api.example.com/data', {
    headers: { Authorization: `Bearer ${apiKey}` },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
}

// Solo se ejecuta al lanzar el archivo directamente, no al importarlo como libreria
if (require.main === module) {
  fetchData();
}
