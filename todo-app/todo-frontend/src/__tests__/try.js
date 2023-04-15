import Todo from "../Todos/Todo"
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'


test('load todo component', async () => {
    const todo = {
        _id:'@123',
        done:false,
        text:"test todo"
    }
    render(<Todo todo={todo} onClickComplete={()=>{}} onClickDelete={()=>{}}  />)
    expect(screen.getByTestId('todo')).toHaveTextContent(todo.text)
  })