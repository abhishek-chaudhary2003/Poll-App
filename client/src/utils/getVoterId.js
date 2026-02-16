import {v4 as uuidv4 } from "uuid"

export const getVoterId=()=>{
    let id=localStorage.getItem("voterId");
    if(!id){
        id=uuidv4();
        localStorage.setItem("voterId",id);
    }
    return id;
};