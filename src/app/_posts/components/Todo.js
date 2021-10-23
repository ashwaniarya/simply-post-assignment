import React from "react";
import { Text, Box } from "ui-kit";

//local imports
import "../post.css";

export default function Todo({ title, body }) {
  return (
      <tr className='postPrimary'>
      <td><Text type={"p"} className={"margin-0 margin-bottom-1rem"}>
        {title}
      </Text></td>
      <td><Text type={"p"} className={"margin-0 postDescription margin-bottom-1rem"}>
        {body}
      </Text></td>
      </tr>
  );
}
