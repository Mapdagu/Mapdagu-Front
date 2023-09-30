import "./FoodItem.css";
import { getItemImgById } from "../util";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ id, name, imageNum, scoville}) => {
    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/detail/${id}`);
    }

    return(
        <div className="FoodItem">
            <div onClick={goDetail} className="image_section">
                <img alt="img_food" src={getItemImgById(imageNum)}/>
            </div>
            <div onClick={goDetail} className="text_section">
                <div className="text_itemName">{name}</div>
                <div className="text_scoville">스코빌지수: {scoville}</div>
            </div>
        </div>
    );
}

export default FoodItem;