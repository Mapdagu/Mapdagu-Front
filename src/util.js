import logo192 from "./img/logo192.png";
import ramen from "./img/ramen.png";
import jin from "./img/jin.png";
import neogoori from "./img/neogoori.png";
import buldak from "./img/buldak.png";
import samyang from "./img/samyang.png";

import hot_0 from "./img/profile/hot_0.png";
import hot_1 from "./img/profile/hot_1.png";
import hot_2 from "./img/profile/hot_2.png";

import cute_0 from "./img/profile/cute_0.jpg";
import cute_1 from "./img/profile/cute_1.jpg";
import cute_2 from "./img/profile/cute_2.jpg";
import cute_3 from "./img/profile/cute_3.jpg";
import cute_4 from "./img/profile/cute_4.jpg";
import cute_5 from "./img/profile/cute_5.jpg";

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
            return hot_0;
        case "1":
            return hot_1;
        case "2":
            return hot_2;
        case "3":
            return cute_0;
        case "4":
            return cute_1;
        case "5":
            return cute_2;            
        case "6":
            return cute_3;
        case "7":
            return cute_4;
        case "8":
            return cute_5;
        default:
            return null;
    }
}

export const getSelectionTextById = (selectionId) => {
    const targetSelectionId = String(selectionId);
    switch(targetSelectionId){
        case "1": 
            return "먹어본 적 없다🤷‍♀️";
        case "2":
            return "이게 맵다고?🍼";
        case "3":
            return "딱 맛있게 맵다☺️";
        case "4":
            return "맵지만 즐길 수는 있다🌶️";
        case "5":
            return "휴 도전이었다💦";
        case "6": 
            return "다시는 못 먹을 매운맛!!🔥";
        default:
            return null;
    }
}
export const selectionList = [
    { id: 1, name: getSelectionTextById(1)},
    { id: 2, name: getSelectionTextById(2)},
    { id: 3, name: getSelectionTextById(3)},
    { id: 4, name: getSelectionTextById(4)},
    { id: 5, name: getSelectionTextById(5)},
    { id: 6, name: getSelectionTextById(6)},
]

// export const profileImgList = [
//     {   id: 0, img: getProfileImgById(0)},
//     {   id: 1, img: getProfileImgById(1)},
//     {   id: 2, img: getProfileImgById(2)},
//     {   id: 3, img: getProfileImgById(3)},
//     {   id: 4, img: getProfileImgById(4)},
//     {   id: 5, img: getProfileImgById(5)},
//     {   id: 6, img: getProfileImgById(6)},
//     {   id: 7, img: getProfileImgById(7)},
//     {   id: 8, img: getProfileImgById(8)},
// ]
export const profileImgList = (category) => {
    switch(category){
        case "HOT": 
            return [
                {   id: 0, img: getProfileImgById(0)},
                {   id: 1, img: getProfileImgById(1)},
                {   id: 2, img: getProfileImgById(2)},
            ]
        case "CUTE": 
            return [
                {   id: 3, img: getProfileImgById(3)},
                {   id: 4, img: getProfileImgById(4)},
                {   id: 5, img: getProfileImgById(5)},
                {   id: 6, img: getProfileImgById(6)},
                {   id: 7, img: getProfileImgById(7)},
                {   id: 8, img: getProfileImgById(8)},
            ]
        default:
            return null;
    }
}

export const getResultContentByLevel = (level) => {
    const targetLevel = String(level);
    switch(targetLevel){
        case "1": 
            return "";
        case "2":
            return "";
        case "3":
            return "";
        case "4":
            return "";
        case "5":
            return "";
        case "6": 
            return "";
        case "7": 
            return "";
        case "8":
            return "";
        case "9":
            return "";
        case "10":
            return (
                <div>
                    불닭볶음면도 즐기며 먹는 맵고수군요?
                    <br/>-<br/>-<br/>-<br/>
                    Level.3단계에 속해 있는 엽기떡볶이 오리지널 맛을 도전해 보는 건 어떠세요?
                </div>
            )
        case "11":
            return "";
        case "12": 
            return "";
        default:
            return null;
    }

}