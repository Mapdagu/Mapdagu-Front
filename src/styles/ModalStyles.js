const searchFood_SMALL = () => {
    window.addEventListener('resize', searchFood_SMALL);
    if(window.innerWidth <= 400){
        return {content: {
                width: "16.8rem",
                height: "9rem",
                margin: "15rem auto auto auto",
                border: "none",
                borderRadius: "20px", 
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            }
        }
    }else{
        return {content: {
                width: "21.5rem",
                height: "9rem",
                margin: "17.8rem auto auto auto",
                border: "none",
                borderRadius: "20px", 
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            }
        }
    }
};
const searchFood_BIG = () => {
    window.addEventListener('resize', searchFood_SMALL);
    if(window.innerWidth <= 400){
        return {content: {
                width: "16.8rem",
                height: "25rem",
                margin: "auto",
                border: "none",
                borderRadius: "20px", 
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            }
        }
    }else{
        return {content: {
                width: "21.5rem",
                height: "27rem",
                margin: "auto",
                border: "none",
                borderRadius: "20px", 
                boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            }
        }
    }
}

const selectProfileImg = () => {
    window.addEventListener('resize', selectProfileImg);
    if(window.innerWidth <= 400){
        return {content: {
            width: "16.8rem",
            height: "28.5rem",
            margin: "auto",
            padding: "1.25rem",
            border: "none",
            borderRadius: "20px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
        }
    }else{
        return {content: {
            width: "21.5rem",
            height: "37.5rem",
            margin: "auto",
            padding: "1.25rem",
            border: "none",
            borderRadius: "20px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
        }
    }
};

const checkRequests = () => {
    window.addEventListener('resize', checkRequests);
    if(window.innerWidth <= 400){
        return {content: {
            width: "16.8rem",
            height: "30rem",
            margin: "auto",
            padding: "1.25rem",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            overflowY: "scroll",
        }
        }
    }else{
        return {content: {
            width: "21.5rem",
            height: "35.5rem",
            margin: "auto",
            padding: "1.25rem",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
            overflowY: "scroll",
        }
        }
    }
}

const login = () => {
    window.addEventListener('resize', login);
    if(window.innerWidth <= 400){
        return {content: {
            width: "16.8rem",
            height: "13rem",
            margin: "auto",
            padding: "10px",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
        }
    }else{
        return {content: {
            width: "18.125rem",
            height: "15rem",
            margin: "auto",
            padding: ".25rem",
            border: "none",
            borderRadius: "30px", 
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.1)",
        }
        }
    }
}






/* Editor*/
export {searchFood_SMALL, searchFood_BIG};
/* SetProfile*/
export {selectProfileImg};
/* Friend page*/
export {checkRequests};
/* TestMain - Login*/
export {login};