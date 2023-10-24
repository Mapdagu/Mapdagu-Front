import "./FoodItem.css";

const FoodItem = ({ id, name, image, scoville, onClickItem}) => {
    return(
        <div className="FoodItem">
            <div onClick={()=>{onClickItem(id, name, image)}} className="image_section">
                <img alt="img_food" src={image}/>
            </div>
            <div onClick={()=>{onClickItem(id, name, image)}} className="text_section">
                <div className="text_itemName">{name}</div>
                <div className="text_scoville">스코빌지수: {scoville}</div>
            </div>
        </div>
    );
}

export default FoodItem;