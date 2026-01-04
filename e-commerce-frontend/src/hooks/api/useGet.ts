export async function useGet() {
  const response = await fetch('/api/data');
  return response.json();
}