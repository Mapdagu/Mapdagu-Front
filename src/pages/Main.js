import Header from "../components/Header";
import Navigator from "../components/Navigator";
import MainViewer from "../components/MainViewer";

const Main = ({accessToken}) => {

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
                <Navigator/>
            </div>
        </div>
    )
}

export default Main;