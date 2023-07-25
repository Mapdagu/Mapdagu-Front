import "./Selection.css";
import { selectionList } from "../util";
import { useState } from "react";
import img0 from "../img/logo192.png";
// import SelectionItem from "./SelectionItem.";
import OptionItem from "./OptionItem";

const Selection = () => {
    const [state, setState] = useState({
        selectionId: 0,
    });

    const handleChangeSelection = (selectionId) => {
        setState({
            ...state,
            selectionId,
        });
    };

    // useEffect(() => {
    //     if(data){
    //         setState({
    //             ...data,
    //         });
    //     }
    // }, [data]);

    return (
        <div className="Selection">
            <div>
            <img alt="" src={img0}/>
            </div>
            <div className="input_wrapper selection_list_wrapper">
                {selectionList.map((it) => (
                    <OptionItem
                        key={it.id}
                        {...it}
                        onClick={handleChangeSelection}
                        isSelected={state.selectionId === it.id}
                    />
                ))}
            </div>
        </div>

    );
}

export default Selection;