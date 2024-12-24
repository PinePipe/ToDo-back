import { createServer } from 'node:http'; //создаем сервер
import fs from 'node:fs' //пока не надо
import { changeStatus, createTask, getData, initCounter, deleteTask } from './storage.js'; // импорты из storage

const hostname = 'localhost'; //адрес
const port = 3000; //порт

function init() { //из storage функция для счета задач
  initCounter()
}
const server = createServer((req, res) => { //создаем сервер
  const url = req.url
  const method = req.method //используем методы get, post, patch, delete
  res.statusCode = 200; // статус ответа
  res.setHeader('Content-Type', 'application/json'); //отвечаем в json

  if (url === '/tasks' && method === 'POST') { //создаем задачу
    let body = [];//создаем массив
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const item = JSON.parse(body)
      const result = createTask(item) //вызываем функцию, чтобы создать задачу
      console.log(result);
      res.end(result) //преобразуем данные в строку и парсим в json
    });
  }
  if (url === '/tasks' && method === 'PATCH') { //менаяем статус на вып/невып
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changedData = changeStatus(requestData.id)
      res.end(changedData)
    });
  }

  if (url === '/tasks' && method === 'DELETE') { //логично же
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body);
      const result = deleteTask(requestData.id);
      res.end();
    });
  }
  
  if (url === '/tasks' && method === 'GET') { //получаем список задач
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  init() //счетчик задач
  console.log(`Server running at http://${hostname}:${port}/`);
});