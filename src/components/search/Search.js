import "../../styles/Search.css";
import SearchBar from "./SearchBar";
import RecentSearchedItem from "./RecentSearchedItem";
import FoodItem from "./FoodItem";
import FriendItem from "../friend/FriendItem";
import { SearchStateContext, EvalDispatchContext } from "../../App";

import icon_back from "../../assets/icon/header_back.png";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../cookie";
import axios from "axios";

const SEARCH_MEMBER = `https://mapdagu.site/api/friends?search`;
const SEARCH_FOOD = `https://mapdagu.site/api/foods?search`;

const Search = ({isFood, isModal, onSelect, changeModalSize}) => {
    const accessToken = getCookie("accessToken");

    const searchData = useContext(SearchStateContext);
    const {onCreate, onDelete} = useContext(EvalDispatchContext);

    const [data, setData] = useState();
    const [contents, setContents] = useState("");
    const navigate = useNavigate();

    const handleOnBack = () => {
        navigate(-1);
    }
    const onSubmit = async(contents, isRecent) => {
        setContents(contents);
        if(isModal){
            changeModalSize(true);
        }
        if(!isRecent && !isModal){
            onCreate(2, contents);
        }
        try{
            if(isFood){
                axios.get([SEARCH_FOOD, contents].join("="), {headers: {Authorization: accessToken}})
                .then(res => {
                    setData(res.data.content.map((item) => ({
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
    const onClickRecent = (recentContents) => {
        onSubmit(recentContents, true);
    }
    const onClickItem = (id, name, image) => {
        if(isModal){
            onSelect(name, image);
            changeModalSize(false);
        }else{
            navigate(`/detail/${id}`);
        }
    }
    
    if(!data){
        return(
            <div className="Search">
                <div className="contents_top">
                    {isFood && !isModal ? <img className="img_back" onClick={handleOnBack} alt="back" src={icon_back}/> : ""}
                    <SearchBar onSubmit={onSubmit}/>
                </div>
                { !isModal ? 
                <div>
                    <div className="contents_top">
                        <div className="left">
                            <h1>최근 검색어</h1>
                        </div>
                        <div className="right">
                            <button className="btn_delete" onClick={deleteAll}>전체 삭제</button>
                        </div>
                    </div>
                    <div className="list_wrapper recent">
                        {searchData.map((it) => (                           
                            <RecentSearchedItem
                                key={it.id}
                                    {...it}
                                    onDelete={onDelete}
                                    isFood={isFood}
                                    onClickRecent={onClickRecent}
                            />
                        ))}
                    </div>
                </div>
                : "" }
            </div>  
        );      
    }
    else{
        return(
            <div className="Search">
                <div className="contents_top">
                    {isFood && !isModal ? <img className="img_back" onClick={handleOnBack} alt="back" src={icon_back}/> : ""}
                    <SearchBar onSubmit={onSubmit}/>
                </div>
                <div className="list_wrapper">
                    { data.length === 0 ?
                    <p className="no_result">"{contents}" 에 일치하는 검색 결과가 없습니다.</p> : ""
                    }
                    { isFood ?
                    data.map((it) => (                           
                        <FoodItem
                            key={it.id}
                                {...it}
                                onClickItem={onClickItem}
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