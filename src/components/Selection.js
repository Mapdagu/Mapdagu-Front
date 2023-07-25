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
            {/* <div><button>이게 맵다고?</button> </div>
            <div><button>딱 맛있게 맵다</button> </div>
            <div><button>좀 맵지만 즐길 수는 있다</button> </div>
            <div><button>휴 도전이었다</button> </div>
            <div><button>다시는 못 먹을 매운맛!! ㅠ</button> </div> */}

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