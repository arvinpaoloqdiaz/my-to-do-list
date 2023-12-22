// Input Task component
let currentInput = document.getElementById("input");
currentInput.addEventListener("keypress",(event)=>{
	if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    addToList();
  }
});

// List div containing "tasks" components
let listContainer = document.querySelector(".list");

let addTask = document.getElementById("add-task");
addTask.addEventListener("click", () => addToList());

// Render array from localStorage
function renderItem(input, index, isChecked) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item");
  itemContainer.setAttribute("id", `${index}`);

  const itemCheckbox = document.createElement("input");
  itemCheckbox.setAttribute("type", "checkbox");
  itemCheckbox.setAttribute("id", `item${index}`);
  itemCheckbox.classList.add("check-item");
  itemCheckbox.checked = isChecked;
  itemCheckbox.addEventListener("change", () => {
    updateCheckboxState(index, itemCheckbox.checked);
  });

  const itemName = document.createElement("label");
  itemName.textContent = input;
  itemName.setAttribute("for", `item${index}`);
  itemName.classList.add("to-do-description");

  const itemButtonContainer = document.createElement("div");
  itemButtonContainer.classList.add("switch-buttons");

  const itemButtonUp = document.createElement("button");

  const arrowUp = document.createElement("i");
  arrowUp.classList.add("fa-solid");
  arrowUp.classList.add("fa-arrow-up-long");
  itemButtonUp.addEventListener("click", () => moveItemUp(index, index - 1));

  const itemButtonDown = document.createElement("button");

  const arrowDown = document.createElement("i");
  arrowDown.classList.add("fa-solid");
  arrowDown.classList.add("fa-arrow-down-long");
  itemButtonDown.addEventListener("click", () => moveItemDown(index, index + 1));

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("hidden-buttons");
  deleteButton.addEventListener("click", () => deleteItem(index));

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid");
  deleteIcon.classList.add("fa-trash");

  itemButtonUp.appendChild(arrowUp);
  itemButtonDown.appendChild(arrowDown);

  deleteButton.appendChild(deleteIcon);

  itemButtonContainer.appendChild(itemButtonUp);
  itemButtonContainer.appendChild(itemButtonDown);

  itemContainer.appendChild(itemButtonContainer);
  itemContainer.appendChild(itemCheckbox);
  itemContainer.appendChild(itemName);

  itemContainer.appendChild(deleteButton);

  listContainer.appendChild(itemContainer);
}

function renderBlank() {
  localStorage.removeItem("toDoList");
  const blankList = document.createElement("p");
  blankList.textContent = "You have no Tasks!";
  blankList.setAttribute("id", "no-tasks");
  listContainer.appendChild(blankList);
}

function getArray() {
  const toDoListString = localStorage.getItem("toDoList");
  return toDoListString ? JSON.parse(toDoListString) : [];
}

function renderList() {
  let myToDo = getArray();
  if (myToDo.length === 0) {
    renderBlank();
  } else {
    for (let i = 0; i < myToDo.length; i++) {
      renderItem(myToDo[i].text, i, myToDo[i].checked);
      console.log(myToDo);
    }
  }
}

renderList();

function addToList() {
  let myList = getArray();
  if (myList.length === 0) {
    document.getElementById("no-tasks").remove();
  }
  if (currentInput.value !== "") {
    myList.push({ text: currentInput.value, checked: false });

    // Save to localStorage
    localStorage.setItem("toDoList", JSON.stringify(myList));

    // Render the new item
    renderItem(currentInput.value, myList.length - 1, false);
    currentInput.value = "";
  }
}

function deleteItem(index) {
  let myList = getArray();
  myList.splice(index, 1);

  if (myList.length === 0) {
    renderBlank();
  }

  // Save to localStorage
  localStorage.setItem("toDoList", JSON.stringify(myList));

  // Re-render the list
  reRenderList(listContainer);
}

function reRenderList(list) {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  renderList();
}

function moveItemUp(index, indexBefore) {
  if (Number(indexBefore) >= 0) {
    let myList = getArray();
    [myList[Number(indexBefore)], myList[Number(index)]] = [
      myList[Number(index)],
      myList[Number(indexBefore)],
    ];

    // Save to localStorage
    localStorage.setItem("toDoList", JSON.stringify(myList));

    // Re-render the list
    reRenderList(listContainer);
  }
}

function moveItemDown(index, indexAfter) {
  let myList = getArray();
  if (Number(indexAfter) < myList.length) {
    [myList[Number(index)], myList[Number(indexAfter)]] = [
      myList[Number(indexAfter)],
      myList[Number(index)],
    ];

    // Save to localStorage
    localStorage.setItem("toDoList", JSON.stringify(myList));

    // Re-render the list
    reRenderList(listContainer);
  }
}

function updateCheckboxState(index, isChecked) {
  let myList = getArray();
  myList[index].checked = isChecked;
  localStorage.setItem("toDoList", JSON.stringify(myList));
}
