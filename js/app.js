function initDOM() {
    let listTask = [
        {
            id: 0,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            date: '2021-01-03T10:20:04.400Z',
            completed: false
        },
        {
            id: 1,
            text: 'Create main page of todolistfor frontend test task',
            date: '2021-01-03T10:20:04.400Z',
            completed: true
        },
        {
            id: 2,
            text: 'Create main page of todolistfor frontend test task',
            date: '2021-01-03T10:20:04.400Z',
            completed: true
        },
        {
            id: 3,
            text: 'Create main page of todolistfor frontend test task',
            date: '2021-01-03T10:20:04.400Z',
            completed: true
        },
        {
            id: 4,
            text: 'Create main page of todolistfor frontend test task',
            date: '2021-01-03T10:20:04.400Z',
            completed: true
        },
        {
            id: 5,
            text: 'Create main page of todolistfor frontend test task',
            date: '2021-01-03T10:20:04.400Z',
            completed: true
        }
    ]
    let template = `
            <div class="list-block__task-text">
                <input type="checkbox" class="custom-checkbox" id="checkbox-@@id" @@checked>
                <label class="list-block__label" for="checkbox-@@id"></label>
                <span class="list-block__date">@@date</span>
                <input placeholder="Please enter task description" type="text" class="list-block__text list-block__text--hidden list-block__input" value="">
                <p class="list-block__text list-block__p-text">@@text</p>
            </div>
            <div class="list-block__button">
                <button class="button-edit" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V15"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 15H12L20.5 6.49997C20.8978 6.10214 21.1213 5.56258 21.1213 4.99997C21.1213 4.43736 20.8978 3.89779 20.5 3.49997C20.1022 3.10214 19.5626 2.87865 19 2.87865C18.4374 2.87865 17.8978 3.10214 17.5 3.49997L9 12V15Z"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16 5L19 8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="button-save button--hidden" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.99998 12L9.99998 17L20 7.00001" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="button-delete" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7.00006H20" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 10.9999V16.9999" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 10.9999V16.9999" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5 7.00006L6 19.0001C6 19.5305 6.21071 20.0392 6.58579 20.4143C6.96086 20.7893 7.46957 21.0001 8 21.0001H16C16.5304 21.0001 17.0391 20.7893 17.4142 20.4143C17.7893 20.0392 18 19.5305 18 19.0001L19 7.00006"
                              stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>`
    const listItemClass = 'list-block__container'
    const hiddenClass = 'list-block__container--hidden'
    const buttonAdd = document.querySelector('.button-add-new')
    const newText = document.querySelector('.list-block__input-create')
    const newContainer = document.querySelector('.list-block__container--new')
    const listBlock = document.querySelector('.list-block--current')
    const completeList = document.querySelector('.list-block--completed')
    const buttonAddNew = document.querySelectorAll('.button-add-new-list')

    //function for adding task to DOM and updating handlers of events (onclick, onchange)
    function addTaskToDom({id, text, completed, date}, parent) {
        const newList = parent.appendChild(document.createElement('li'))
        newList.classList.add(listItemClass)
        newList.id = id
        newList.innerHTML = template
            .replace('@@text', text)
            .replace('@@date', new Date(date).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }))
            .replaceAll('@@id', id)
            .replace('@@checked', completed ? 'checked' : '')

        saveTask()
        checkedList()
        deleteTask()
        editTask()
        showInfoNoTask()
    }

    //function for setting onclick methods of editing task
    function editTask() {
        const buttonEdit = document.querySelectorAll('.button-edit')
        buttonEdit.forEach(button => {
            button.onclick = function (event) {
                event.path.forEach(el => {
                    if (el.classList?.contains(listItemClass)) {
                        const input = el.querySelector('.list-block__input')
                        const p = el.querySelector('.list-block__p-text')
                        const imgEdit = el.querySelector('.button-edit')
                        const imgSave = el.querySelector('.button-save')
                        imgSave.classList.remove('button--hidden')
                        imgEdit.classList.add('button--hidden')
                        input.value = p.textContent
                        p.classList.add('list-block__text--hidden')
                        input.classList.remove('list-block__text--hidden')
                        input.focus()
                    }
                })
            }
        })
    }

    //function for setting onclick methods of saving task
    function saveTask() {
        const buttonSave = document.querySelectorAll('.button-save')
        buttonSave.forEach(button => {
            button.onclick = function (event) {
                event.path.forEach(el => {
                    if (el.classList?.contains(listItemClass)) {
                        const input = el.querySelector('.list-block__input')
                        const p = el.querySelector('.list-block__p-text')
                        const imgEdit = el.querySelector('.button-edit')
                        const imgSave = el.querySelector('.button-save')

                        if (!input.value || !input.value.trim()) return alert('Please, input your text')

                        let id = +el.id
                        listTask = listTask.map(task => {
                            if (task.id === id) {
                                task.text = input.value.trim()
                            }
                            return task
                        })
                        imgEdit.classList.remove('button--hidden')
                        imgSave.classList.add('button--hidden')
                        p.textContent = input.value.trim()
                        input.classList.add('list-block__text--hidden')
                        p.classList.remove('list-block__text--hidden')
                        localStorage.setItem('listTask', JSON.stringify(listTask))
                    }
                })
            }
        })
    }

    //function for setting onchange methods of checking task
    function checkedList() {
        const checkLabel = document.querySelectorAll('.custom-checkbox')
        checkLabel.forEach(label => {
            label.onchange = function (event) {
                event.path.forEach(el => {
                    if (el.classList?.contains(listItemClass)) {
                        let id = +el.id
                        listTask = listTask.map(task => {
                            if (task.id === id) {
                                task.completed = event.target.checked
                                el.remove()
                                addTaskToDom(task, task.completed ? completeList : listBlock)
                            }
                            return task
                        })
                        setTaskValue()
                        localStorage.setItem('listTask', JSON.stringify(listTask))
                    }
                })
            }
        })
    }

    //function for setting onclick methods of deleting task
    function deleteTask() {
        const buttonDelete = document.querySelectorAll('.button-delete')
        buttonDelete.forEach(button => {
            button.onclick = function (event) {
                event.path.forEach(el => {
                    if (el.classList?.contains(listItemClass)) {
                        let id = +el.id
                        listTask = listTask.filter(task => {
                            if (task.id === id) {
                                el.remove()
                                return false
                            }
                            return true
                        })
                        showInfoNoTask()
                    }
                })
                setTaskValue()
                localStorage.setItem('listTask', JSON.stringify(listTask))
            }
        })
    }

    //function for showing info about the absence of tasks
    function showInfoNoTask(hidden = false) {
        const noTaskBlock = document.querySelector('.list-block__no-task')
        if (!listTask.length && !hidden && newContainer.classList.contains(hiddenClass)) {
            noTaskBlock.classList.remove('list-block__no-task--hidden')
        } else {
            noTaskBlock.classList.add('list-block__no-task--hidden')
        }
    }

    //function for updating indicators
    function setTaskValue() {
        const scopeText = document.getElementById('scope-value')
        const activeText = document.getElementById('active-value')
        const successfulText = document.getElementById('successful-value')

        scopeText.innerText = `${listTask.length}`
        let arrActive = []
        let arrCompleted = []
        listTask.map(el => {
            if (!el.completed) {
                arrActive.push(el)
            } else if (el.completed) {
                arrCompleted.push(el)
            } else return listTask
        })
        activeText.innerText = `${arrActive.length}`
        successfulText.innerText = `${arrCompleted.length}`
    }

    //function for clearing and hiding field of adding new task
    function clearNew() {
        const buttonClear = document.querySelector('.button-clear-new')
        buttonClear.onclick = function () {
            newContainer.classList.add(hiddenClass)
            newText.value = ''
            showInfoNoTask()
        }
    }

    //function for setting onclick methods of adding new task
    function addNewTask() {
        buttonAdd.onclick = function () {
            if (!newText.value || !newText.value.trim()) return alert('Please, input your text')
            newContainer.classList.add(hiddenClass)
            let id = listTask.length ? listTask[listTask.length - 1].id + 1 : 0
            let date = new Date().toJSON()
            const task = {
                id,
                text: newText.value.trim(),
                date,
                completed: false
            }
            listTask.push(task)
            addTaskToDom(task, listBlock)
            newText.value = ''
            setTaskValue()
            localStorage.setItem('listTask', JSON.stringify(listTask))
        }
    }

    //function for setting onclick methods for opening field of adding new task
    function openNewField() {
        buttonAddNew.forEach(button => {
            button.onclick = function () {
                if (newContainer.classList.contains(hiddenClass)) {
                    newContainer.querySelector('.current-date')
                        .innerText = new Date().toLocaleString('en-GB', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })
                    newContainer.classList.remove(hiddenClass)
                    showInfoNoTask(true)
                }
                newText.focus()
            }
        })
    }

    //condition for getting tasks from local storage
    if (localStorage.getItem('listTask')) {
        listTask = JSON.parse(localStorage.getItem('listTask'))
    }
    //condition for setting default tasks (or current tasks) from array listTask to local storage
    if (listTask.length) {
        localStorage.setItem('listTask', JSON.stringify(listTask))
        listTask.forEach(el => addTaskToDom(el, el.completed ? completeList : listBlock))
    }

    openNewField()
    addNewTask()
    editTask()
    saveTask()
    checkedList()
    deleteTask()
    setTaskValue()
    clearNew()
}

document.addEventListener("DOMContentLoaded", initDOM);
