
import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Çöp kutusu ikonu
import apis from '../Api.js';
import './style.css';

function Main() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    id: 0, // Otomatik olarak artan ID
    name: "",
    description: "",
    releaseDate: "",
    endDate: "",
    completed: false // Tamamlandı durumu için bir state eklendi
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await apis.getAllTodoItems();
      setTodos(response);
      console.log(response);
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewTodo({
      ...newTodo,
      [event.target.name]: event.target.value
    });
  };

  const handleAddTodo = async () => {
    try {
      const highestId = todos.reduce((maxId, todo) => (todo.id > maxId ? todo.id : maxId), 0);
      const newId = highestId + 1;
      const todoWithId = { ...newTodo, id: newId };
      await apis.createTodoItem(todoWithId);
      fetchTodos();
      setNewTodo({
        id: newId + 1, // Yeni ID'yi bir sonraki ID olarak ayarla
        name: "",
        description: "",
        releaseDate: "",
        endDate: "",
        completed: false // Yeni todo eklerken tamamlanmamış olarak ayarlanır
      });
      console.log('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        await apis.updateTodoItem(id, newTodo);
        fetchTodos();
        console.log('Todo updated successfully');
      } else {
        console.error('Todo not found');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleTodoClick = async (id) => {
    // ID'si verilen todo'nun tamamlanma durumu güncellenir
    try {
      await apis.updateTodoItem(id, { completed: true });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCheckboxChange = async (event, id) => {
    const isChecked = event.target.checked; // Checkbox durumu
    try {
      // Todo öğesinin tamamlanma durumunu güncelle
      await apis.updateTodoItem(id, { completed: isChecked });
      // Todo listesini yeniden getir
      fetchTodos();
      console.log('Todo status updated successfully');
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await apis.deleteTodoItem(id);
      fetchTodos();
      console.log('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
        <Container style={{marginRight:"auto",marginLeft:"auto",width:"95%"}}>
          <h1 style={{textAlign:"center"}}>Todo List</h1>
          <Form className='listAddItem'>
            <Row style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}> 
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control type="text" name="name" value={newTodo.name} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control type="text" name="description" value={newTodo.description} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formReleaseDate">
                  <Form.Label>Release Date:</Form.Label>
                  <Form.Control type="date" name="releaseDate" value={newTodo.releaseDate} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date:</Form.Label>
                  <Form.Control type="date" name="endDate" value={newTodo.endDate} onChange={handleInputChange} />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleAddTodo}>Add Todo</Button>
              </Col>
            </Row>
          </Form>
          <hr />
          <h2 style={{ textAlign: "center" }}>Todo List</h2>
          <Container style={{ marginRight: "auto", marginLeft: "auto", width: "90%" }}>
            <Row>
              <ListGroup>
                {todos && todos.map(todo => (
                  <ListGroup.Item
                    className='listitem'
                    key={todo.id}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} // Tamamlanmışsa üstü çizili gösterir
                  >
                    <Form.Group controlId="formCheckbox">
                      <Form.Check
                        type="checkbox"
                        label="Completed"
                        checked={todo.completed} // Tamamlanma durumunu checkbox'un checked özelliğine bağla
                        onChange={(event) => handleCheckboxChange(event, todo.id)} // Checkbox durumu değiştiğinde handleCheckboxChange fonksiyonunu çağır
                        style={{marginRight:"10px",fontSize:"13px"}}
                      />
                    </Form.Group>
                    <Form.Group controlId="formName" className='formlabel'>
                      <Form.Label className='lbl'>Name:</Form.Label>
                      <Form.Control type="text" name="name" value={todo.name} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className='formlabel'>
                      <Form.Label className='lbl'>Description:</Form.Label>
                      <Form.Control type="text" name="description" value={todo.description} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formReleaseDate" className='formlabel'>
                      <Form.Label className='lbl'>Release Date:</Form.Label>
                      <Form.Control type="date" name="releaseDate" value={todo.releaseDate} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="formEndDate" className='formlabel'>
                      <Form.Label className='lbl'>End Date:</Form.Label>
                      <Form.Control type="date" name="endDate" value={todo.endDate} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleUpdateTodo(todo.id)}>
                      Update {/* Güncelle butonu */}
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteTodo(todo.id)}>
                      <FaTrash /> {/* Çöp kutusu ikonu */}
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Row>
          </Container>
        </Container>
      );
}

export default Main;
