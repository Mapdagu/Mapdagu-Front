import { useEffect, useState } from "react";
import "./Graph.css";

const Graph = ({level}) => {
    const buttons = [
        {id: 1, text: "1"},
        {id: 2, text: "2"},
        {id: 3, text: "3"},
        {id: 4, text: "4"},
        {id: 5, text: "5"},
        {id: 6, text: "6"},
        {id: 7, text: "7"},
        {id: 8, text: "8"},
        {id: 9, text: "9"},
        {id: 10, text: "10"},
        {id: 11, text: "11"},
        {id: 12, text: "12"},
    ]
    
    const [focusedButton, setFocusedButton] = useState(level);
    
    useEffect(() => {
        if(level) {
            setFocusedButton(level);
        }
    }, [level]);
    const handleButtonFocus = (buttonId) => {
      setFocusedButton(buttonId);
    };

    if(level){
        return(
            <div className="Graph">
                <div className="text_level">
                    <p className="left">1</p>
                    <p className="right">12</p>
                </div>
                <div className="buttons">
                    {buttons.map((it) => (
                        <button
                            key={it.id}
                            className={[["color", it.id].join("-"), `${focusedButton === it.id ? 'focused_button' : ''}`].join(" ")}
                            onFocus={() => handleButtonFocus(it.id)}
                            // onBlurCapture={() => handleButtonFocus(level)}
                        >
                        {it.text}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}
export default Graph;