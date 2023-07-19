import Navbar from "./Navbar";
import Header from "./Header";
import GetNews from "./GetNews"
import Landing from "./Landing";

export default function Layout(){

    return(
        <div>
            <Navbar />
            <Header />
            <Landing />
            <GetNews />
        </div>
    )
}
