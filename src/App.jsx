import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDo from "./components/ToDo.jsx";

const Wrapper = styled.div`
  display: block;
  width: 320px;
  margin: 25px auto 0 auto;
  background: #666;
  color: #fff;
  padding: 12px;
  border-radius: 5px;
`;
const Title = styled.h1`
  font-weight: normal;
`;
const SubTitle = styled.h2`
  font-weight: normal;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const ToDoForm = styled.form`
  display: flex;
`;
const ToDoInput = styled.input.attrs({ type: "text" })`
  border: 1px solid #000;
  background: #000;
  color: #fff;
`;
const ToDoButton = styled.button.attrs({ type: "submit" })`
  background: #000;
  color: #fff;
  border: 1px solid #666;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: #999;
  }
`;

function App() {
  const [todos, setTodos] = useState([]);
  const $todoInput = useRef();

  const handleAddToDo = (event) => {
    event.preventDefault();
    const todoText = $todoInput.current.value;
    setTodos((previousTodos) => {
      return [
        ...previousTodos,
        { uuid: uuidv4(), todo: todoText, complete: false },
      ];
    });
    console.log(todos);
    $todoInput.current.value = null;
  };

  const handleUpdateTodo = (uuid) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.uuid === uuid);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (uuid) => {
    //Get all ToDos that are not the one we want to delete
    const newTodos = todos.filter((todo) => todo.uuid !== uuid);
    //Set our todos to the new todo
    setTodos(newTodos);
  };

  const handleClearTodos = () => {
    const newTodos = todos.filter((todo) => todo.complete !== true);
    setTodos(newTodos);
  };

  return (
    <Wrapper>
      <Title>Styled Component Todo App</Title>
      <>
        <SubTitle>ToDos:</SubTitle>
        {todos?.map((todo) => {
          return (
            <ToDo
              key={todo.uuid}
              {...todo}
              handleUpdateTodo={handleUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          );
        })}
      </>
      <div>
        <SubTitle>Add Todo</SubTitle>
        <ToDoForm onSubmit={handleAddToDo}>
          <ToDoInput ref={$todoInput} placeholder="Add Todo" required />
          <ToDoButton>Add Todo #{todos.length}</ToDoButton>
        </ToDoForm>
        <ToDoButton
          type="button"
          onClick={() => {
            handleClearTodos();
          }}
        >
          Clear Completed
        </ToDoButton>
      </div>
    </Wrapper>
  );
}

export default App;
