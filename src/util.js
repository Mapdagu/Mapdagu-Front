import logo192 from "./img/logo192.png";
import ramen from "./img/ramen.png";
import jin from "./img/jin.png";
import neogoori from "./img/neogoori.png";
import buldak from "./img/buldak.png";
import samyang from "./img/samyang.png";

import profile_0 from "./img/profile_0.png"
import profile_1 from "./img/profile_1.png"
import profile_2 from "./img/profile_2.png"

export const getItemImgById = (itemId) => {
    const targetItemId = String(itemId);
    switch(targetItemId){
        case "0" : 
            return logo192;
        case "1":
            return ramen;
        case "2":
            return jin;
        case "3":
            return neogoori;
        case "4":
            return buldak;            
        case "5":
            return samyang;
        default:
            return null;
    }
}
export const testItemList = [
    {
        id: 0,
        itemName: "신라면",
        img: getItemImgById(1),
    },
    {
        id: 1,
        itemName: "진라면",
        img: getItemImgById(2),
    },
    {
        id: 2,
        itemName: "너구리",
        img: getItemImgById(3),
    },
    {
        id: 3,
        itemName: "불닭볶음면",
        img: getItemImgById(4),
    },
    {
        id: 4,
        itemName: "삼양라면",
        img: getItemImgById(5),
    },
]

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
