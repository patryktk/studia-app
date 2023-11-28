import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveTodosForUsernameApi } from "../api/TodoApiService";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComoponent(){

    const today =  new Date();
    const targetDate = new Date(today.getFullYear() + 2, today.getMonth(), today.getDay())

    const authContext = useAuth()

    const username = authContext.username

    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null)

    const navigate = useNavigate();


    useEffect (() => refreshTodos(),[])

    function refreshTodos(){
        retrieveTodosForUsernameApi(username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    function deleteTodo(id, description){
        deleteTodoApi(username,id)
        .then(() => {setMessage(`Delete todo: ${description}`); refreshTodos()})
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`)
    }

    return(
        <div className="container">
            <h1>Thing you want To Do!</h1>
            {message && <div id="deleteMessage" className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id, todo.description)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
            </div>
            <div id="addNewTodoButton" className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}