import buldak from "./img/buldak.png";
import dduk from "./img/dduk.png";
import ramen from "./img/ramen.png";
import profile_0 from "./img/profile_0.png"
import profile_1 from "./img/profile_1.png"
import profile_2 from "./img/profile_2.png"

export const getSelectionTextById = (selectionId) => {
    const targetSelectionId = String(selectionId);
    switch(targetSelectionId){
        case "1":
            return "이게 맵다고?🍼";
        case "2":
            return "딱 맛있게 맵다☺️";
        case "3":
            return "맵지만 즐길 수는 있다🌶️";
        case "4":
            return "휴 도전이었다💦";
        case "5": 
            return "다시는 못 먹을 매운맛!!🔥";
        case "6": 
            return "먹어본 적 없다🤷‍♀️";
        default:
            return null;
    }
}

export const getItemImgById = (itemId) => {
    const targetItemId = String(itemId);
    switch(targetItemId){
        case "0":
            return ramen;
        case "1":
            return buldak;
        case "2":
            return dduk;
        default:
            return null;
    }
}

export const getProfileImgById = (itemId) => {
    const targetItemId = String(itemId);
    switch(targetItemId){
        case "0":
            return profile_0;
        case "1":
            return profile_1;
        case "2":
            return profile_2;
        default:
            return null;
    }
}

export const selectionList = [
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
    {
        id: 6,
        name: getSelectionTextById(6),
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

export const profileImgList = [
    {
        id: 0,
        img: getProfileImgById(0),
    },
    {
        id: 1,
        img: getProfileImgById(1),
    },
    {
        id: 2,
        img: getProfileImgById(2),
    },
]

export const getMonthRangeByDate = (date) => {
    const beginTimeStamp = new Date(date.getFullYear(), date.getMonth, 1).getTime();
    const endTimeStamp = new Date(
        date.getFullYear(),
        date.getMonth() +1,
        0,
        23,
        59,
        59
    ).getTime();
    return { beginTimeStamp, endTimeStamp };
}

export const getFormattedDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();
    if(month < 10){
        month = `0${month}`;
    }
    if(date < 10){
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}
