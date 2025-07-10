const API_URL = '/api/todos';
let currentFilter = 'all';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  displayTasks(tasks);
}

function displayTasks(tasks) {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id}, this.checked)">
        <span>${task.title}</span>
      </label>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    list.appendChild(li);
  });

  updateFilterUI();
}

function updateFilterUI() {
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`filter-${currentFilter}`).classList.add('active');
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  input.value = '';
  fetchTasks();
}

async function toggleTask(id, checked) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: checked })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

async function clearCompletedTasks() {
  await fetch(`${API_URL}/completed`, { method: 'DELETE' });
  fetchTasks();
}

async function clearAllTasks() {
  await fetch(`${API_URL}/all`, { method: 'DELETE' });
  fetchTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  fetchTasks();
}

window.onload = fetchTasks;
