import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

import bootstrap from './Src/index.router.js'
const app = express();
app.use(cors())


bootstrap(app,express)

app.listen(5000, () => {
  console.log(`server is listening on port ...... ${process.env.PORT}`);
});
