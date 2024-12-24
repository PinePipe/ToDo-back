let counter = 1
const data = [ //тот же массив для задач
  {
    id: 1,
    text: 'text',
    isDone: true
  }
]

export function initCounter() { //счетчик задач
  if (data.length === 0) {
    return
  }
  data.forEach(element => {
    if (element.id >= counter) {
      counter = element.id + 1
    }
  });
}

export function getData() { //возвращаем задачи в json
  return JSON.stringify(data)
}

export function createTask(inputData) { //создает задачу и возвращает ее в json
  const item = {
    id: counter++,
    ...inputData
  }
  data.push(item)
  return JSON.stringify(item)
}

export function changeStatus(id) { //вып/невып, но в json
  const item = data.find(i => i.id === id)
  item.isDone = !item.isDone
  return JSON.stringify(item)
}

export function deleteTask(id) { //сам помнишь
  const idx = data.findIndex(i => i.id === id)
  if (idx === -1) {
    console.log('Такого id не существует');
    return
  }
  data.splice(idx, 1)
  return 1
}