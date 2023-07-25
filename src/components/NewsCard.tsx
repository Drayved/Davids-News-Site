

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  // Add more properties as needed
}

export default function NewsCard({ newsItem }: { newsItem: NewsItem }) {
  
  
    // if (!newsItem.urlToImage) {
    //     return null; // Return null to skip rendering the card
    //   }
      
  return (
    <div className="news-cards">
        <div className="news-image">
            <img src={newsItem.urlToImage} alt={newsItem.title} />
        </div>
        <div className="news-details">
            <h3 className="news-title">{newsItem.title}</h3>
            <p className="news-description">{newsItem.description}</p>
            <a className="read-more" href={newsItem.url} target="_blank" rel="noopener noreferrer">
            Read more
            </a>
      </div>
    </div>
  );
}
