const inputEl = (document.getElementsByClassName('app__controls-input'))[0];
const btnEl = (document.getElementsByClassName('app__controls-button'))[0];
const listEl = (document.getElementsByClassName('app__list'))[0];

let counter = 1;

function loadData() { //просто берем данные из localStorage
    const savedData = localStorage.getItem('tasks');
    return savedData ? JSON.parse(savedData) : []; //если данных нет, то вернем пустой
}

const data = loadData(); //берем данные из localStorage

data.forEach((item) => { //то что было, но короче
    if (item.id >= counter) {
        counter = item.id + 1;
    }
});

function saveData() { //сохраняет данные в localStorage
    localStorage.setItem('tasks', JSON.stringify(data));
}

function createTask(objectData) { //и так знаю
    const root = document.createElement('div');
    root.classList.add('app__list-item');

    if (objectData.isDone) {
        root.classList.add('app__list-item_done');
    }

    const input = document.createElement('input');
    input.classList.add('app__list-checkbox');
    input.type = 'checkbox';

    if (objectData.isDone) {
        input.checked = true;
    }

    const txt = document.createElement('p');
    txt.classList.add('app__list-item-txt');
    txt.innerText = objectData.text;

    const btn = document.createElement('button');
    btn.classList.add('app__list-btn');

    const img = document.createElement('img');
    img.src = '/images/vector.svg';
    img.alt = 'trash';

    btn.appendChild(img);

    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        deleteTask(objectData.id);
    });

    root.addEventListener('click', () => toggleTaskState(objectData.id)); 
    root.appendChild(input); //вкладыши
    root.appendChild(txt);
    root.appendChild(btn);

    return root;
}

function deleteTask(id) {
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1); //теперь удаляем так, удаляет 1 элемент, начиная с index (то есть его самого)
        saveData();
        render();
    }
}

function toggleTaskState(id) { //вып/невып
    const task = data.find(item => item.id === id); //ищем
    if (task) {
        task.isDone = !task.isDone; //! - это не, по сути переключатель
        saveData();
        render();
    }
}

btnEl.addEventListener('click', () => { //создаем задачу
    const textValue = inputEl.value;
    data.push({
        id: counter++,
        text: textValue,
        isDone: false
    });
    saveData();
    render();
    
    inputEl.value = '';
});

function render() {
    listEl.innerHTML = ''; //для очистки (теперь точно запомню)
    for (let item of data) { //перебираем задачи
        const tmpEl = createTask(item);
        listEl.appendChild(tmpEl); //добавляеи задачу
    } 
}

render();
