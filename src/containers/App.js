import './App.css';
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import Carousal from '../components/Carousal';
import requests from './requestLookup';
function App() {
  return (
    <div className="App">
        <NavBar/>
        <Banner/>
        <Carousal title = {"Netflix Originals"} fetchURL = {requests.fetchNetflixOriginals} isLargeRow/>
        <Carousal title = {"Trending"} fetchURL = {requests.fetchTrending} />
        <Carousal title = {"Top Rated"} fetchURL = {requests.fetchTopRated}/>
        <Carousal title = {"Comedy"} fetchURL = {requests.fetchComedyMovies}/>
        <Carousal title = {"Horror"} fetchURL = {requests.fetchHorrorMovies}/>
        <Carousal title = {"Action"} fetchURL = {requests.fetchActionMovies}/>
        <Carousal title = {"Romance"} fetchURL = {requests.fetchRomanceMovies}/>
        <Carousal title = {"Documentaries"} fetchURL = {requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;
