const express = require("express");
const compression = require('compression');
const path = require('path');
const cors = require("cors");
const app = express();
const fetch = require("node-fetch");

const PORT = process.env.PORT || 5000;

app.use(compression({
  chunkSize: 16384
}));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


const endpoints = {
  getPosts:'https://gorest.co.in/public/v1/posts?page={{page}}&limit={{limit}}'
};

app.get("/v1/posts", (req, res) => {
  let { limit = 20 , page = 1 } = req.query 
  const formattedUrl = endpoints.getPosts.replace('{{limit}}',limit).replace('{{page}}',page);
  fetch(formattedUrl, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      // let splittedString = text.slice(14, text.length - 1);
      res.setHeader("Content-Type", "application/json");
      res.status(200).send(json);
    })
    .catch(err=>{
      res.status(500).send(err);
    })
});

// add encoding type
app.use(express.static(path.resolve(__dirname, './build'),{
  cacheControl: true,
}));

app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})

app.listen(PORT, () => {
  console.log("API server is running at ", PORT);
});
