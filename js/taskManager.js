class TaskManager {
    constructor(currentID = 0) {
        this.tasks = [];
        this.currentID = currentID;
    }
    addTask(name, description, category, dueDate, priority) {
        this.currentID++;

        this.tasks.push({
            id: this.currentID,
            name: name,
            description: description,
            category: category,
            dueDate: dueDate,
            priority: priority,
            status: 'to-do'
        });
    }
    //esto es una prueba
    deleteTask(taskId) {
        const newTasks = [];
        for (let task of this.tasks) {
            if (task.id !== taskId) {
                newTasks.push(task);
            }
        }
        this.tasks = newTasks;
    }
    getTaskById(taskId) {
        let foundTask;

        for (let task of this.tasks) {
            if (task.id === taskId) {
                foundTask = task;
            }
        }
        return foundTask;
    }
    save(){
        const tasksJson = JSON.stringify(this.tasks);
        localStorage.setItem("tasks", tasksJson);

        const currentID = String(this.currentID);
        localStorage.setItem("currentID", currentID);
    }
    load(){
        if(localStorage.getItem("tasks")){
            const tasksJson = localStorage.getItem("tasks");
            this.tasks = JSON.parse(tasksJson);
        }
        const currentID = localStorage.getItem("currentID");
        if(currentID){
            this.currentID = Number(currentID);
        }
    }    
}