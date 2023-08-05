import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Search from "../components/Search";
import Graph from "../components/Graph";

const Main = () => {
    return(
        <div>
            <Header
                title="main page"
            />
            <Navigator/>
            <Graph />
            <Search text="음식 검색하기"/>
        </div>
    )
}

export default Main;