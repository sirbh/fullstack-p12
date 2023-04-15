const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

console.log(process.env.MONGO_URL);

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");
const redis = require('./redis');
const { Todo } = require("./mongo");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.get("/result", async(req,res)=>{
  res.send("the result are out")
})

app.get("/statistic", async (req, res) => {
  try {
    let total = await redis.getAsync("added_todos");
    if(!total){
        const totalCount = await Todo.countDocuments()
        await redis.setAsync("added_todos",totalCount);
        return res.send({added_todos:totalCount})
    }
    res.send({ added_todos: total });
  } catch (e) {
    res.status(400).send("something went wrong");
  }
});
app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
