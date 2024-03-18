import axios from 'axios';
import env from '../config/enviroment';

interface IPost {
    endpoint: string;
    body: Record<string, string | number | boolean | null | undefined>;
}

const usePost = async ({ endpoint, body }: IPost) => {
    try {
        const { data } = await axios.post(env.apiBaseURL + endpoint, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data;
    } catch (err) {
        console.error('HTTP Post Error', err);
        return err;
    }
};

export default usePost;
