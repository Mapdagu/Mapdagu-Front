import Header from "../components/Header";
import Navigator from "../components/Navigator";
import EvaluationList from "../components/EvaluationList";
import Button from "../components/Button";
import { EvalStateContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const Evaluate = () => {
    const data = useContext(EvalStateContext);
    const navigate = useNavigate();
    // const [pivotDate, setPivotDate] = useState(new Date());
    // const [filteredData, setFilteredData] = useState([]);

    // useEffect(() => {
    //     if(data.length >= 1){
    //         const{beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
    //         setFilteredData(
    //             data.filter(
    //                 (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
    //             )
    //         );
    //     } else {
    //         setFilteredData([]);
    //     }
    // }, [data, pivotDate]);

    const handleCreateEval = () => {
        navigate(`/new`);
    }

    return(
        <div>
            <Header
                title="evaluate page"
            />
            <Navigator/> 
            <Button text="새로운 맵기평가 작성하기" onClick={handleCreateEval}/>     
            <EvaluationList data={data} />
        </div>
    )
};

export default Evaluate;