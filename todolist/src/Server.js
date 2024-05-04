// const http = require('http');
// const url = require('url');
// const fs = require('fs');

// // Doğru API dosyasının yolunu belirtin
// const { getAllTodoItems, createTodoItem } = require('./Api.js');

// const server = http.createServer((req, res) => {
//   const reqUrl = url.parse(req.url, true);
//   const pathName = reqUrl.pathname;

//   if (req.method === 'GET' && pathName === '/todos') {
//     // Tüm todo öğelerini al
//     getAllTodoItems()
//       .then((todos) => {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify(todos));
//       })
//       .catch((error) => {
//         res.writeHead(500, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
//       });
//   } else if (req.method === 'POST' && pathName === '/todos') {
//     // Yeni bir todo öğesi oluştur
//     let requestBody = '';
//     req.on('data', (data) => {
//       requestBody += data;
//     });
//     req.on('end', () => {
//       try {
//         const newTodoItem = JSON.parse(requestBody);
//         createTodoItem(newTodoItem)
//           .then((createdTodo) => {
//             res.writeHead(201, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(createdTodo));
//           })
//           .catch((error) => {
//             res.writeHead(500, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify({ message: 'Internal Server Error', error: error.message }));
//           });
//       } catch (error) {
//         res.writeHead(400, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Invalid JSON Format', error: error.message }));
//       }
//     });
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'Endpoint Not Found' }));
//   }
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Merhaba, Dünya!');
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
