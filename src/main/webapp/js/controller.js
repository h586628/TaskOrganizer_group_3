import TaskList from './components/tasklist/main.js';


const controller = {
	run() {
		customElements.define('task-list', TaskList);

		const tasklist = document.querySelector("task-list");
		tasklist.enableaddtask();
		tasklist.addtaskCallback(
			() => { console.log("Click event on 'New task button'") }
		);


		const task = {
			"id": 5,
			"title": "Do DAT152 home work",
			"status": "ACTIVE"
		};
		
		tasklist.showTask(task);
	},


	//	async addTask(task){

	//	},


}
controller.run(); 