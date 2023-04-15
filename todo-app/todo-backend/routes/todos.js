const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
  const totalTodos = await redis.getAsync("added_todos");
	if (totalTodos) {
		await redis.setAsync("added_todos", parseInt(totalTodos) + 1);
	} else {
    const count = await Todo.countDocuments();
		await redis.setAsync("added_todos", count);
	}
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); 
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.todo)
  console.log(req.body)
  const result = await Todo.findByIdAndUpdate({_id:req.todo._id},req.body)
  if(!result){
    return res.send(404)
  }
  res.send({
    _id:req.todo._id,
    ...req['body']
  }) // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)

 
module.exports = router;
