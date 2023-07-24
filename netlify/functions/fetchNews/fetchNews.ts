import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const apiKey = process.env.VITE_NEWS_KEY;
    const category = 'health';

    // Base URL for the News API
    const apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&category=${category}`;

    console.log('API URL:', apiUrl); // Log the apiUrl

    // Make the API call to the News API
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('API Response:', data); // Log the API response

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error); // Log any errors that occur
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Specify allowed HTTP methods
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
};
