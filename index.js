// Input Task component
let currentInput = document.getElementById("input");
// List div containing "tasks" components
let listContainer = document.querySelector(".list");

// Render array from localStorage
function renderItem(input,index){

	const itemContainer = document.createElement("div");
	itemContainer.classList.add("item");
	itemContainer.setAttribute("id",`${index}`);

	// const editButton = document.createElement("button");
	
	// editButton.classList.add("edit");


	// const editIcon = document.createElement("i");
	// editIcon.classList.add("fa-solid");
	// editIcon.classList.add("fa-pen-to-square");


	const itemCheckbox = document.createElement("input");
	itemCheckbox.setAttribute("type","checkbox");
	itemCheckbox.setAttribute("name","list-done");
	itemCheckbox.classList.add("check-item");

	const itemName = document.createElement("p");
	itemName.textContent = input;
	itemName.classList.add("to-do-description");

	const itemButtonContainer = document.createElement("div");
	itemButtonContainer.classList.add("switch-buttons");

	const itemButtonUp = document.createElement("button");

	const arrowUp = document.createElement("i");
	arrowUp.classList.add("fa-solid");
	arrowUp.classList.add("fa-arrow-up-long");
	itemButtonUp.setAttribute("onclick",`moveItemUp(${index},${index - 1})`)

	const itemButtonDown = document.createElement("button");

	const arrowDown = document.createElement("i");
	arrowDown.classList.add("fa-solid");
	arrowDown.classList.add("fa-arrow-down-long");
	itemButtonDown.setAttribute("onclick",`moveItemDown(${index},${index + 1})`)

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("hidden-buttons");
	deleteButton.setAttribute("onclick",`deleteItem(${index})`)

	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fa-solid");
	deleteIcon.classList.add("fa-trash");

	itemButtonUp.appendChild(arrowUp);
	itemButtonDown.appendChild(arrowDown);

	// editButton.appendChild(editIcon);
	deleteButton.appendChild(deleteIcon);

	itemButtonContainer.appendChild(itemButtonUp);
	itemButtonContainer.appendChild(itemButtonDown);

	// itemContainer.appendChild(editButton);
	itemContainer.appendChild(itemButtonContainer);
	itemContainer.appendChild(itemCheckbox);
	itemContainer.appendChild(itemName);
	
	itemContainer.appendChild(deleteButton);

	listContainer.appendChild(itemContainer);


}
function renderBlank(){
	localStorage.removeItem("toDoList");
	const blankList = document.createElement("p");
	blankList.textContent = "You have no Tasks!";
	blankList.setAttribute("id","no-tasks");
	listContainer.appendChild(blankList);
}
function getArray(){
	let myList = JSON.parse(localStorage.getItem("toDoList"));
	if(myList === null){
		return []
	}
	return myList
}
function renderList(){
	let myToDo = getArray();
	if (myToDo.length === 0){
		renderBlank();
	}else {
		let items = myToDo.map((item,index) => {
			renderItem(item,index);
		})
	}
}
renderList()

function addToList(){

	let myList = getArray();
	if (myList.length === 0){
		document.getElementById("no-tasks").remove();
	}
	if (currentInput.value !== ""){
		myList.push(currentInput.value);
		localStorage.setItem("toDoList",JSON.stringify(myList));
		renderItem(currentInput.value,myList.length);
		currentInput.value = "";
		location.reload();
	}
}
function deleteItem(index){
	let myList = getArray();

	myList.splice(index,1);
	
	
	if (myList.length === 0){
		renderBlank();
	}
	localStorage.setItem("toDoList",JSON.stringify(myList));
	reRenderList(listContainer);
}

function reRenderList(list){
	while (list.hasChildNodes()) {
 	 	list.removeChild(list.firstChild);
	}
	renderList()
}

function moveItemUp(index,indexBefore){
	if (Number(indexBefore) >= 0){
		let myList = getArray();
		[myList[Number(indexBefore)],myList[Number(index)]]=[myList[Number(index)],myList[Number(indexBefore)]]
		localStorage.setItem("toDoList",JSON.stringify(myList));
		reRenderList(listContainer);
	}
}

function moveItemDown(index,indexAfter){
	let myList = getArray();
	if (Number(indexAfter) < myList.length){
		[myList[Number(index)],myList[Number(indexAfter)]]=[myList[Number(indexAfter)],myList[Number(index)]]
		localStorage.setItem("toDoList",JSON.stringify(myList));
		reRenderList(listContainer);
	}
}

function editItem(index){

}
