import "./SearchBar.css";
import icon_search from "../img/icon/searchbar_search.png";
import { useState } from "react";

const SearchBar = ({onSubmit}) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            if(search !== ""){
                onSubmit(search);
            }
        }
    }

    return(
        <div className="SearchBar">
            <img className="icon_search" alt="search" src={icon_search}/>
            <input 
                className="search_bar" 
                value={search}
                onChange={onChangeSearch}
                onKeyDown={onKeyDown}
                placeholder="검색어를 입력하세요"
            />
        </div>
    )
}

export default SearchBar