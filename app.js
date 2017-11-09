$(document).ready(function () {

    $.get("http://localhost:8080/api/collaborateurs", function (donnee) {
        var tableau = `
        <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                </tr>
            </thead>
                <tbody>
        `;
        donnee.forEach((el) => {
            tableau = tableau + `
            <tr onclick="select('`+ el.matricule + `')">
                <th scope="row" id=>`+ el.matricule + `</th>
                <td>`+ el.nom + `</td>
                <td>`+ el.prenom + `</td>
            <tr>`
        })
        tableau = tableau + `</tbody></table>`

        $('#moitie1').html(tableau);
    });
});

function select(matricule) {
    $.get("http://localhost:8080/api/collaborateurs/"+matricule, function (donnee) {
        $(`#inputBanque`).val(donnee.banque.nom);
        $(`#inputIban`).val(donnee.banque.iban);
        $(`#inputBic`).val(donnee.banque.bic);

        $(`#divSave`).html(`<input type="submit" class="btn btn-primary" id="btnSauvegarder" value="Sauvegarder" onclick="save(event,'`+donnee.matricule+`')">`)
    })
}

function save(e,matricule){
    e.preventDefault()
    var donnees = {};
    $('#myform').serializeArray().forEach(don => donnees[don.name] = don.value);

    $.ajax({
        url: "http://localhost:8080/api/collaborateurs/" + matricule + "/banque",
        contentType : 'application/json',
        type: 'PUT',
        data: JSON.stringify(donnees)
    });
    
}