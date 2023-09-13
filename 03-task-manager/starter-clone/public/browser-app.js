const submitDOM = document.querySelector(".submit-btn");
const alertDOM = document.querySelector(".form-alert");
const inputDOM = document.querySelector(".task-input");
const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");

async function getTasks() {
  try {
    loadingDOM.style.visibility = "visible";
    let tasks = await (await fetch("/api/v1/tasks", { method: "GET" })).json();
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    tasks = tasks
      .map((task) => {
        const {name,_id:taskId,completed} = task;
        return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class="fa ${
                  completed && "far fa-check"
                }"></i></span>
                ${name}
            </h5>
                <div class="task-links">
                    <a href="task.html?id=${taskId}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button class="delete-btn" data-id="${taskId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
        </div>
        `;
      })
      .join("");
    tasksDOM.innerHTML = tasks;
  } catch (e) {
    tasksDOM.innerHTML = `<h5>error loading the tasks</h5>`;
  }
  loadingDOM.style.visibility = "hidden";
}
getTasks();

submitDOM.addEventListener("click", async (e) => {
  e.preventDefault();
  let result = await axios.post(
    "/api/v1/tasks",
    { name: inputDOM.value },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(result);
});
