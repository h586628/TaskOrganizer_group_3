import config from './modules/config.js';
import TaskList from './components/tasklist/main.js';
import TaskBox from './components/taskbox/main.js';



const controller = {
	run() {
		customElements.define('task-list', TaskList);
		customElements.define('task-box', TaskBox);

		this.tasklist = document.querySelector("task-list");
		this.taskbox = document.querySelector("task-box");

		this.tasklist.addtaskCallback(this.taskbox.show.bind(this.taskbox));
		this.taskbox.newtaskCallback(this.newTask.bind(this));
		this.tasklist.changestatusCallback(this.changeStatus.bind(this));
		this.tasklist.deletetaskCallback(this.deleteTask.bind(this));

		this.getAllStatuses();
		this.getTasks()
		this.tasklist.enableaddtask();

	},

	async getAllStatuses() {
		const url = `${config.servicesPath}/allstatuses`

		try {
			const response = await fetch(url, { method: "GET" })

			try {
				const statuses = await response.json();
				if (statuses.responseStatus) {
					this.tasklist.allstatuses = statuses.allstatuses;
					this.taskbox.allstatuses = statuses.allstatuses;
				} else {
					console.log("GET request failed. Could not fetch all statuses.")
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	},

	async getTasks() {
		const url = `${config.servicesPath}/tasklist`
		try {
			const response = await fetch(url, { method: "GET" })
			try {
				const tasks = await response.json();
				if (tasks.responseStatus) {

					if (tasks.tasks.length == 0) this.tasklist.noTasks();
					else tasks.tasks.forEach(task => { this.tasklist.showTask(task) })
				} else {
					console.log("GET request failed. Could not fetch tasks from server.")
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}

	},

	async newTask(task) {
		const url = `${config.servicesPath}/task`

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify(task)
			});
			try {
				const newtask = await response.json();
				if (newtask.responseStatus) {
					this.tasklist.showTask(newtask.task);
					this.tasklist.close();
				} else {
					console.log("POST request failed.")
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	},

	async changeStatus(id, newStatus) {
		const url = `${config.servicesPath}/task/${id}`

		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: { "Content-Type": "application/json; charset=utf-8" },
				body: JSON.stringify({ 'status': newStatus })
			})
			try {
				const updatedTask = await response.json()
				if (updatedTask.responseStatus) {
					this.tasklist.updateTask(updatedTask);

				} else {
					console.log("PUT request failed. Could not update status of task on server.")
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	},

	async deleteTask(id) {
		const url = `${config.servicesPath}/task/${id}`

		try {
			const response = await fetch(url, { method: "DELETE" })
			try {
				const deletedTask = await response.json()

				if (deletedTask.responseStatus) {
					this.tasklist.removeTask(deletedTask.id)
				} else {
					console.log("DELETE request failed. Could not delete task from server.")
				}
			} catch (error) {
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
	},
}
controller.run(); 