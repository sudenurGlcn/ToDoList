// // import axios from 'axios';

// // const baseUrl = 'https://virtserver.swaggerhub.com/SUDENURGLCN_1/ToDoList/1.0.0';

// // const api = axios.create({
// //   baseURL: baseUrl,
// // });

// // export const getAllTodoItems = () => api.get('/toDoList');
// // export const createTodoItem = (todoItem) => api.post('/toDoList', todoItem);
// // export const getTodoItemById = (id) => api.get(`/toDoList/${id}`);
// // export const updateTodoItem = (id, updatedTodoItem) => api.put(`/toDoList/${id}`, updatedTodoItem);
// // export const deleteTodoItem = (id) => api.delete(`/toDoList/${id}`);

// // const apis = {
// //   getAllTodoItems,
// //   createTodoItem,
// //   getTodoItemById,
// //   updateTodoItem,
// //   deleteTodoItem,
// // };

// // export default apis;
// import axios from 'axios';

// const baseUrl = 'https://virtserver.swaggerhub.com/SUDENURGLCN_1/ToDoList/1.0.0';

// const api = axios.create({
//   baseURL: baseUrl,
// });

// export const getAllTodoItems = async () => {
//   try {
//     const response = await api.get('/toDoList');
//     console.log(response.data);
//     return response.data;
    
//   } catch (error) {
//     console.error('Error fetching todo list:', error.message);
//     throw error;
//   }
// };

// export const createTodoItem = async (todoItem) => {
//   try {
//     const response = await api.post('/toDoList', todoItem);
//     return response.data;
//   } catch (error) {
//     console.error('Error adding todo:', error.message);
//     throw error;
//   }
// };

// export const getTodoItemById = async (id) => {
//   try {
//     const response = await api.get(`/toDoList/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todo item by id:', error.message);
//     throw error;
//   }
// };

// export const updateTodoItem = async (id, updatedTodoItem) => {
//   try {
//     const response = await api.put(`/toDoList/${id}`, updatedTodoItem);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating todo item:', error.message);
//     throw error;
//   }
// };

// export const deleteTodoItem = async (id) => {
//   try {
//     const response = await api.delete(`/toDoList/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting todo item:', error.message);
//     throw error;
//   }
// };

// const apis = {
//   getAllTodoItems,
//   createTodoItem,
//   getTodoItemById,
//   updateTodoItem,
//   deleteTodoItem,
// };

// export default apis;
// React uygulamanızda kullanılacak API çağrılarını içeren bir modül (apis.js)

import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Sunucunuzun URL'si

const apis = {
  getAllTodoItems: async () => {
    try {
      const response = await axios.get(`${baseURL}/toDoList`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  createTodoItem: async (newTodo) => {
    try {
      const response = await axios.post(`${baseURL}/toDoList`, newTodo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateTodoItem: async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${baseURL}/toDoList/${id}`, updatedTodo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  deleteTodoItem: async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/toDoList/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apis;
