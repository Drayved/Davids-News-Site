import Navbar from "./Navbar"
import Header from "./Header"
import GetNews from "./GetNews"

export default function Layout() {
  
  return (
    <div className="layout">
      <Navbar />
      <Header />
      <div className="content">
        <GetNews />
      </div>
      <footer className="footer">
        <p>&copy 2023 Your News Site. All rights reserved.</p>
      </footer>
    </div>
  )
}

