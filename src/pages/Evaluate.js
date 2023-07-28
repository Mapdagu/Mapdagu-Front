import Header from "../components/Header";
import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Button from "../components/Button";
import { EvalStateContext } from "../App";
import { getMonthRangeByDate } from "../util";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

const Evaluate = () => {
    const data = useContext(EvalStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(data.length >= 1){
            const{beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    const handleCreateEval = () => {
        navigate(`/create_evalution`);
    }
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };
    return(
        <div>
            {/* <Header
                title="evaluate page"
            /> */}
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
            <Navigator/> 
            <Button text="새로운 맵기평가 작성하기" onClick={handleCreateEval}/>     
            <EvaluationList data={data} />
        </div>
    )
};

export default Evaluate;