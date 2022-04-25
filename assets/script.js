//$(document).ready(function() {

    // <!-- Add Task -->
    var taskIdCounter = 0;
    var formEl = document.querySelector("#task-form");
    var tasksToDoEl = document.querySelector("#tasks-to-do");
    var tasksInProgressEl = document.querySelector("#tasks-in-progress");
    var tasksCompletedEl = document.querySelector("#tasks-completed");
    var pageContentEl = document.querySelector("#page-content");

    var tasks = [];

    var taskFormHandler = function (event) {
        event.preventDefault();
        var taskNameInput = document.querySelector("input[name='task-name']").value;
        var taskDescInput = document.querySelector("input[name='task-desc']").value;
        var taskDateInput = document.querySelector("input[name='task-date']").value;

        // check if input values are empty strings
        if (taskNameInput === "" || taskDescInput === "" || !taskDateInput === "") {
        alert("You need to fill out the task form!");
        return false;
        }

        document.querySelector("input[name='task-name']").value = "";
        document.querySelector("input[name='task-desc']").value = "";
        document.querySelector("input[name='task-date']").value = "";

        var isEdit = formEl.hasAttribute("data-task-id");
        if (isEdit) {
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(taskNameInput, taskDescInput, taskDateInput, taskId);
          } else {

        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            desc: taskDescInput,
            date: taskDateInput,
            status: "to do",
          };
        createTaskEl(taskDataObj);
        }
     };

 var createTaskEl = function (taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = 
      "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-desc'>" + taskDataObj.desc + "</span></br><span class='date'>" + taskDataObj.date + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    
      switch (taskDataObj.status) {
      case "to do":
        taskActionsEl.querySelector("select[name='tasks-to-do']")//.selectedIndex = 0;
        tasksToDoEl.append(listItemEl);
        break;
      case "in progress":
        taskActionsEl.querySelector("select[name='tasks-in-progress']")//.selectedIndex = 1;
        tasksInProgressEl.append(listItemEl);
        break;
      case "completed":
        taskActionsEl.querySelector("select[name='tasks-completed']")//.selectedIndex = 2;
        tasksCompletedEl.append(listItemEl);
        break;
      default:
        console.log("Something went wrong!");
    } 
  
    //save task as an object with name, type, status, and id properties then push it into tasks array
    taskDataObj.id = taskIdCounter;
  
    tasks.push(taskDataObj);
  
    //saveTasks();

    taskIdCounter++;
 };


    var createTaskActions = function(taskId) {
        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";


        // create edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);
        actionContainerEl.appendChild(editButtonEl);

        // create delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className = "btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);
        actionContainerEl.appendChild(deleteButtonEl);

        var statusSelectEl = document.createElement("select");
        statusSelectEl.className = "select-status";
        statusSelectEl.setAttribute("name", "status-change");
        statusSelectEl.setAttribute("data-task-id", taskId);
        actionContainerEl.appendChild(statusSelectEl);

        var statusChoices = ["To Do", "In Progress", "Completed"];
        
        for (var i = 0; i < statusChoices.length; i++) {
            // create option element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.textContent = statusChoices[i];
            statusOptionEl.setAttribute("value", statusChoices[i]);
          
            // append to select
            statusSelectEl.appendChild(statusOptionEl);
          }

        return actionContainerEl;
         
    };

    var completeEditTask = function(taskName, taskType, taskId) {
        // find task list item with taskId value
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
      
        // set new values
        taskSelected.querySelector("h3.task-name").textContent = taskName;
        taskSelected.querySelector("span.task-type").textContent = taskType;
      
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].desc = taskDesc;
            tasks[i].date = taskDate;
          }
        }

        // remove data attribute from form
        formEl.removeAttribute("data-task-id");
        // update formEl button to go back to saying "Add Task" instead of "Edit Task"
        formEl.querySelector("#save-task").textContent = "Add Task";
        //saveTasks();
      };

      var taskButtonHandler = function(event) {
        // get target element from event
        var targetEl = event.target;
      
        if (targetEl.matches(".edit-btn")) {
          console.log("edit", targetEl);
          var taskId = targetEl.getAttribute("data-task-id");
          editTask(taskId);
        } else if (targetEl.matches(".delete-btn")) {
          console.log("delete", targetEl);
          var taskId = targetEl.getAttribute("data-task-id");
          deleteTask(taskId);
        }
      };

      var taskStatusChangeHandler = function(event) {
        console.log(event.target.value);
      
        // find task list item based on event.target's data-task-id attribute
        var taskId = event.target.getAttribute("data-task-id");
      
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
      
        // convert value to lower case
        var statusValue = event.target.value.toLowerCase();
      
        if (statusValue === "to do") {
          tasksToDoEl.appendChild(taskSelected);
        } else if (statusValue === "in progress") {
          tasksInProgressEl.appendChild(taskSelected);
        } else if (statusValue === "completed") {
          tasksCompletedEl.appendChild(taskSelected);
        }

        // update task's in tasks array
        for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
        tasks[i].status = statusValue;
  }
}

          // save to localStorage
          //saveTasks();

      };

      var editTask = function(taskId) {
        console.log(taskId);
      
        // get task list item element
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
      
        // get content from task name and type
        var taskName = taskSelected.querySelector("h3.task-name").textContent;
        console.log(taskName);
      
        var taskDesc = taskSelected.querySelector("span.task-desc").textContent;
        console.log(taskDesc);

        var taskDate = taskSelected.querySelector("span.task-date").textContent;
        console.log(taskDate);
      
        // write values of taskname and taskType to form to be edited
        document.querySelector("input[name='task-name']").value = taskName;
        document.querySelector("input[name='task-desc']").value = taskDesc;
        document.querySelector("select[name='date']").value = taskDate;
      
        // set data attribute to the form with a value of the task's id so it knows which one is being edited
        formEl.setAttribute("data-task-id", taskId);
        // update form's button to reflect editing a task rather than creating a new one
        formEl.querySelector("#save-task").textContent = "Save Task";
      };
      
      var deleteTask = function(taskId) {
        console.log(taskId);
        // find task list element with taskId value and remove it
        var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
        taskSelected.remove();

        var updatedTaskArr = [];

       for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
          updatedTaskArr.push(tasks[i]);
        }
      }

      tasks = updatedTaskArr;
      //saveTasks();
      };

      var loadTasks = function() {

      };

    

      // Create a new task
        formEl.addEventListener("submit", taskFormHandler);

        // for edit and delete buttons
        pageContentEl.addEventListener("click", taskButtonHandler);

        // for changing the status
        pageContentEl.addEventListener("change", taskStatusChangeHandler);

        //loadTasks();
