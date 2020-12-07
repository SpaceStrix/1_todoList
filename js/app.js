const task = [
	{
		_id: 1,
		title: 'Lorem ipsum dolor sit amet consectetur',
		priority: 'Low priority',
		comments: '11 comments',
		time: '3:20 PM',
		comleted: false
	},
	{
		_id: 2,
		title: 'Optio obcaecati facilis architecto',
		priority: 'Low priority',
		comments: '5 comments',
		time: '4:20 PM',
		comleted: true
	},
	{
		_id: 3,
		title: 'Laut obcaecati iure, quas fugiat',
		priority: 'High priority',
		comments: '0 comments',
		time: '1:45 PM',
		comleted: true
	},
	{
		_id: 4,
		title: 'Est, voluptatem laudantium magni molestiae',
		priority: 'Medium priority',
		comments: '3 comments',
		time: '2:50 PM',
		comleted: false
	}
];

(function(taskList) {
	// Контейнер со всеми тасками
	const taskListContainer = document.querySelector('.task-list');
	const emptylist = document.querySelector('.emptylisttask');
	const completeTaskBtn = document.querySelector('.complete-task-btn');
	const allTask = document.querySelector('.all-task-btn');

	// FORM
	const addTaskForm = document.querySelector('.add-task-btn');
	const form = document.forms['setTask'];
	// const submitFormButton = document.querySelector('.submitFormButton');
	// console.log(submitFormButton);
	// FORM elements
	const inputText = form.elements['input-text'];
	const selectPriority = form.elements['select-priority'];

	// EVENTS
	addTaskForm.addEventListener('click', addTaskFormHandler);
	function addTaskFormHandler(e) {
		const visibilityForm = document.querySelector('.form-block');
		visibilityForm.classList.toggle('visibility-form');
	}

	form.addEventListener('submit', submitFormButtonHandler);
	function submitFormButtonHandler(e) {
		e.preventDefault();

		const inputValue = inputText.value;
		const selectValue = selectPriority.value;
		// const status = document.querySelector('.status');

		if (!inputValue.length || !selectValue.length) {
			return alert('Поля пустые');
		}

		const task = createNewTask(inputValue, selectValue);

		const newTaskList = taskTemplate(task);
		taskListContainer.insertAdjacentElement('afterbegin', newTaskList);

		if (taskListContainer.children.length !== 0) {
			emptylist.classList.add('hidden');
		}

		form.reset();
	}
	taskListContainer.addEventListener('click', deleteTaskHandler);
	function deleteTaskHandler({ target }) {
		if (target.classList.contains('delete-btn')) {
			const parent = target.closest('[data-id]');
			const id = parent.dataset.id;

			const confirmed = deleteTask(id);
			deleteTaksFromContainer(confirmed, parent);
		}
	}
	function deleteTask(id) {
		const isConfirm = confirm('Удалить данную задачу?');
		if (!isConfirm) return isConfirm;
		delete newObj[id];
		return isConfirm;
	}
	function deleteTaksFromContainer(confirmed, el) {
		if (!confirmed) return;
		el.remove();
		//
		if (taskListContainer.children.length === 0) {
			emptylist.classList.remove('hidden');
		}
	}
	taskListContainer.addEventListener('click', completeTaskHandler);

	function completeTaskHandler({ target }) {
		if (target.classList.contains('complete-btn')) {
			const parent = target.closest('[data-comleted]');
			parent.classList.add('complete');
			const status = parent.dataset.comleted;
			completeTaksFromContainer(status, parent);
		}
	}
	function completeTaksFromContainer(comleted, parent) {
		if (comleted) {
			parent.classList.add('complete');
		}
	}
	completeTaskBtn.addEventListener('click', completeListTaskHandler);
	function completeListTaskHandler() {
		[ ...taskListContainer.children ].forEach((task) => {
			if (!task.classList.contains('complete')) {
				task.classList.add('hidden');
			}
		});
	}
	allTask.addEventListener('click', allTaskHandler);
	function allTaskHandler() {
		[ ...taskListContainer.children ].forEach((task) => {
			if (!task.classList.contains('complete')) {
				task.classList.remove('hidden');
			}
			// console.log(task.classList.contains('complete'));
		});
	}

	//Превратили массив в объект
	const newObj = taskList.reduce((acc, task) => {
		acc[task._id] = task;
		return acc;
	}, {});

	// Получаем 1 объект
	Object.values(newObj).forEach((task) => {
		const fragment = document.createDocumentFragment();
		let newTask = taskTemplate(task);

		fragment.append(newTask);
		taskListContainer.append(fragment);
	});

	function taskTemplate({ _id, title, priority, comments, time, comleted } = {}) {
		const oneTask = document.createElement('div');
		oneTask.classList.add('one-task');

		if (comleted) {
			oneTask.classList.add('complete');
		}

		oneTask.setAttribute('data-comleted', `${comleted}`);
		oneTask.setAttribute('data-id', `${_id}`);
		oneTask.innerHTML = `
		<div class="row">
		<div class="col-sm-4">
			<span class="task-title">${title}</span>
		</div>
		<!-- /.col-sm-4 -->
		<div class="col-sm-2">
			<div class="priority">
				<div class="status"></div>
				<!-- /.status -->
				<span>${priority}</span>
			</div>
			<!-- /.priority -->
		</div>
		<!-- /.col-sm-2 -->
		<div class="col-sm-2">
			<span>${comments}</span>
		</div>
		<!-- /.col-sm-2 -->
		<div class="col-sm-1">
			<span>${time}</span>
		</div>
		<div class="col-sm-3">
		<button type="button" class="btn btn-light delete-btn">Удалить</button>
		<button type="button" class="btn btn-light complete-btn">Завершить</button>
		</div>
		<!-- /.col-sm-2-->
	</div>
	`;
		return oneTask;
	}
	// создание новой задачи
	function createNewTask(taskTitle, taskPriority) {
		const dateCreateTask = new Date();
		const newTask = {
			_id: `${[ ...taskListContainer.children ].length + 1}`,
			title: `${taskTitle}`,
			priority: `${taskPriority}`,
			comments: `${Math.floor(Math.random() * 10)} comments`,
			time: `${dateCreateTask.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`,
			comleted: false
		};
		newObj[newTask._id] = newTask;
		return { ...newTask };
	}

	// console.log(document.querySelector('.complete-btn'));
	//
})(task);
