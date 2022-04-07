$(() => {

    clearTableAndPopulate();

    function clearTableAndPopulate(cb) {
        $(".table tr:gt(1)").remove();
        $("#spinner-row").show();

        $.get('/people/getall', function (result) {
            $("#spinner-row").hide();
            result.forEach(person => {
                $(".table").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
        <button class='btn btn-warning edit'
data-first-name="${person.firstName}"
data-person-id="${person.id}"
            data-last-name="${person.lastName}"
            data-age="${person.age}">Edit</button>
        <button class='btn btn-danger delete' data-person-id=${person.id}>Delete</button>
    </td>
</tr>`);
            });
            if (cb) {
                cb();
            }
        });
    }

    $("#show-add").on('click', function () {
        $(".modal-title").text('Add Person');
        $("#add").show();
        $("#update").hide();
        $(".modal").modal();
    });

    $("#add").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            clearTableAndPopulate(() => {
                $(".modal").modal('hide');
            });
            
        });
    });

    $("#update").on('click', function () {
        const id = $(".modal").data('person-id');
        console.log(id);
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post('/people/update', { id, firstName, lastName, age }, function () {
            clearTableAndPopulate();
            $(".modal").modal('hide');
        });
        
    });

    $("table").on('click', '.edit', function () {
        const button = $(this);
        const id = button.data('person-id');
        const firstName = button.data('first-name');
        const lastName = button.data('last-name');
        const age = button.data('age');
        $(".modal").data('person-id', id);

        $("#first-name").val(firstName);
        $("#last-name").val(lastName);
        $("#age").val(age);
        $(".modal-title").text("Edit Person");
        $("#add").hide();
        $("#update").show();
        $(".modal").modal();
    });

    $("table").on('click', '.delete', function () {
        const button = $(this);
        const id = button.data('person-id');
        $.post('/people/delete', { id }, function () {
            clearTableAndPopulate();
        })
    });

})