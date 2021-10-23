import { NetworkRequest } from "../network";
import { BASE_URL, PATH } from "../api";

const PostService = {
  getPublicPosts: function ({ page = 1, limit = 8  }) {
    return NetworkRequest(
      "GET",
      BASE_URL,
      PATH.getPublicPost
        .replace("{{page}}", page)
        .replace("{{limit}}", limit),
      null
    );
  },
};

export default PostService;
