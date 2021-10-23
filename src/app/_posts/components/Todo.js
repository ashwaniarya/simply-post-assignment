import React from "react";
import { Text, Box } from "ui-kit";

//local imports
import "../post.css";

export default function Todo({ title, body }) {
  return (
    <Box className='post postPrimary'>
      <Text type={"h2"} className={"margin-0 margin-bottom-1rem"}>
        {title}
      </Text>
      <Text type={"p"} className={"margin-0 postDescription"}>
        {body}
      </Text>
    </Box>
  );
}
