import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Search from "../components/Search";

const Main = () => {
    return(
        <div>
            <Header
                title="main page"
            />
            <Navigator/>
            <Search/>
        </div>
    )
}

export default Main;