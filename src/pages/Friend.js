import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Search from "../components/Search";

const Friend = () => {
    return(
        <div>
            <Header
                title="friend page"
            />
            <Navigator/>
            <Search text="친구 찾기"/>
        </div>
    )
}

export default Friend;