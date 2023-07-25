import "./Bottom.css";

const Bottom = ({leftChild, rightChild}) => {
    return (
        <div className="Bottom">
            <div className="bottom_left">{leftChild}</div>
            <div className="bottom_right">{rightChild}</div>
        </div>
    )
}

export default Bottom;