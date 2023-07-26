import "./Search.css";
import { useState } from "react";

const Search = ({text}) => {
    const [content, setContent] = useState("");
    const onChangeSearch = (e) => {
        setContent(e.target.value);
    };
    const onSubmit = () => {
        setContent("");
    }
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }
    return (
        <div className="Search">
            <h4>{text}</h4>
            <div className="searchbar_wrapper">
                <input 
                    value = {content}
                    onChange={onChangeSearch}                
                    className='searchbar' 
                    onKeyDown={onKeyDown}
                    placeholder='검색어를 입력하세요'
                />
                <button onClick={onSubmit}>검색</button>
            </div>
        </div>
    );
}

export default Search;