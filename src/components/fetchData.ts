const apiUrl = "https://media1.edu.metropolia.fi/restaurant/api/v1";

const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(apiUrl + url, options);
  if (!response.ok) {
    throw new Error(`Error ${response.status} occured`);
  }
  return response.json();
};

export { fetchData };
