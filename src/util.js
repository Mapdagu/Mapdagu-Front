import img0 from "./img/logo192.png";

export const getSelectionTextById = (selectionId) => {
    const targetSelectionId = String(selectionId);
    switch(targetSelectionId){
        case "0":
            return "이게 맵다고?🍼";
        case "1":
            return "딱 맛있게 맵다☺️";
        case "2":
            return "맵지만 즐길 수는 있다🌶️";
        case "3":
            return "휴 도전이었다💦";
        case "4": 
            return "다시는 못 먹을 매운맛!!🔥";
        case "5": 
            return "먹어본 적 없다🤷‍♀️";
        default:
            return null;
    }
}

export const getItemImgById = (itemId) => {
    const targetItemId = String(itemId);
    switch(targetItemId){
        case "0":
            return img0;
        case "1":
            return img0;
        case "2":
            return img0;
        default:
            return null;
    }
}

export const selectionList = [
    {
        id: 0,
        name: getSelectionTextById(0),
    },
    {
        id: 1,
        name: getSelectionTextById(1),
    },
    {
        id: 2,
        name: getSelectionTextById(2),
    },
    {
        id: 3,
        name: getSelectionTextById(3),
    },
    {
        id: 4,
        name: getSelectionTextById(4),
    },
    {
        id: 5,
        name: getSelectionTextById(5),
    },
]

export const testItemList = [
    {
        id: 0,
        itemName: "신라면",
        img: getItemImgById(0),
    },
    {
        id: 1,
        itemName: "불닭볶음면",
        img: getItemImgById(1),
    },
    {
        id: 2,
        itemName: "엽기떡볶이 오리지널",
        img: getItemImgById(2),
    },

]