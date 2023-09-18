import "./EvaluationList.css";
import { useState } from "react";
import EvaluationItem from "./EvaluationItem";
import { useNavigate } from "react-router-dom";
import icon_add from "../img/icon/evaluate_add.png";

const EvaluationList = ({data, onSubmit, maxTestNum}) => {   
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const submitHandler = () => {
        if(search !== ""){
            onSubmit(search);
            // setSearch("");
        }
    }
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            submitHandler();
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
                    <h2>최근 평가 목록</h2>
                </div>
                <div className="right_col">
                    <button onClick={handleCreateEval}><img alt="add" src={icon_add}/></button>
                </div>
            </div>
            <div className="search_bar_wrapper">
                <input 
                    className="search_bar" 
                    value={search}
                    onChange={onChangeSearch}
                    onKeyDown={onKeyDown}
                    placeholder="검색어를 입력하세요"
                />
                <button onClick={submitHandler}>검색</button>
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