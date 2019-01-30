let add = document.getElementById('btnAdd');
let text = document.getElementById('inputText');
let list = document.getElementById('list');

let toDoList = [];

if (localStorage.getItem('taskItem') != undefined) {
	toDoList = JSON.parse(localStorage.getItem('taskItem'));
	item ();
}

function addBtn () {
	if (text.value === '') {
		alert ('Input text, please !');
	}
	else {
		toDoList.push({
        content: text.value,
        remove: false,
    });
    text.value = '';
    item ();
	}
}

text.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        toDoList.push({
        	content: text.value,
        	remove: false,
        });
        text.value = '';
        item ();
    };
});

function item () {
	list.innerHTML = '';
	for (let task of toDoList) {

	let li = document.createElement('li');
	li.className = 'list__item';
	list.append(li);

	let checkbox = document.createElement('input');
	li.append(checkbox);
	checkbox.className = 'check';
	checkbox.type = 'checkbox';

	let span = document.createElement('span');
	li.append(span);
	span.className = 'taskText';
	span.innerText = task.content;

	let edit = document.createElement('button');
	li.append(edit);
	edit.className = 'edit';
	edit.innerText = 'Edit';

	let del = document.createElement('button');
	li.append(del);
	del.className = 'delete';
	del.innerText = 'Delete';
	};

	localStorage.setItem ('taskItem',JSON.stringify(toDoList));
};

function sendAjax () {
	let request = new XMLHttpRequest ();
	request.onreadystatechange = function () {
		console.log(request.readyState);
	}
	request.open('GET', 'index.php');
	request.send();
}