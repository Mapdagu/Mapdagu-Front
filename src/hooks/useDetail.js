import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EvalStateContext } from "../App";

const useDetail = (id) => {
    const data = useContext(EvalStateContext);
    const [detail, setDetail] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const matchItem = data.find((it)=> String(it.id) === String(id));
        if(matchItem){
            setDetail(matchItem);
        }
        else{
            alert("항목이 존재하지 않습니다");
            navigate("/evaluate", {replace:true});
        }
    }, [id, data])

    return detail;
}

export default useDetail;