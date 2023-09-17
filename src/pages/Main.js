import Header from "../components/Header";
import Navigator from "../components/Navigator";
import MainViewer from "../components/MainViewer";
import { getCookie } from "../cookie";

const Main = () => {
    const accessToken = getCookie("accessToken");
    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                />
            </div>
            <div className="content">
                <MainViewer accessToken={accessToken}/>
            </div>
            <div className="footer">
                <Navigator current="main" />
            </div>
        </div>
    )
}

export default Main;