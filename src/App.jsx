import styled from "styled-components";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
const ToDoWrapper = styled.div`
  display: flex;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
  margin-right: 12px;
`;
const ToDoItem = styled.label`
  font-size: 20px;
  text-decoration: ${(props) =>
    props.$done === true ? "line-through" : "none"};
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
  return (
    <Wrapper>
      <Title>Styled Component Todo App</Title>
      <>
        <SubTitle>ToDos:</SubTitle>
        {todos?.map((todo) => {
          return (
            <ToDoWrapper key={todo.uuid}>
              <Checkbox
                id={todo.uuid}
                checked={todo.complete}
                onChange={() => handleUpdateTodo(todo.uuid)}
              />
              <ToDoItem htmlFor={todo.uuid} $done={todo.complete}>
                {todo.todo}
              </ToDoItem>
            </ToDoWrapper>
          );
        })}
      </>
      <div>
        <SubTitle>Add Todo</SubTitle>
        <ToDoForm onSubmit={handleAddToDo}>
          <ToDoInput ref={$todoInput} placeholder="Add Todo" required />
          <ToDoButton>Add Todo</ToDoButton>
        </ToDoForm>
      </div>
    </Wrapper>
  );
}

export default App;
