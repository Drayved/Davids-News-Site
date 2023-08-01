import { NewsItem } from "./GetNews";



export default function NewsCard({ newsItem }: { newsItem: NewsItem}) {
  const formatPublishedAt = (publishedAt: string) => {
    const date = new Date(publishedAt);
    const options = {
      timeZone: "America/New_York", // Set the time zone to American Eastern Standard Time (EST)
      year: "numeric" as const,
      month: "long" as const,
      day: "numeric" as const,
      hour: "numeric" as const,
      minute: "numeric" as const
    };
    return date.toLocaleString("en-US", options);
  };

  if (!newsItem.urlToImage) {
    return null; // Return null to skip rendering the card
  }

  return (
    <div className="news-cards">
      <div className="news-image">
        <img className="news-img" src={newsItem.urlToImage} alt={newsItem.title} />
      </div>
      <div className="news-details">
        <div className="article-info-container">
          <p>{formatPublishedAt(newsItem.publishedAt)}</p>
          <p>{newsItem.source.name}</p>
        </div>
        
        <h3 className="news-title">{newsItem.title}</h3>
        
        <p className="news-description">{newsItem.description}</p>
        <a className="read-more" href={newsItem.url} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      </div>
    </div>
  );
}
