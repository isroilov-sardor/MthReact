import axios from "axios";

export const https = axios.create({
    baseURL: "https://api.fastforex.io/",
});
export const giturl = axios.create({
    baseURL: "https://api.github.com/",
});
export const gogleAPI = axios.create({
    baseURL: "https://www.googleapis.com/",
});
