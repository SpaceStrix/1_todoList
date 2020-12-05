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

	// FORM
	const addTaskForm = document.querySelector('.add-task-btn');

	addTaskForm.addEventListener('click', addTaskFormHandler);

	function addTaskFormHandler(e) {
		const visibilityForm = document.querySelector('.form-group');
		visibilityForm.classList.toggle('visibility-form');
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

	function taskTemplate({ title, priority, comments, time, comleted } = {}) {
		const oneTask = document.createElement('div');
		oneTask.classList.add('one-task');
		oneTask.setAttribute('data-comleted', `${comleted}`);
		oneTask.innerHTML = `
		<div class="row">
		<div class="col-sm-6">
			<span>${title}</span>
		</div>
		<!-- /.col-sm-6 -->
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
		<div class="col-sm-2">
			<span>${time}</span>
		</div>
		<!-- /.col-sm-2-->
	</div>
	`;
		return oneTask;
	}

	//
})(task);

const date = new Date();

const time = `${date.getHours()}:${date.getMinutes()}`;
