export default class extends HTMLElement {

	shadow;
	message;
	taskList;

	newCallbackList = new Map();
	newCallbackId = 0;

	changeStatusCallbackList = new Map();
	changeStatusCallbackId = 0;

	deleteStatusCallbackList = new Map();
	deleteStatusCallbackId = 0;






	constructor() {
		super();

		/** @public {Array} */ this.allstatuses = null
		this.shadow = this.attachShadow({ mode: 'closed' });
		this.createContent();
		this.message = this.shadow.getElementById('message');
		this.taskList = this.shadow.getElementById('taskList');
		
		this.shadow.querySelector('button').addEventListener("click", this.runNewTask.bind(this));

	}

	createContent() {
		this.shadow.innerHTML = `
		<div id="message"><p>Waiting for server data</p></div>
		<div id="newTask"><button type="button" disabled>New task</button></div>
		<div id="taskList"><p>blabla</p></div>
		`;
	}

	createTasklistTable() {
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
		this.newCallbackList.set(this.newCallbackId, callback);
		this.newCallbackId++;
	}

	changestatusCallback(callback) {
		this.changeStatusCallbackList.set(this.changeStatusCallbackId, callback);
		this.changeStatusCallbackId++;
	}

	deletetaskCallback(callback) {
		this.deleteStatusCallbackList.set(this.deleteStatusCallbackId, callback);
		this.deleteStatusCallbackId++;
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
		
		this.allstatuses.forEach((status, i) => {
		
			const statusOption = document.createElement("option"); 
			statusOption.value = i+1; 
			statusOption.textContent = status; 
			dropdownSelect.add(statusOption); 
			
			if(task.status == status) statusOption.disabled = true; 
			else statusOption.disabled = false; 
		});
		
		dropdownSelect.selectedIndex = 0; 
		


		this.taskList.querySelector('tbody').prepend(row);
	}

	updateTask(task) {

		const row = this.taskList.querySelector(`tr[taskId="${task.id}"]`);

		if (!row) return;
		row.cells[1].textContent = task.status;

		const dropdownElement = this.row.querySelector('select');

		Array.from(dropdownElement.options).forEach((optionElement) => {
			if (optionElement.value == status.status) optionElement.disabled = true;
			else optionElement.disabled = false;
		});

		dropdownElement.selectedIndex = 0;

	}

	removeTask(task) {
		const row = this.taskList.querySelector(`tr[taskId="${task.id}"]`);
		row.remove();
		if (this.taskList.querySelectorAll('table').length == 0) this.noTask();

	}
	
	runNewTask() {
		this.newCallbackList.forEach(callback => {callback()}); 
		
	}

}

