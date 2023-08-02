import fetch from 'node-fetch';


export const handler = async (event) => {
  try {
    const apiKey = process.env.VITE_NEWS_KEY;
    const { category, subCategory, sortBy } = event.queryStringParameters;
    console.log("Serverless Function - Received category:", category); 
    
    let source = "";
    if (category === 'politics' && subCategory) {
      const sourceMap = {
        "conservative": "foxnews.com, newsmax.com, dailycaller.com, theamericanconservative.com, nationalreview.com",
        "liberal": "cnn.com, msnbc.com,  nytimes.com,  washingtonpost.com, theguardian.com",
        "independent": "reuters.com, aljazeera.com, bbc.com, politico.com, huffpost.com"
      } 
      source = sourceMap[subCategory] || "bbc.com"; 
    }else {
      
      const defaultSourceMap = {
        "General": "bbc.com, reuters.com, aljazeera.com, foxnews.com, cnn.com, msnbc.com",
        "US News": "usatoday.com, cnn.com, npr.org",
        "Sports": "espn.com, bleacherreport.com, sportingnews.com",
        "Health": "medicalnewstoday.com, webmd.com, healthline.com",
        "Tech": "variety.com, hollywoodreporter.com, entertainmentweekly.com",
        "Entertainment": "space.com, scientificamerican.com, livescience.com",
        "Science": "space.com",
        "climate": "nrdc.org, climate.gov, carbonbrief.org, bbc.com"
        
      };
      source = defaultSourceMap[category] || "bbc.com"
    }
    const validSortByOptions = ["relevancy", "popularity", "publishedAt"];
    const sortByOption = validSortByOptions.includes(sortBy) ? sortBy : "publishedAt";

    const apiUrl = `https://newsapi.org/v2/everything?q=${category ? category : "tech"}${source ? `&domains=${source}` : ""}&apiKey=${apiKey}&sortBy=${sortByOption}&language=en`;
    
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
        'Cache-Control': 'no-store', // Add cache-control header to disable caching
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
