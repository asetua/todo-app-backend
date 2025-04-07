document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-title');
  
    // Fetch todos from the backend
    function fetchTodos() {
      fetch('https://todo-app-backend-yo9z.onrender.com/api/todos')
        .then(response => response.json())
        .then(data => {
          todoList.innerHTML = ''; // Clear the list
          data.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
              <span>${todo.title}</span>
              <button onclick="deleteTodo('${todo._id}')">Delete</button>
            `;
            todoList.appendChild(li);
          });
        })
        .catch(error => console.error('Error fetching todos:', error));
    }
  
    // Add a new todo to the backend
    function addTodo() {
      const title = todoInput.value;
      if (title.trim()) {
        fetch('https://todo-app-backend-yo9z.onrender.com/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, completed: false }),
        })
          .then(response => response.json())
          .then(() => {
            fetchTodos(); // Refresh the todo list
            todoInput.value = ''; // Clear the input field
          })
          .catch(error => console.error('Error adding todo:', error));
      }
    }
  
    // Delete a todo
    function deleteTodo(id) {
      fetch(`https://todo-app-backend-yo9z.onrender.com/api/todos/${id}`, {
        method: 'DELETE',
      })
        .then(() => fetchTodos()) // Refresh the todo list
        .catch(error => console.error('Error deleting todo:', error));
    }
  
    // Event listeners
    addTodoButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  
    // Fetch the initial list of todos
    fetchTodos();
  });
  