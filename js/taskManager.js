class TaskManager{
    constructor(currentID = 0){
        this.tasks = [];
        this.currentID = currentID;
    }
    addTask(name, description, category, dueDate, priority){
        this.currentID++;

        this.tasks.push({
        id: this.currentID,
        name: name,
        description: description,
        category: category,
        dueDate: dueDate,
        priority: priority,
        status: 'To Do'
    });
    }
    
}