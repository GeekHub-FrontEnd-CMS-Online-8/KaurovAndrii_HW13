const add = document.getElementById('btnAdd');
const text = document.getElementById('inputText');
const list = document.getElementById('list');

function createLi (task) {
	let listItem = document.createElement('li');
	listItem.className = 'font';

	let check = document.createElement('input');
	check.className = 'check';
	check.type = 'checkbox';

	let span = document.createElement('span');
	span.innerText = task;
	span.className = 'spanItem';

	let inputText = document.createElement('input');
	inputText.type = 'text';
	inputText.className = 'editTask';

	let spanBtns = document.createElement('span');

	let edit = document.createElement('button');
	edit.className = 'edit';
	edit.innerText = 'Edit';

	let del = document.createElement('button');
	del.className = 'delete';
	del.innerText = 'Delete';

	spanBtns.appendChild(edit);
	spanBtns.appendChild(del);

	listItem.appendChild(check);
	listItem.appendChild(span);
	listItem.appendChild(inputText);
	listItem.appendChild(spanBtns);

	return listItem;
}

function addTask () {
	if (text.value == '') alert('Input text, please !');
	else {
		localStorage.setItem('task', JSON.stringify(list));
		let a = JSON.parse(localStorage.getItem('task'));
		console.log (a);

		let listItem = createLi(text.value);
		list.appendChild(listItem);

		tempTask (listItem);
		text.value = '';
	}
}

add.onclick = addTask;

function delLi () {
	let liBtns = this.parentNode;
	let li = liBtns.parentNode;
	let ul = li.parentNode;

	ul.removeChild(li);
}

function editLi () {
	let editText = prompt('Enter the correct task');

	if (editText != null && editText != '') {
		let liBtns = this.parentNode;
		let li = liBtns.parentNode;
		let ul = li.parentNode;
		ul.removeChild(li);

		let listItem = createLi(editText);
		list.appendChild(listItem);
	};
}

function tempTask (listItem) {
	let btnEdit = listItem.querySelector('.edit');
	let btnDelete = listItem.querySelector('.delete');

	btnDelete.onclick = delLi;
	btnEdit.onclick = editLi;
}

function sendData () {
	let sendText = document.getElementById('send');
	sendText.innerText = 'Data send';

	let request = new XMLHttpRequest ();
	request.onreadystatechange = function () {
		console.log(request.readyState);
	}
	request.open('GET', 'index.php');
	request.send();
}