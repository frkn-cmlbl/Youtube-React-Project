import axios from "axios";
const apiKey="AIzaSyD4zKXss_WNs2TYykJlt_9FMcxW0b52sPk";
const service=axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3/",
    
})

export function getVideo(text:string){
    const prm={
        part:"snippet",
        key:apiKey,
        q:text,
        type:"video"
    }
    return service.get("search",{params:prm})
}