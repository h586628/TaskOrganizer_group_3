import TaskList from './components/tasklist/main.js';


const main = {
	run() {
		customElements.define('task-list', TaskList);

		const tasklist = document.querySelector("task-list");
		tasklist.enableaddtask();
		tasklist.addtaskCallback(
			() => { console.log("Click event on 'New task button'") }
		);
	}
}
main.run(); 