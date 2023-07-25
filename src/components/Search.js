import "./Search.css";
import { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    return (
        <div className="Search">
            <input 
                value = {search}
                onChange={onChangeSearch}                
                className='searchbar' 
                placeholder='검색어를 입력하세요'
            />
        </div>
    );
}

export default Search;