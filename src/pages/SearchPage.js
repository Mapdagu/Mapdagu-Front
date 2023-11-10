import Search from "../components/search/Search.js";
import Navigator from "../components/Navigator.js";

const SearchPage = () => {
    return(
        <div className="container">
            <div className="content">
                <Search isFood={true}/>
            </div>
            <div className="footer">
                <Navigator/>
            </div>
        </div>
    )

}

export default SearchPage;