import Header from "../components/Header";
import Navigator from "../components/Navigator";
import MainViewer from "../components/MainViewer";

const Main = () => {
    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                />
            </div>
            <div className="content">
                <MainViewer />
            </div>
            <div className="footer">
                <Navigator current="main" />
            </div>
        </div>
    )
}

export default Main;