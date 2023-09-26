import "./FriendItem.css";
import { getProfileImgById } from "../../util";

const FriendItem = ({ id, imageNum, userName, level, onDelete}) => {
    const handleOnDelete = () => {
        onDelete(id, false);
    }
    return(
        <div className="FriendItem">
            <img alt="friend_profile" src={getProfileImgById(imageNum)}/>
            <a>{userName}</a>
            <a>Level. {level}</a>
            <button onClick={handleOnDelete}>삭제</button>
        </div>
    );
}

export default FriendItem;