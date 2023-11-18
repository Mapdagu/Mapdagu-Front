import "../styles/Graph.css";
import { useEffect, useState } from "react";

const Graph = ({level, isFriend, totalFriends, levelCounts}) => {
    const [buttons, setButtons] = useState([]);
    const [focusedButton, setFocusedButton] = useState(level);
    const [buttonHeight, setButtonHeight] = useState();
    
    const findValueByKey = (object, key) => {
        return object[key];
    }

    useEffect(() => {
        if(level){
            setFocusedButton(level);
        }

        if(!isFriend){ //main page
            setButtons(Array.from({ length: 12 }, (_, index) => ({
              id: index + 1,
              text: (index + 1).toString(),
            })));
        } else{ //friend page
            const buttonIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            setButtons(buttonIds.map((id) => ({
              id,
              text: levelCounts ? findValueByKey(levelCounts, id) : 'N/A',
            })));
        }

        if(levelCounts){
            setButtonHeight(
                Object.fromEntries(
                    Object.entries(levelCounts).map(([key, value]) => {
                        if(totalFriends <=5){
                            if(value === 1){return [key, 15]}
                            else if(value === 2){return [key,35]}
                            else if(value === 3){return [key, 50]}
                            else if(value === 4){return [key, 75]}
                            else {return [key, 100]}
                        } else if(totalFriends > 5 && totalFriends < 30){
                            if(value >= 1 && value <= 2){return [key, 15]}
                            else if(value >2 && value <= 4){return [key,35]}
                            else if(value >4 && value <= 8){return [key, 50]}
                            else if(value >8 && value <= 13){return [key, 75]}
                            else { return [key, 100]}
                        } else{
                            const percentage = (value/totalFriends) * 100;
                            if(percentage > 0 && percentage <= 15){return [key, 15]}
                            else if(percentage > 15 && percentage <= 40){return [key, 35]}
                            else if(percentage > 40 && percentage <= 70){return [key, 50]}
                            else if(percentage > 70 && percentage <= 90){return [key, 75]}
                            else { return [key, 100]}
                        }
                    })
                )
            )
        }              
    }, [level, levelCounts]);

    const handleButtonFocus = (buttonId) => {
      setFocusedButton(buttonId);
    };

    return(
        <div className="Graph">
            {!isFriend && <div className="text_level">
                <p className="left">1</p>
                <p className="right">12</p>
            </div>}
            <div className="buttons">
                {buttons.map((it) => (
                    <button 
                        key={it.id}
                        className={ isFriend ? 
                            [["color", it.id].join("-"), "focused_button"].join(" ")
                        :[["color", it.id].join("-"), `${focusedButton === it.id ? 'focused_button' : ''}`].join(" ")}
                        onFocus={() => handleButtonFocus(it.id)}
                        style={isFriend?{ height: `${buttonHeight?.[it.id]+40 || 25}px`,
                        maxHeight: "130px",
                        }:{}}
                    >
                    {it.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Graph;