import { fetchData } from '../src';

describe('fetchData', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('omite la consulta si no hay API_KEY', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch');
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    await fetchData('');

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith(
      'API_KEY no definida: se omite la consulta'
    );
  });

  it('consulta la API enviando la clave en la cabecera Authorization', async () => {
    const fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ ok: true }),
    } as Response);
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    await fetchData('clave-de-prueba');

    expect(fetchSpy).toHaveBeenCalledWith('https://api.example.com/data', {
      headers: { Authorization: 'Bearer clave-de-prueba' },
    });
    expect(logSpy).toHaveBeenCalledWith({ ok: true });
  });

  it('captura los errores de red sin lanzar excepcion', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('sin red'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();

    await expect(fetchData('clave-de-prueba')).resolves.toBeUndefined();

    expect(errorSpy).toHaveBeenCalledWith('Error:', expect.any(Error));
  });
});
