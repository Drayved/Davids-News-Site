import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';

interface NewsItem {
  // Define the properties of a single news item
  title: string;
  description: string;
  url: string;
  urlToImage: string
  // Add more properties as needed
}

export default function GetNews() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Function to fetch news data from the serverless API
    const fetchNewsData = async () => {
      try {
        // Make the API call to your serverless function endpoint
        const response = await fetch(
          'http://localhost:8888/.netlify/functions/fetchNews',
          {
            method: 'GET',
            headers: {
              // Add any required headers, e.g., Authorization header for API key
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        // Get the articles array from the response data
        const articles = responseData.articles;
        console.log(articles)
        // Update the state with the fetched news data
        setNewsData(articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    // Call the fetchNewsData function
    fetchNewsData();
  }, []);

  // Render the news data
  return (
    <div>
      
      <div className="news-cards-container">
        {newsData?.map((newsItem, index) => (
          <NewsCard key={index} newsItem={newsItem} />
        ))}
      </div>
      {/* You can display the news data in a more organized way based on your design */}
    </div>
  );
};


