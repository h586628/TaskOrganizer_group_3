export default class extends HTMLElement {

	shadow;
	css = "js/components/taskbox/taskbox.css";
	allstatuses;
	taskbox;
	newtaskCallbackList = new Map();
	newTaskCallbackId = 0;
	



	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: 'closed' });
		this.createLink();
		this.taskbox = this.createModal();
		this.taskbox.querySelector("span").addEventListener("click", this.close.bind(this));
		//this.taskbox.querySelector("button").addEventListener("click", this..bind(this));

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
				<select id="status" >
					<option value="waiting">WAITING</option>
					<option value="active">ACTIVE</option>
					<option value="done">DONE</option>
				</select><br><br>
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




}
