import { IPost } from "./types";
import { postData } from "./utils";

const usePost = async ({ endpoint, body }: IPost) => {
  return await postData({ endpoint, body });
};

export default usePost;
