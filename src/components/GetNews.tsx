import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface GetNewsProps {
  category?: string;
  subCategory?: string;
}

export default function GetNews({ category, subCategory }: GetNewsProps) {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    console.log("Selected category:", category);
    const fetchNewsData = async () => {
      try {
        // Prepare the base API URL
        let apiUrl = "https://davids-news-site.netlify.app/.netlify/functions/fetchNews";
  
        // If the category is provided, update the apiUrl
        if (category !== "") {
          apiUrl += `/${category}`;
  
          // If the subCategory is provided, update the apiUrl
          if (subCategory) {
            apiUrl += `/${subCategory}`;
          }
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
        const articles = responseData.articles; // Use 'articles' instead of 'sources'
  
        setNewsData(articles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
  
    // Call the fetchNewsData function whenever category or subCategory changes
    fetchNewsData();
  }, [category, subCategory]);

  // Render the news data
  return (
    <div>
      <div className="news-cards-container">
        {newsData.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          newsData.map((newsItem, index) => <NewsCard key={index} newsItem={newsItem} />)
        )}
      </div>
      {/* You can display the news data in a more organized way based on your design */}
    </div>
  );
}
