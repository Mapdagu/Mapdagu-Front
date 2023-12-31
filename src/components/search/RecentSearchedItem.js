import "../../styles/RecentSearchedItem.css";

import icon_search from "../../assets/icon/search_search.png";
import icon_delete from "../../assets/icon/search_delete.png";

const RecentSearchedItem = ({isFood, id, itemName, onDelete, onClickRecent}) => {
    const deleteHandler = () => {
        onDelete(2, id);
    }
    const onClickHandler = () => {
        onClickRecent(itemName);
    }

    if(isFood){
        return(
            <div className="RecentSearchedItem">
                <img alt="search_icon" src={icon_search}/>
                <div className="text_itemName" onClick={onClickHandler}>{itemName}</div>
                <img className="button_delete" onClick={deleteHandler} alt="delete" src={icon_delete}/>
            </div>
        )
    }else{
        return(
            <div className="RecentSearchedItem">
                <img alt="search_icon" src={icon_search}/>
                <div className="text_itemName" onClick={onClickHandler}>{itemName}</div>
                <img className="button_delete" onClick={deleteHandler} alt="delete" src={icon_delete}/>
            </div>
        )
    }
}

export default RecentSearchedItem;