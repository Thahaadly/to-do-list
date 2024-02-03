function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("tidak boleh kosong");
        return;
    }

    var li = document.createElement("li");
    li.textContent = taskInput.value;

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        li.classList.toggle('completed');
        saveTask();
    };

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        saveTask();
    };
    
    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    
    taskList.appendChild(li);
    taskInput.value = '';

    saveTask();
}

function clearAllTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ''; // Menghapus semua elemen pada to-do list
    saveTask(); // Simpan perubahan setelah menghapus
}

function saveTask() {
    var tasks = document.getElementById("taskList").innerHTML;
    localStorage.setItem("tasks", tasks);
}

function loadTask() {
    var tasks = localStorage.getItem("tasks");
    if (tasks) {
        document.getElementById("taskList").innerHTML = tasks;
        
        // Tambahkan tombol hapus ke to-do list yang sudah ada
        var existingTasks = document.querySelectorAll("#taskList li");
        existingTasks.forEach(function(task) {
            if (!task.querySelector('button')) {
                var deleteButton = document.createElement('button');
                deleteButton.textContent = 'Hapus';
                deleteButton.onclick = function() {
                    taskList.removeChild(task);
                    saveTask();
                };
                task.appendChild(deleteButton);
            }
        });
    }
}

window.onload = loadTask;
