import "./Graph.css";

const Graph = ({level}) => {
    if(level){
        return(
            <div className="Graph">
                <div className="buttons">
                    {level===1 ?<button className="color-1" autoFocus>1</button>:<button className="color-1">1</button>}
                    {level===2 ?<button className="color-2" autoFocus>2</button>:<button className="color-2">2</button>}
                    {level===3 ?<button className="color-3" autoFocus>3</button>:<button className="color-3">3</button>}
                    {level===4 ?<button className="color-4" autoFocus>4</button>:<button className="color-4">4</button>}
                    {level===5 ?<button className="color-5" autoFocus>5</button>:<button className="color-5">5</button>}
                    {level===6 ?<button className="color-6" autoFocus>6</button>:<button className="color-6">6</button>}
                    {level===7 ?<button className="color-7" autoFocus>7</button>:<button className="color-7">7</button>}
                    {level===8 ?<button className="color-8" autoFocus>8</button>:<button className="color-8">8</button>}
                    {level===9 ?<button className="color-9" autoFocus>9</button>:<button className="color-9">9</button>}
                    {level===10 ?<button className="color-10" autoFocus>10</button>:<button className="color-10">10</button>}
                    {level===11 ?<button className="color-11" autoFocus>11</button>:<button className="color-11">11</button>}
                    {level===12 ?<button className="color-12" autoFocus>12</button>:<button className="color-12">12</button>}
                    {/* <button className="btn-hover color-13">13</button>
                    <button className="btn-hover color-14">14</button>
                    <button className="btn-hover color-15">15</button> */}
                </div>
            </div>
        );
    }
}
export default Graph;