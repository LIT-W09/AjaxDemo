$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/people/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>

</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/people/addperson', { firstName, lastName, age }, function (person) {
            //console.log(person.id);
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
})