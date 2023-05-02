
import "../style/Dashboard.css";
import Post from "./Posts";
import Header from "./Header";

function Dashboard() {
  
  return (
    <>
      <Header />
    <div className="container">
      <h1 className="heading">Posts by people</h1>
      <Post />
    </div>
    </>
  );
}

export default Dashboard;
