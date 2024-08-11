function updateDateTime() {
    const now = new Date();

    // Update date
    const date = now.toDateString();
    document.getElementById('date').textContent = date;

    // Update time (without seconds)
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clock').textContent = timeString;
}

// Update date and time every minute
setInterval(updateDateTime, 60000); // Update every minute

// Initialize date and time immediately
updateDateTime();


document.getElementById('add-list').addEventListener('click', () => {
    // Functionality for adding a list
    window.location.href = 'add_list.html';
});

document.getElementById('weather').addEventListener('click', () => {
    window.location.href = 'weather_app/weather.html';
});

async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = ''; // Clear existing tasks
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="updateTask(${task.id}, this)"
                />
                ${task.name}
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// Function to update task status
async function updateTask(id, checkbox) {
    const completed = checkbox.checked;
    try {
        await fetch(`/api/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed }),
        });
    } catch (error) {
        console.error('Error updating task:', error);
    }
}
