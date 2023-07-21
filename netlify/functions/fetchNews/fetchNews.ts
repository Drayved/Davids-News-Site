import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const apiKey = process.env.VITE_NEWS_KEY;

    // Get query parameters from the request
    const { category, language, country, type, sources } = event.queryStringParameters;

    // Base URL for the News API
    let apiUrl = `https://newsapi.org/v2/${type || 'top-headlines'}?apiKey=${apiKey}`;

    // Prepare query parameters based on user preferences
    const queryParams = new URLSearchParams();
    if (category) {
      queryParams.append('category', category);
    }
    if (language) {
      queryParams.append('language', language);
    }
    if (country) {
      queryParams.append('country', country);
    }
    if (sources) {
      queryParams.append('sources', sources);
    }

    // Append query parameters to the API URL
    apiUrl += '&' + queryParams.toString();

    // Make the API call to the News API
    const response = await fetch(apiUrl);
    const data = await response.json();

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
