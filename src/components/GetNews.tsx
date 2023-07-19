import React, { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { useParams } from 'react-router-dom';

interface NewsItem {
  // Define the properties of a single news item
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  // Add more properties as needed
}

export default function GetNews() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    // Function to fetch news data from the serverless API
    const fetchNewsData = async () => {
      try {
        // Prepare the base API URL
        let apiUrl = 'http://localhost:8888/.netlify/functions/fetchNews/';

        // If the category is provided, update the apiUrl
        if (category) {
          apiUrl += `&category=${category}`;
        }

        // Make the API call to your serverless function endpoint
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            // Add any required headers, e.g., Authorization header for API key
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const articles = responseData.articles;

        setNewsData(articles);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    // Call the fetchNewsData function
    fetchNewsData();
  }, [category]);

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
}
