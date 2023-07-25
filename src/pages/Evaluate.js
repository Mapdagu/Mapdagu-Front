import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Search from "../components/Search";
import EvaluationList from "../components/EvaluationList";

const Evaluate = ({data}) => {
    return(
        <div>
            <Header
                title="evaluate page"
            />
            <Navigator/>            
            <Search/>
            <EvaluationList data={data} />
        </div>
    )
}

export default Evaluate;