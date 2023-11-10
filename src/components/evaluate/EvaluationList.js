import "../../styles/EvaluationList.css";
import EvaluationItem from "./EvaluationItem";

import icon_add from "../../assets/icon/evaluate_add.png";
import icon_search from "../../assets/icon/evaluate_search.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EvaluationList = ({data, onSubmit, maxTestNum}) => {   
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            if(search !== ""){
                onSubmit(search);
                // setSearch("");
            }
            else{
                navigate(0);
            }
        }
    }
    const handleCreateEval = () => {
        navigate(`/new`);       
    }  
    
    if(!data){
        return <div>불러오는 중입니다...</div>;
    }
    else{
    return(
        <div className="EvaluationList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <button className="btn_title" onClick={() => navigate(0)}>최근 평가 목록</button>
                </div>
                <div className="right_col">
                    <button onClick={handleCreateEval}><img alt="add" src={icon_add}/></button>
                </div>
            </div>
            <div className="search_bar_wrapper">
                <img className="icon_search" alt="search" src={icon_search}/>
                <input 
                    className="search_bar" 
                    value={search}
                    onChange={onChangeSearch}
                    onKeyDown={onKeyDown}
                    placeholder="검색어를 입력하세요"
                />
            </div>
            <div className="list_wrapper">
                {data.map((it) => (
                    <EvaluationItem
                        key={it.id}
                        {...it}
                        maxTestNum={maxTestNum}
                    />
                ))}
            </div>
        </div>
    )
    }
}

export default EvaluationList;