export * from './value-object';

// Las credenciales se leen del entorno (nunca van escritas en el codigo)
export async function fetchData(
  apiKey: string | undefined = process.env.API_KEY
): Promise<void> {
  if (!apiKey) {
    console.error('API_KEY no definida: se omite la consulta');
    return;
  }

  try {
    const response = await fetch('https://api.example.com/data', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    console.log(await response.json());
  } catch (error) {
    console.error('Error:', error);
  }
}

// Solo se ejecuta al lanzar el archivo directamente, no al importarlo como libreria
if (require.main === module) {
  void fetchData();
}
