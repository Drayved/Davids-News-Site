import { useState, useEffect, useContext } from "react";
import NewsCard from "./NewsCard";
import { MyContext } from "../App";
import { useSearchParams } from "react-router-dom";

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string,
    name: string
  }
}

export default function GetNews() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const { category, subCategory, setSortBy, sortBy } = useContext(MyContext);
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 20;
  const [articles, setArticles] = useState<NewsItem[]>([]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      return nextPage <= totalPages ? nextPage : prevPage;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageNumber = prevPage - 1;
      return prevPageNumber >= 1 ? prevPageNumber : prevPage;
    });
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        // Prepare the base API URL
        let apiUrl = `https://davids-news-site.netlify.app/.netlify/functions/fetchNews`;

        // If category is provided, add it to the apiUrl
        if (category) {
          apiUrl += `?category=${category}`;

          // If subCategory is provided, add it to the apiUrl
          if (subCategory) {
            apiUrl += `&subCategory=${subCategory}`;
          }
        }else {
          
          apiUrl += `?category=general`;
        }
        apiUrl += `&sortBy=${sortBy}`;



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
        const fetchedArticles = responseData.articles;
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    
    // Call the fetchNewsData function whenever category, subCategory, sortBy, or currentPage changes
    fetchNewsData();
  }, [category, subCategory, sortBy, currentPage]);

  const totalPages = Math.ceil(articles.length / newsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    // Calculate the start and end index of news cards to be displayed on the current page
    const startIndex = (currentPage - 1) * newsPerPage;
    const endIndex = startIndex + newsPerPage;

    // Slice the articles array to get the subset for the current page
    const newsSubset = articles.slice(startIndex, endIndex);
    setNewsData(newsSubset);
  }, [articles, currentPage]);

  return (
    <div>
      <div className="news-cards-container">
        {newsData?.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          newsData?.map((newsItem, index) => <NewsCard key={index} newsItem={newsItem} />)
        )}
      </div>
      <div className="pagination mt-4">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          Previous Page 
        </button>
        <span className="text-xs"> { currentPage } - { totalPages } </span>
        <button disabled={newsData.length < newsPerPage} onClick={handleNextPage}>
          Next Page 
        </button>
      </div>
    </div>
  );
}
