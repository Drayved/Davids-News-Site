import { useState, useEffect, useContext } from "react";
import NewsCard from "./NewsCard";
import { MyContext } from "../App";

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
  const { category, subCategory, sortBy } = useContext(MyContext);
  
  
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

  const getPagesToShow = () => {
    const pagesToShow = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pagesToShow.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pagesToShow.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pagesToShow.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pagesToShow;
  };

  return (
    <div>
      <div className="news-cards-container">
        {newsData?.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          newsData?.map((newsItem, index) => <NewsCard key={index} newsItem={newsItem} />)
        )}
      </div>
      <div className="pagination">
        <button className={`page-btns ${currentPage === 1 ? 'btn-disabled' : ''}`}  onClick={handlePrevPage}>
        <img className="arrows prev-arrow" src="images/left.png" alt="" /> Previous 
        </button>
        <div className="page-number-container">
          {getPagesToShow().map((page, index) => (
            <button
              key={index}
              className={`page-btns page-number-box ${page === currentPage ? 'current-page' : ''}`}
              onClick={() => setCurrentPage(page as number)}
            >
              {page.toString()}
            </button>
          ))}
        </div>
        <button className={`page-btns ${currentPage === totalPages ? 'btn-disabled' : ''}`} onClick={handleNextPage}>
          Next <img className="arrows next-arrow" src="images/next.png" alt="" />
        </button>
      </div>
    </div>
  );
}
