export default class extends HTMLElement {
	
	#shadow;
	constructor() {
		super();

		this.#shadow = this.attachShadow({ mode: 'closed' });

		this.createHTML();

	}

	createHTML() {
		this.#shadow.innerHTML = `
		<div id="defaultMessage"><p>Waiting for server data</p></div>
		<div id="newTask"><button type="button" disabled>New task</button></div>
		`;
	}

	enableaddtask() { 
		this.#shadow.querySelector('button').disabled = false;
	}

	addtaskCallback() { }

	changestatusCallback() { }

	deletetaskCallback() { }

	noTask() { }

	showTask() { }

	updateTask() { }

	removeTask() { }
}

