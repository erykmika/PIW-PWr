"use strict"

// Bind DOM elements to consts
const valueInput = document.getElementById("valueInput");
const taskList = document.getElementById("taskList");
const modal = document.getElementById("modal");
const templateTask = document.getElementById("template");

// Prompt before removing a task
const REMOVE_PROMPT = "Czy na pewno chcesz usunąć zadanie o treści: ";

// Removed list element that can be restored (undo-ed)
let removedElement = null;
// List element currently being removed
let currentlyRemoved = null;

// Function for marking task as undone/done
const doneToggleFunc = (event) => {
    const targetClass = event.target.className;
    let classes = null;
    let dateField = null;
    if (targetClass === "cross-btn") {
        return;
    }
    if (!targetClass.startsWith("task") && targetClass !== "cross-btn") {
        classes = event.target.closest("li").classList;
        dateField = event.target.closest("li").lastElementChild.firstElementChild;
    } else {
        classes = event.target.classList;
        dateField = event.target.lastElementChild.firstElementChild;
    }
    if (classes.contains("task-undone")) {
        classes.replace("task-undone", "task-done");
        dateField.innerHTML = getTimeNow();
    } else {
        classes.replace("task-done", "task-undone");
        dateField.innerHTML = "";
    }
};

// Get current time as a nicely formatted string
const getTimeNow = () => {
    const curDate = new Date();
    const h = curDate.getHours().toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false });
    const m = curDate.getMinutes().toLocaleString('pl-PL', { minimumIntegerDigits: 2, useGrouping: false });;
    const day = curDate.getDate();
    let month = String(curDate.getMonth());
    if (month.length === 1) {
        month = "0" + month;
    }
    const year = curDate.getFullYear();
    const timeNow = `${h}:${m} ${day}.${month}.${year}`;
    return timeNow;
};

// Handle removal of a task
const handleRemoval = (event) => {
    currentlyRemoved = event.target.closest("li");
    removedElement = currentlyRemoved;
    document.getElementById("remove-prompt").innerHTML = REMOVE_PROMPT + currentlyRemoved.firstElementChild.innerHTML;
};

// Create the list element <li>
const buildListElement = (text) => {
    let element = templateTask.cloneNode(true);
    element.classList.remove("hidden");
    element.addEventListener("click", doneToggleFunc);
    element.firstElementChild.innerHTML = text;
    const box = element.lastElementChild;
    const cross = box.lastElementChild;
    box.firstElementChild.innerHTML = "";
    cross.addEventListener("click", handleRemoval);
    cross.addEventListener("click", () => {
        modal.showModal();
        modal.classList.replace("dialog-hidden", "dialog-shown")
    });
    return element;
};

// Handle adding a list element
const handleAdd = () => {
    const text = valueInput.value;
    if (text.length === 0) {
        return;
    }
    const item = buildListElement(text);
    taskList.appendChild(item);
    // Clear input after adding
    valueInput.value = "";
};

// Handle undoing removal
const handleUndo = () => {
    if (removedElement !== null) {
        taskList.appendChild(removedElement);
        removedElement = null;
    }
};

// Close the modal dialog
const closeDialog = () => {
    modal.close();
    modal.classList.replace("dialog-shown", "dialog-hidden")
};

// Confirm removal of a task
const confirmRemoval = () => {
    currentlyRemoved.remove();
    currentlyRemoved = null;
    closeDialog();
}


/* Add appropriate event listeners to respective buttons  */
document.getElementById("addBtn").addEventListener("click", handleAdd);

document.getElementById("undoBtn").addEventListener("click", handleUndo);

document.getElementById("cancel").addEventListener("click", closeDialog);

document.getElementById("yes").addEventListener("click", confirmRemoval);
