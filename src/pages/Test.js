import Selection from "../components/evaluate/Selection";
import { EvalDispatchContext, EvalStateContext } from "../App";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Test = ({maxTestNum}) => {        
    const navigate = useNavigate();
    const testData = useContext(EvalStateContext);
    const {onCreate, onUpdate, onDelete} = useContext(EvalDispatchContext);

    const [ testNum, setTestNum ] = useState(0);
    const [ idRefTest, setIdRefTest ] = useState(0);
    const matchItem = testData.find((it)=> String(it.id) === String(idRefTest));

    const goBack = () => {
        if(testNum === 0){
            navigate(-1);
            for(let i=0; i<maxTestNum+1; i++){
              onDelete(1, i);
            }
        }
        else{
            setTestNum(testNum - 1);
            setIdRefTest(idRefTest-1);
        }
    }
    const goNext = (itemName, selectionId) => {
        if(!matchItem){
            onCreate( 1, itemName, idRefTest, selectionId );
            setIdRefTest(idRefTest+1);
        }
        else{
            onUpdate( 1, itemName, idRefTest, selectionId );
            setIdRefTest(idRefTest+1);
        }
        // console.log(testData);
        if(testNum === maxTestNum){
            submitHandler();
        }
        else{
            setTestNum(testNum + 1);
        }
    }
    const submitHandler = () => {
        navigate(`/result`);
    }
    
    return (
        <div className="container">
            <div className="content">
                <Selection testData={testData} testNum={testNum} maxTestNum={maxTestNum} goNext={goNext} goBack={goBack}/>
            </div>
        </div>
    )
}

export default Test;