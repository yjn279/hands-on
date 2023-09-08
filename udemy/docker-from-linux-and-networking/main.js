const formTitleElement = document.getElementById('form-title');
const formButtonElement = document.getElementById('form-button');
const tasksElement = document.getElementById('tasks');

async function getTasks() {
    const response = await fetch('/api/tasks');
    const body = await response.json();
    const tasks = body.tasks;

    while (tasksElement.firstChild) {
        tasksElement.removeChild(tasksElement.firstChild)
    }

    tasks.forEach((task) => {
        const titleElement = document.createElement('td');
        titleElement.innerText = task.title;

        const createdElement = document.createElement('td');
        createdElement.innerHTML = task.created;

        const trElement = document.createElement('tr');
        trElement.appendChild(titleElement);
        trElement.appendChild(createdElement);

        tasksElement.appendChild(trElement);
    })
}

async function createTask() {
    console.log(formTitleElement)
    const title = formTitleElement.value;
    const body = {title: title};
    await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    getTasks();
}

async function main() {
    formButtonElement.addEventListener('click', createTask);
    await getTasks();
}

main()
