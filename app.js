const input = document.getElementById('task-input');
const button = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const searchInput = document.getElementById('search');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = '') {
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(filter.toLowerCase())
  );

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');

    // checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    // teks tugas
    const span = document.createElement('span');
    span.textContent = task.text;

    // tanggal waktu tugas
    const dateSpan = document.createElement('small');
    dateSpan.textContent = task.date || '';
    dateSpan.style.fontSize = '10px';
    dateSpan.style.color = 'gray';
    dateSpan.style.display = 'block';

    if (task.done) {
      span.style.textDecoration = 'line-through';
      span.style.color = 'gray';
    }

    checkbox.addEventListener('change', function () {
      tasks[index].done = checkbox.checked;
      saveTasks();
      renderTasks(filter);
    });
    // ini tombol edit
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', function () {
      editTask(index);
    });
    // ini tombol hapus
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Hapus';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks(filter);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addTask() {
  const value = input.value.trim();
  if (value) {
    const dateNow = new Date().toLocaleString(); // contoh: "20/10/2025 10:45"
    tasks.push({ text: value, done: false, date: dateNow });
    saveTasks();
    renderTasks(searchInput.value);
    input.value = '';
  }
}

function editTask(index) {
  const newText = prompt("Edit tugas:", tasks[index].text);
  if (newText !== null) {
    const trimmed = newText.trim();
    if (trimmed !== "") {
      tasks[index].text = trimmed;
      saveTasks();
      renderTasks(searchInput.value);
    } else {
      alert("Tugas tidak boleh kosong!");
    }
  }
}

button.addEventListener('click', addTask);

input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

searchInput.addEventListener('input', function () {
  renderTasks(searchInput.value);
});

renderTasks();
