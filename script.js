
    // Task array to store tasks
    let tasks = [];

    // Get form elements
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('task');
    const dateInput = document.getElementById('date');
    const priorityInput = document.getElementById('priority');

    // Get table body
    const taskTable = document.getElementById('task-list');

    // Function to render tasks
    function renderTasks() {
      // Clear existing table rows
      taskTable.innerHTML = '';

      // Sort tasks based on date and priority
      tasks.sort((a, b) => {
        if (a.date === b.date) {
          return a.priority.localeCompare(b.priority);
        }
        return new Date(a.date) - new Date(b.date);
      });

      // Loop through tasks and create table rows
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const row = document.createElement('tr');
        const priorityClass = `priority-${task.priority.toLowerCase()}`;
        row.innerHTML = `
          <td>${task.task}</td>
          <td>${task.date}</td>
          <td class="${priorityClass}">${task.priority}</td>
          <td>
            <button class="btn btn-sm btn-danger delete-btn" data-task="${i}">Done</button>
          </td>
        `;
        taskTable.appendChild(row);
      }
    }

    // Function to handle form submission
    function addTask(event) {
      event.preventDefault();

      // Get form values
      const task = taskInput.value.trim();
      const date = dateInput.value;
      const priority = priorityInput.value;

      // Validate task
      if (task === '') {
        return;
      }

      // Create task object
      const newTask = {
        task: task,
        date: date,
        priority: priority,
        done: false
      };

      // Add task to the array
      tasks.push(newTask);

      // Render tasks
      renderTasks();

      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Task added successfully!',
        showConfirmButton: false,
        timer: 1500
      });

      // Reset form
      form.reset();
    }

    // Function to delete a task
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    // Event listener for form submission
    form.addEventListener('submit', addTask);

    // Event listener for delete button
    taskTable.addEventListener('click', function (event) {
      if (event.target.classList.contains('delete-btn')) {
        const taskIndex = event.target.getAttribute('data-task');
        deleteTask(taskIndex);
      }
    });

    // Event listener for sort by date button
    const sortDateBtn = document.getElementById('sort-date');
    sortDateBtn.addEventListener('click', function () {
      tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      renderTasks();
    });

    // Event listener for sort by priority button
    const sortPriorityBtn = document.getElementById('sort-priority');
    sortPriorityBtn.addEventListener('click', function () {
      tasks.sort((a, b) => a.priority.localeCompare(b.priority));
      renderTasks();
    });

    // Initial rendering of tasks
    renderTasks();
