import { useContext, useState } from "react";
import "./Search.css";
import SearchBar from "./SearchBar";
import axios from "axios";
import { getCookie } from "../cookie";
import FriendItem from "./friend/FriendItem";
import FoodItem from "./FoodItem";
import icon_back from "../img/icon/header_back.png";
import { useNavigate } from "react-router-dom";
import { SearchStateContext, EvalDispatchContext } from "../App";
import RecentSearchedItem from "./RecentSearchedItem";

const SEARCH_MEMBER = `https://mapdagu.site/api/friends?search`;
const SEARCH_FOOD = `https://mapdagu.site/api/foods?search`;

const Search = ({isFood}) => {
    const accessToken = getCookie("accessToken");
    const searchData = useContext(SearchStateContext);
    const {onCreate, onDelete} = useContext(EvalDispatchContext);
    const [data, setData] = useState();
    const [contents, setContents] = useState("");
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(-1);
    }
    const onSubmit = async(contents) => {
        setContents(contents);
        onCreate(2, contents);
        try{
            if(isFood){
                axios.get([SEARCH_FOOD, contents].join("="), {headers: {Authorization: accessToken}})
                .then(res => {
                    setData(res.data.content.map((item, index) => ({
                        id: index,
                        ...item
                    })));
                })
            }
            else{
                axios.get([SEARCH_MEMBER, contents].join("="), {headers: {Authorization: accessToken}})
                .then(res => {
                    setData(res.data.content.map((item) => ({
                        ...item
                    })));
                })
            }
        } catch(error){
            alert(error.response.data.message);
        }
    }
    const deleteAll = () => {
        onDelete(3);
    }
    if(!data){
        return(
            <div className="Search">
                <div className="contents_top">
                    {isFood ? <img className="img_back" onClick={handleOnBack} alt="back" src={icon_back}/> : ""}
                    <SearchBar onSubmit={onSubmit}/>
                </div>
                <div className="contents_top">
                    <div className="left">
                        <h1>최근 검색어</h1>
                    </div>
                    <div className="right">
                        <button className="btn_delete" onClick={deleteAll}>전체 삭제</button>
                    </div>
                </div>
                <div className="list_wrapper">
                    {searchData.map((it) => (                           
                        <RecentSearchedItem
                            key={it.id}
                                {...it}
                                onDelete={onDelete}
                                isFood={isFood}
                        />
                    ))}
                </div>
            </div>  
        );      
    }
    else{
        return(
            <div className="Search">
                <div className="contents_top">
                    {isFood ? <img className="img_back" onClick={handleOnBack} alt="back" src={icon_back}/> : ""}
                    <SearchBar onSubmit={onSubmit}/>
                </div>
                <div className="list_wrapper">
                    { data.length === 0 ?
                    <p>"{contents}" 에 일치하는 검색 결과가 없습니다.</p> : ""
                    }
                    { isFood ?
                    data.map((it) => (                           
                        <FoodItem
                            key={it.id}
                                {...it}
                        />
                    )) :
                    data.map((it) => (                            
                        <FriendItem
                            key={it.id}
                                {...it}
                        />
                    ))}
                </div>
            </div>
        );}
}

export default Search;