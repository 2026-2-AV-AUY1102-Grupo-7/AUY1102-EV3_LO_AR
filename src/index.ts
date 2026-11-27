export * from './value-object';

// Las credenciales se leen del entorno (nunca van escritas en el codigo)
export async function fetchData(
  apiKey: string | undefined = process.env.API_KEY
): Promise<unknown> {
  if (!apiKey) {
    console.error('API_KEY no definida: se omite la consulta');
    return undefined;
  }

  try {
    const response = await fetch('https://api.example.com/data', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    // Se devuelve el dato al llamador; no se escribe contenido externo en los logs
    return await response.json();
  } catch {
    console.error('Error al consultar la API');
    return undefined;
  }
}
