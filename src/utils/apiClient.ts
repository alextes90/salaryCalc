export async function client<T>(endpoint: string): Promise<T> {
  const response = await fetch(endpoint);
  return response.json();
}
