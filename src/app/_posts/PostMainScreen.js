import React from "react";
import PostList from './PostList'
import { Box } from 'ui-kit'
 //local imports
import "./post.css";

export default function PostMainScreen() {

  return (<Box className='postMainContainer'>
    <PostList />
  </Box>
  );

}
