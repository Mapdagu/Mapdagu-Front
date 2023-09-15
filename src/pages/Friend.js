import Header from "../components/Header";
import Navigator from "../components/Navigator";

const Friend = () => {
    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                />
            </div>
            <div className="content">
            </div>
            <div className="footer">
                <Navigator/>
            </div>
        </div>
    )
}

export default Friend;