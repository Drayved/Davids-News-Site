import Navbar from "./Navbar";
import Header from "./Header";
import GetNews from "./GetNews"
import Landing from "./Landing";
import NewsCard from "./NewsCard";
import HealthNews from "./HealthNews";

export default function Layout(){

    return(
        <div>
            <Navbar />
            
            
            <GetNews />
        </div>
    )
}
