import Header from "../components/Header";
import Navigator from "../components/Navigator";
import FriendViewer from "../components/friend/FriendViewer";

const Friend = () => {
    return(
        <div className="container">
            <div className="header">
                <Header
                    type={1}
                />
            </div>
            <div className="content">
                <FriendViewer />
            </div>
            <div className="footer">
                <Navigator current="friend"/>
            </div>
        </div>
    )
}

export default Friend;