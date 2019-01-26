// add task in list
$(document).ready(function() {
    $('#btn-add').click(function() {
        let inputText = $('#input-text').val();
        if (!inputText) {
            return false;
        }
        let task = '<li class="string"> <div> <input type="checkbox" class="check">' + inputText + '</div> <div> <button class="edit">Edit</button> <button class="delete">Delete</button> </div> </li>';
        $('#list').append(task);
        $('#input-text').val('');
        deleteString();
    })
});

//delete string
function deleteString() {
    $('.delete').click(function(){
        $(this).parents('#list').remove();
    })
}