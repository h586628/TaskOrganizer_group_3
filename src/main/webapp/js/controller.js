import TaskList from './components/tasklist/main.js';
import TaskBox from './components/taskbox/main.js';



const controller = {
	run() {
		customElements.define('task-list', TaskList);
		customElements.define('task-box', TaskBox);


		this.tasklist = document.querySelector("task-list");
		this.taskbox = document.querySelector("task-box");
		
		
		this.tasklist.enableaddtask();


		this.tasklist.addtaskCallback(this.taskbox.show.bind(this.taskbox));
		//this.taskbox.newtaskCallback(this.newTask.bind(this));
		//this.tasklist.changestatusCallback(this.changeStatus.bind(this));
        //this.tasklist.deletetaskCallback(this.deleteTask.bind(this));
        

		this.taskbox.allstatuses = ["WAITING", "ACTIVE", "DONE"];
		this.tasklist.allstatuses = ["WAITING", "ACTIVE", "DONE"];



		const task = {
			"id": 5,
			"title": "Do DAT152 home work",
			"status": "ACTIVE"
		};

		const task2 = {
			"id": 1,
			"title": "Grine",
			"status": "WAITING"
		};

		const task3 = {
			"id": 2,
			"title": "Gå hjem og legge seg",
			"status": "DONE"
		};

		this.tasklist.showTask(task);
		this.tasklist.showTask(task2);
		this.tasklist.showTask(task3);
	},
	
	//newTask(){},
	//changeStatus(){},
	//deleteTask(){},


}
controller.run(); 