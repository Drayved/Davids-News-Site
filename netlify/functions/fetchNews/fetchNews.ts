import fetch from 'node-fetch'

export const handler = async (event) => {
  try {
    const apiKey = process.env.VITE_NEWS_KEY
    const { category, subCategory, sortBy } = event.queryStringParameters
    
    let source = ""
    if (category === 'politics' && subCategory) {
      const sourceMap = {
        "conservative": "foxnews.com, newsmax.com, dailycaller.com, theamericanconservative.com, nationalreview.com",
        "liberal": "cnn.com, msnbc.com,  nytimes.com,  washingtonpost.com, theguardian.com",
        "independent": "reuters.com, aljazeera.com, bbc.com, politico.com, huffpost.com"
      } 
      source = sourceMap[subCategory] || "bbc.com" 
    }else {
      
      const defaultSourceMap = {
        "General": "bbc.com, reuters.com, aljazeera.com, foxnews.com, cnn.com, msnbc.com",
        "US News": "usatoday.com, cnn.com, npr.org",
        "Sports": "espn.com, bleacherreport.com, sportingnews.com",
        "Health": "medicalnewstoday.com, webmd.com, healthline.com",
        "Tech": "variety.com, hollywoodreporter.com, entertainmentweekly.com",
        "Science": "space.com",
        "climate": "nrdc.org, climate.gov, carbonbrief.org, bbc.com"
      }
      source = defaultSourceMap[category] || "bbc.com"
    }
    const validSortByOptions = ["relevancy", "popularity", "publishedAt"]
    const sortByOption = validSortByOptions.includes(sortBy) ? sortBy : "publishedAt"
    const apiUrl = `https://newsapi.org/v2/everything?q=${category ? category : "tech"}${source ? `&domains=${source}` : ""}&apiKey=${apiKey}&sortBy=${sortByOption}&language=en`
    
    const response = await fetch(apiUrl)
    const data = await response.json()

    console.log('API Response:', data) 

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store', 
      },
      body: JSON.stringify(data),
      
    }
  } catch (error) {
    console.error('Error:', error) 
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Something went wrong' }),
    }
  }
}
