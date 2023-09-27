import Header from "../components/Header";

const SearchedContent = () => {
    return(
        <div className="container">
            <div className="header">
                <Header 
                    type={1}
                    leftChild={<button onClick={handleOnBack}>
                        <img alt="back" src={icon_back}/>
                    </button>}
                />
            </div>
            <div className="content">
                <Search />
            </div>
            <div className="footer">
                <Navigator/>
            </div>
        </div>
    )

}

export default SearchedContent;