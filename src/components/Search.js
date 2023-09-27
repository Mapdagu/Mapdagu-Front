import { useState } from "react";
import "./Search.css";
import SearchBar from "./SearchBar";
import axios from "axios";
import { getCookie } from "../cookie";
import FriendItem from "./friend/FriendItem";

const SERVER_URL=`https://mapdagu.site/api/friends?search`;

const Search = () => {
    const accessToken = getCookie("accessToken");
    const [data, setData] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const onSubmit = async(contents) => {
        try{
            axios.get([SERVER_URL, contents].join("="), {headers: {Authorization: accessToken}})
            .then(res => {
                setData(res.data.content.map((item) => ({
                    ...item
                })));
            })
            setIsSubmit(true);
        } catch(error){
            alert(error.response.data.message);
        }
    }
    return(
        <div className="Search">
            <div className="contents_top">
                <SearchBar onSubmit={onSubmit}/>
            </div>
            {isSubmit ? "" :
            <div className="contents_top">
                <div className="left">
                    <h1>최근 검색어</h1>
                </div>
                <div className="right">
                    <button className="btn_delete">전체 삭제</button>
                </div>
            </div>
            }
            <div className="list_wrapper">
                { !data || data.length === 0 ?
                "" :
                data.map((it) => (                            
                    <FriendItem
                        key={it.id}
                            {...it}
                    />
                ))}
            </div>
        </div>
    );
}

export default Search;