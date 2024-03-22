import axios from "axios";
import env from "../config/enviroment";
import { IGet, IPost } from "./types";

export const postData = async ({ endpoint, body }: IPost) => {
    try {
        const { data } = await axios.post(
            env.apiBaseURL + endpoint,
            body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return data;
    } catch (err) {
        console.error('HTTP Post Error', err);
        return err;
    }
}

export const fecthData = async ({ endpoint }: IGet ) => {
    try {
        const { data } = await axios.get(
            env.apiBaseURL + endpoint,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return data;
    } catch (err) {
        console.error('HTTP GET Error', err);
        return err;
    }
}