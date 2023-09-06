import "./EvaluationList.css";
import { useState } from "react";
import EvaluationItem from "./EvaluationItem";
import { useNavigate } from "react-router-dom";

const EvaluationList = ({data}) => {   
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };
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
                    <button onClick={handleCreateEval}>+</button>
                </div>
            </div>
            {/* <input 
                className="searchbar" 
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"
            /> */}
            <div className="list_wrapper">
                {data.map((it) => (
                    <EvaluationItem
                        key={it.id}
                        {...it}
                    />
                ))}
            </div>
        </div>
    )
    }
}

export default EvaluationList;