export default class extends HTMLElement {

	shadow;
	message;
	taskList;

	newTaskCallbackList = new Map();
	newTaskCallbackId = 0;

	changeStatusCallbackList = new Map();
	changeStatusCallbackId = 0;

	deleteTaskCallbackList = new Map();
	deleteTaskCallbackId = 0;






	constructor() {
		super();

		/** @public {Array} */ this.allstatuses = null
		this.shadow = this.attachShadow({ mode: 'closed' });
		this.createContent();
		this.message = this.shadow.getElementById('message');
		this.taskList = this.shadow.getElementById('taskList');

		this.shadow.querySelector('button').addEventListener("click", this.runAddTaskCallback.bind(this));

	}

	createContent() {
		this.shadow.innerHTML = `
		<div id="message"><p>Waiting for server data</p></div>
		<div id="newTask"><button type="button" disabled>New task</button></div>
		<div id="taskList"><p>blabla</p></div>
		`;
	}

	createTasklistTable() {
		this.message.innerHTML = "";
		this.taskList.innerHTML = `
		<table>
			<thead>
				<tr>
					<th>Task</th>
					<th>Status</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
		`;
	}

	enableaddtask() {
		this.shadow.querySelector('button').disabled = false;
	}

	addtaskCallback(callback) {
		this.newTaskCallbackList.set(this.newTaskCallbackId, callback);
		this.newTaskCallbackId++;

	}

	runAddTaskCallback() {
		this.newTaskCallbackList.forEach(callback => callback())
	}

	changestatusCallback(callback) {
		this.changeStatusCallbackList.set(this.changeStatusCallbackId, callback);
		this.changeStatusCallbackId++;
	}

	runChangeStatusCallback(event) {
		
		const select = event.target;
		const newStatus = select.value; 
		const id = select.parentNode.parentNode.getAttribute("taskId");
		const taskTitle = select.parentNode.parentNode.children[0].textContent;
		
		if(newStatus == 0) return;
		
		if(window.confirm(`Do you want to change ${taskTitle} to status ${newStatus}?`)){
			this.changeStatusCallbackList.forEach(callback => callback(id, newStatus));
		}else{
			select.selectedIndex = 0; 
		}
		
		
	}

	deletetaskCallback(callback) {
		this.deleteTaskCallbackList.set(this.deleteTaskCallbackId, callback);
		this.deleteTaskCallbackId++;
	}

	runDeleteTaskCallback(event) {
		const button = event.target;
		const id = button.parentNode.parentNode.getAttribute("taskId")
		const taskTitle = button.parentNode.parentNode.children[0].textContent;
		
		if(window.confirm(`Do you want to delete the task ${taskTitle}`)){
			this.deleteTaskCallbackList.forEach(callback => callback(id));
		}else{
			console.log("Task not deleted")
		}
	}

	noTask() {
		this.taskList.innerHTML = "";
		this.message.innerHTML = "<p>No tasks were found.</p>"
	}

	showTask(task) {
		if (this.taskList.querySelectorAll('table').length == 0) this.createTasklistTable();

		const row = document.createElement('tr');
		row.setAttribute("taskId", task.id)

		row.innerHTML = `
			<td>${task.title}</td>
			<td>${task.status}</td>
			<td>
				<select id="status">
					<option value="0">&ltModify&gt</option>
				</select>
			</td>
			<td>
				<button>Remove</button>
			</td>
		`;
		
		const dropdownSelect = row.querySelector("select");
		dropdownSelect.addEventListener("change", this.runChangeStatusCallback.bind(this))

		this.allstatuses.forEach(status => {

			const statusOption = document.createElement("option");
			statusOption.value = status;
			statusOption.textContent = status;
			dropdownSelect.add(statusOption);

			if (task.status == status) statusOption.disabled = true;
			else statusOption.disabled = false;
			
		});

		dropdownSelect.selectedIndex = 0;
		
		const deleteButton = row.querySelector("button");
		deleteButton.addEventListener("click", this.runDeleteTaskCallback.bind(this));



		this.taskList.querySelector('tbody').prepend(row);
	}

	updateTask(task) {

		const row = this.taskList.querySelector(`tr[taskId="${task.id}"]`);

		if (!row) return;
		row.cells[1].textContent = task.status;

		const dropdownElement = row.querySelector('select');

		Array.from(dropdownElement.options).forEach((optionElement) => {
			if (optionElement.value == status.status) optionElement.disabled = true;
			else optionElement.disabled = false;
		});

		dropdownElement.selectedIndex = 0;

	}

	removeTask(id) {
		const row = this.taskList.querySelector(`tr[taskId="${id}"]`);
		row.remove();
		if (this.taskList.querySelectorAll('table').length == 0) this.noTask();

	}




}

