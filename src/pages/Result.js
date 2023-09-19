import { useContext, useEffect } from "react";
import ResultViewer from "../components/ResultViewer";
import { EvalDispatchContext, EvalStateContext } from "../App";
import axios from "axios";
import { getCookie } from "../cookie";

const TEST_URL = `https://mapdagu.site/api/test`;
const RESULT_URL = `https://mapdagu.site/api/test/info`;

const Result = ({maxTestNum, role}) => {
    const accessToken = getCookie("accessToken");
    const data = useContext(EvalStateContext);
    const { onDelete, onSubmit } = useContext(EvalDispatchContext);
    //임시 데이터
    const schoville = 3000; 
    const level = 2;

    const dtoList = data.map(item => {
        return {
          name: item.itemName[0],
          score: item.selectionId,
        };
      });

    useEffect(() => {
          if(role === "NOT_TEST_USER"){
            try{
                axios.post(TEST_URL, {dtoList}, {headers: {Authorization: accessToken}});
                onSubmit();
              } catch (error) {
                alert(error.response.data.message);
            }
          } else{   
              try{
                axios.patch(TEST_URL, {dtoList}, {headers: {Authorization: accessToken}});
              } catch (error) {
                alert(error.response.data.message);
            }
          }
          try{
              axios.patch(RESULT_URL, {schoville, level}, {headers: {Authorization: accessToken}});
          } catch (error) {
              alert(error.response.data.message);
          }
          
        for(let i=0; i<maxTestNum+1; i++){
          onDelete(i);
        }
    }, []);
    
    return(
        <div className="container">
            <div className="content">
                <ResultViewer />                
            </div>
        </div>
    )
}

export default Result;