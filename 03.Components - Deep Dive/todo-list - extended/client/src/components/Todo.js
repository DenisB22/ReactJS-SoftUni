export default function Todo({ 
    id, 
    text, 
    isCompleted,
    toggleTodoStatus,
    onToDoDelete,
}) {
  return (
    <tr className={`todo ${isCompleted ? "is-completed" : ""}`.trim()}>
      <td>{text}</td>
      <td>{isCompleted ? "Complete" : "Not Complete"}</td>
      <td className="todo-action">
        <button className="btn todo-btn" onClick={() => toggleTodoStatus(id)}>Change status</button>
        <button className="btn todo-btn" onClick={() => onToDoDelete(id)}>Delete</button>
      </td>
    </tr>
  );
}
