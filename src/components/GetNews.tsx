// GetNews.tsx
import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { useParams } from "react-router-dom";

interface NewsItem {
  // Define the properties of a single news item
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  // Add more properties as needed
}

interface GetNewsProps {
  category?: string; // Make the category prop optional
  subCategory?: string; // Make the subCategory prop optional
}

export default function GetNews({ category, subCategory }: GetNewsProps) {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    // Function to fetch news data from the serverless API
    const fetchNewsData = async () => {
      try {
        // Prepare the base API URL
        let apiUrl = "https://davids-news-site.netlify.app/.netlify/functions/fetchNews/health";

        // If the category is provided, update the apiUrl
        if (category) {
          apiUrl += `&category=${category}`;
        }

        // If the subCategory is provided, update the apiUrl
        if (subCategory) {
          apiUrl += `&category=${subCategory}`;
        }

        // Make the API call to your serverless function endpoint
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            // Add any required headers, e.g., Authorization header for API key
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        const articles = responseData.articles;

        setNewsData(articles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    // Call the fetchNewsData function
    fetchNewsData();
  }, [category, subCategory]); // Add category and subCategory to the dependency array

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
