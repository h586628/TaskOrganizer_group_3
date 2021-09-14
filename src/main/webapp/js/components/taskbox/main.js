export default class extends HTMLElement {

	shadow;
	css = "js/components/taskbox/taskbox.css";
	taskbox;
	newtaskCallbackList = new Map();
	newTaskCallbackId = 0;




	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'closed' });
		this.createLink();
		this.taskbox = this.createModal();
		this.taskbox.querySelector("span").addEventListener("click", this.close.bind(this));
		this.shadow.querySelector("button").addEventListener("click", this.newTask.bind(this));

	}


	createModal() {

		const modal = document.createElement('div');
		modal.classList.add("hidden");
		//modal.classList.add("modal")
		//modal.className += "modal";

		const content = `
		
  			<div class="modal-content">
   				<span class="close">&times;</span>
				<label for="taskTitle">Title: </label>
   				<input id="taskTitle" type="text" placeholder="Title"></input><br><br>
				<label for="status">Status: </label>
				<select id="status"></select><br><br>
				<button type="button">Add task</button>
			</div>
		`;

		modal.insertAdjacentHTML('beforeend', content);
		this.shadow.appendChild(modal);

		return modal;


	}

	show() {

		this.taskbox.classList.remove("hidden");

	}

	/**
	 * @param {Array<Object>} statuses
	 */
	set allstatuses(statuses) {
		const statusDropdown = this.taskbox.querySelector("select");
		statuses.forEach((status, index) => {
			const statusOption = document.createElement("option");
			statusOption.value = index;
			statusOption.textContent = status;
			statusDropdown.add(statusOption);

		});
	}


	newtaskCallback(callback) {

		this.newtaskCallbackList.set(this.newTaskCallbackId, callback);
		this.newTaskCallbackId++;

	}


	close() {

		this.taskbox.classList.add("hidden");

	}





	createLink() {

		const link = document.createElement('link');

		link.rel = 'stylesheet';

		link.type = 'text/css';



		link.href = this.css;

		// Append link element to HTML head
		this.shadow.appendChild(link);
	}

	newTask() {
		this.newtaskCallbackList.forEach(callback => {
			callback(this.task)
		});


	}





}
