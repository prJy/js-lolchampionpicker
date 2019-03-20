$(document).ready(function() {
    $("#champion-list").lolChampionPicker({
        lolApiVersion: "9.5.1"
    });

    $("#btncheckSelectedChampion").click((event) => {
        event.preventDefault();
        var selectedChamps = $("#champion-list").data('lolChampionPicker').getJSON();
        alert(selectedChamps);
    });

    $("#btnAll").click((event) => {
        event.preventDefault();
        $("#champion-list").data('lolChampionPicker').selectAll();
    });

    $("#btnNone").click((event) => {
        event.preventDefault();
        $("#champion-list").data('lolChampionPicker').unSelectAll();
    });
});