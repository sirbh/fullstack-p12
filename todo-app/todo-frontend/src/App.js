import './App.css';
import TodoView from './Todos/TodoView'

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <div className="App">
      <h1>NEW HEADING</h1>
      <TodoView />
    </div>
  );
}

export default App;
