import {React, useState, useEffect} from 'react'
import "./Todo.css"

//get data from local storage
const getLocalData = () => {
    let todos = localStorage.getItem('todos');
    console.log(todos);

    if(todos){
        return JSON.parse(localStorage.getItem('todos'));
    }else{
        return [];
    }
}

const Todo = () => {
    const [inputTODO, setInputTODO] = useState('');
    const [todos, setTodo] = useState(getLocalData());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditITodo, setIsEditTodo] = useState(null);

    //Insert data to local storage
    const addTODO = () => {
        if (!inputTODO) {
            alert('Please Insert data');
        } else if(inputTODO && !toggleSubmit) {
            setTodo(
                todos.map((list) => {
                    if (list.id === isEditITodo) {
                        return { ...list, name: inputTODO }
                    }
                    return list;
                })
            )
                 setToggleSubmit(true);

                 setInputTODO('');

                 setIsEditTodo(null);
        } else {
            const allInputTodo = { id: new Date().getTime().toString(), name:inputTODO }
            setTodo([...todos, allInputTodo]);
            setInputTODO('')
        }
    }
    //save data in local storage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
     }, [todos]);

     //delete data
     const deleteTodo = (index) => {
        const updatedtodos = todos.filter((list) => {
            return index !== list.id;
        });

        setTodo(updatedtodos);
    }

    //edit data
    const editTodo = (id) => {
        let newEditTodo = todos.find((list) => {
            return list.id === id
        });
        console.log(newEditTodo);

        setToggleSubmit(false);

        setInputTODO(newEditTodo.name);

        setIsEditTodo(id);

    }

    //remove all from local storage
    const removeAllTodo = () => {
        setTodo([]);
   }


    return (
        <>
            <div className="bodyTodo">
                <div className="innertodo">
                    <figure>
                    <figcaption>Save Your TODOs Here</figcaption>
                    </figure>

                    <div className="insertTodo">
                        <input type="text" placeholder="TODO"
                            value={inputTODO}
                            onChange={(e) => setInputTODO(e.target.value)} />

                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addTODO}></i> :
                                 <i className="far fa-edit add-btn" title="Update Item" onClick={addTODO}></i>
                        }
                    </div>

                    <div className="viewTodo">
                        {
                            todos.map((list) => {
                                return(
                                    <div className="todoList" key={list.id}>
                                        <h3>{list.name}</h3>
                                        <div className="todobtn">
                                            <i className="far fa-edit add-btn" title="Edit Item" onClick={() => editTodo(list.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteTodo(list.id)}></i>
                                        </div>
                                  </div>
                                )
                            })
                        }
                    </div>
                    <div className="viewTodo">
                        <button className="btnefe" onClick={removeAllTodo}>REMOVE ALL</button>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default Todo
