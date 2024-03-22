import axios from "axios";
import env from "../config/enviroment";
import { IPost } from "./types";

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