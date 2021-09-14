import TaskList from './components/tasklist/main.js';
import TaskBox from './components/taskbox/main.js';



const controller = {
	run() {
		customElements.define('task-list', TaskList);
		customElements.define('task-box', TaskBox);


		const tasklist = document.querySelector("task-list");
		tasklist.enableaddtask();
		tasklist.addtaskCallback(
			() => { console.log("Click event on 'New task button'") }
		);

		const taskbox = document.querySelector("task-box");

		taskbox.allstatuses = ["WATING", "ACTIVE", "DONE"];
		taskbox.show();


		const task = {
			"id": 5,
			"title": "Do DAT152 home work",
			"status": "ACTIVE"
		};

		tasklist.showTask(task);
	},



}
controller.run(); 