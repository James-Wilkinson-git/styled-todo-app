import { useState, useEffect } from "react";
import styled from "styled-components";
const ToDoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: ${(props) => (props.$highlight === true ? "red" : "none")};
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
  margin-right: 12px;
`;
const ToDoItem = styled.label`
  flex-grow: 1;
  font-size: 20px;
  text-decoration: ${(props) =>
    props.$done === true ? "line-through" : "none"};
`;
const Delete = styled.button`
  width: 25px;
  height: 25px;
`;
export default function ToDo({
  todo,
  uuid,
  complete,
  handleUpdateTodo,
  handleDeleteTodo,
}) {
  const handleTodoClick = () => {
    handleUpdateTodo(uuid);
  };
  const handleDeleteClick = () => {
    handleDeleteTodo(uuid);
  };
  const [highlight, setHighlight] = useState(true);
  useEffect(() => {
    setHighlight(true);
    setInterval(() => {
      setHighlight(false);
    }, 500);
  }, []);
  return (
    <>
      <ToDoWrapper $highlight={highlight}>
        <Checkbox id={uuid} checked={complete} onChange={handleTodoClick} />
        <ToDoItem htmlFor={uuid} $done={complete}>
          {todo}
        </ToDoItem>
        <Delete onClick={handleDeleteClick}>X</Delete>
      </ToDoWrapper>
    </>
  );
}
