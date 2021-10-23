import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Text } from "ui-kit";
import { PostService } from "sdk";
//local imports
import "./post.css";
import Post from "./components/Todo";

export default function PostList() {
  const [posts, setPosts] = useState(null);
  // Can be used to access meta deta here
  const [raw, rawData] = useState({});
  const [loading, setLoading] = useState(true);
  const currentPageNumber = useRef(1);
  const endReached = useRef(false);

  // inital Post loading effect
  useEffect(() => {
    fetch({ page: 1 }, (cbData) => {
      rawData(cbData);
      setPosts(cbData.data);
    });
  }, []);

  const fetch = async ({ page, reload = true }, callback) => {
    if (reload) setLoading(true);
    let res = await PostService.getPublicPosts({ page });
    let jsonData = await res.json();
    if (page > jsonData?.meta?.pages) {
      endReached.current = true;
    }
    callback(jsonData);
    if (reload) setLoading(false);
  };

  const refetch = () => {
    
    fetch({ page: currentPageNumber.current, reload: false }, (newCb) => {
      setPosts((existingPost) => {
        return [...newCb?.data];
      });
    });
  };
  let hasPost = Boolean(posts && posts.length);

  const renderPost = () => {
    if (loading) {
      return null;
    }

    if (!loading && !hasPost) {
      return <Text type={"h2"}>Your feed is empty</Text>;
    }
    return <table>
      <tr style={{ position: 'sticky', top: 0}}><th>Title</th><th>Body</th></tr>
      {posts.map((post) => {
      return <Post key={post.id} title={post.title} body={post.body} />;
    })}</table>;
  };

  const onClickLoadNext = () => {
    if(!endReached.current){
      currentPageNumber.current = currentPageNumber.current + 1;
    }
    refetch();
  };

  const onClickPrevious = () => {
    if(currentPageNumber.current > 1){
      currentPageNumber.current = currentPageNumber.current - 1;
    }
    refetch();
  };

  return (
    <Box className="postListContainer">
      <Box className="postList">
      {loading && <Box>Loading...</Box>}
      {renderPost()}
      </Box>
      <Box className={"postListActions"}>
        {hasPost && (<>
          <Box className='postLoadMoreBtn'>
          <Button onClick={onClickPrevious} disabled={currentPageNumber.current === 1}>Prev Page</Button>
        </Box>
          <Box className='postLoadMoreBtn'>
            <Button onClick={onClickLoadNext} disabled={endReached.current}>Next Page</Button>
          </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
