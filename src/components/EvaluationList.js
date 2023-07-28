import "./EvaluationList.css";
import { useState, useEffect } from "react";
import EvaluationItem from "./EvaluationItem";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const EvaluationList = ({data}) => {    
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        const compare = (a, b) => {
            if(sortType === "latest"){
                return Number(b.date) - Number(a.date);
            }
            else {
                return Number(a.date) - Number(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    }, [data, sortType]);

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === ""
            ? sortedData
            : sortedData.filter((it) => 
                it.itemName.toLowerCase().includes(search));
    };

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    return(
        <div className="EvaluationList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <h4>최근 나의 맵기평가</h4>
                </div>
                <div className="right_col">
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <input 
                className="searchbar" 
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요"
            />
            <div className="list_wrapper">
                {/* {sortedData.map((it) => (
                    <EvaluationItem 
                        key={it.id} 
                        {...it} 
                    />
                ))} */}
                {getSearchResult().map((it) => (
                    <EvaluationItem
                        key={it.id}
                        {...it}
                    />
                ))}
            </div>
        </div>
    )
}

export default EvaluationList;