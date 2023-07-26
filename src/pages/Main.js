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
            <Search text="음식 검색하기"/>
        </div>
    )
}

export default Main;