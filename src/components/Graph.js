import "./Graph.css";

const Graph = ({data}) => {
    const {userName, level} = data;
    return(
        <div className="Graph">
        <span className="nickname_container">{userName} </span>
            님은 Level. {level} 단계입니다.
            <div className="buttons">
                <button className="btn-hover color-1">1</button>
                <button className="btn-hover color-2">2</button>
                <button className="btn-hover color-3">3</button>
                <button className="btn-hover color-4">4</button>
                <button className="btn-hover color-5">5</button>
                <button className="btn-hover color-6">6</button>
                <button className="btn-hover color-7">7</button>
                <button className="btn-hover color-8">8</button>
                <button className="btn-hover color-9">9</button>
                <button className="btn-hover color-10">10</button>
                <button className="btn-hover color-11">11</button>
                <button className="btn-hover color-12">12</button>
                <button className="btn-hover color-13">13</button>
                <button className="btn-hover color-14">14</button>
                <button className="btn-hover color-15">15</button>
            </div>
        </div>
    );
}
export default Graph;