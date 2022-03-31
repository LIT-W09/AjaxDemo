$(() => {

    $("#my-button").on('click', function () {

        const min = $("#min").val();
        const max = $("#max").val();

        $.get(`/home/GetRandomNumber`, { min: min, max: max } , function (obj) {
            $("#numbers").prepend(`<li class='list-group-item'>${obj.randomNumber}</li>`)
        });
    });

    
});
