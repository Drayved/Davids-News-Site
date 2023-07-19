import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const apiKey = "af03d5f108574fb5a9ad815c55b68ccc"

    let apiUrl = `https://newsapi.org/v2/everything?&language=en&sortBy=popularity&apiKey=${apiKey}`;

    // Assuming keyWord and genres are passed in the event
    const { keyWord, genres } = event.queryStringParameters;

    if (keyWord) {
      apiUrl += `&q=${keyWord}`;
    }

    if (genres) {
      apiUrl += `&genres=${genres}`;
    }

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
