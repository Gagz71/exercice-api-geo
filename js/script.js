//Création d'une fonction qui appliquera un overlay
function setOverlay(){
    $('body').append('<div class="overlay"><img src="img/ajax-loader.svg"></div>');
}

//Fonction permettant de supprimer l'overlay appliqué par setOverlay()
function removeOverlay(){
    $('.overlay').remove();
}

//Si le formulaire est envoyé
$('form').submit(function(e){

    //Bloquer la redirection sur la page geo.api.gouv.fr/communes/
    e.preventDefault();

    //Suppression des éventuels anciens messages d'erreurs
    $('form').find('.error').remove();

    //Déclaration variable pointant sur le champs de recherche du formulaire
    let cityToFind = $('#nom');

    //Vérification qu'une recherche ait bien été saisie 
    if(cityToFind.val().length < 1 || cityToFind.val().length > 45 ){  //Ville les plus courtes en FR de 1 caractère, et la plus longue de 45 caractères
        $('#view').html('<p class="error">Veuillez saisir une commune française.</p>'); //insertion d'un message d'erreur dans la div view
    } else{

        //requête ajax permettant d'envoyer des données GET à la page geo.api.gouv.fr
        $.ajax({
            type: $(this).attr('method'), //Permet de récupérer la méthode (GET/POST) utilisé sur notre formulaire
            url: $(this).attr('action'), // Récupère l'url où est pointé le formulaire 
            dataType: 'json',
            data: $(this).serialize(), //récupérer l'ensemble des données du formulaire
            success: function(data){
                //Code lu en cas de succès
                if(data.length > 0){ //S'il y a au moins une ligne dans le tableau contenant les données demandés

                    console.log(data);

                    //Message de succès
                    $('form').prepend('<p class="success">Résultat: 1 !</p>');

                    //Création d'un tableau HTML 
                    let cityToFindTable = $(`
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Code postaux</th>
                                <th>Population</th>
                                <th>Departement</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    `);

                    //Pour chaque ville dans le tableau data reçu en requête ajax
                    data.forEach(function(city){

                        //Création de la <tr></tr> de la ville actuelle demandé
                        let newCity = $('<tr></tr>');

                        //Création <td></td> contenant le nom de la ville
                        let cityName = $('<td></td>');
                        cityName.text(city.nom);

                        //Création <td></td> contenant le code postal de la ville
                        let cityPost = $('<td></td>');
                        cityPost.text(city.code);

                        //Création du <td></td> contenant la population de la ville
                        let cityPop = $('<td></td>');
                        cityPop.text(city.population);

                        //Création du <td></td> contenant le département de la vill
                        let cityDept = $('<td></td>');
                        cityDept.text(city.codeDepartement);

                        //Insertion des <td></td> dans la <tr></tr>
                        newCity.append(cityName);
                        newCity.append(cityPost);
                        newCity.append(cityPop);
                        newCity.append(cityDept);


                        //Insertion de la <tr></tr> dans le <tbody></tbody>
                        cityToFindTable.find('tbody').append(newCity);

                    });
                    

                    //Insertion du tableau dans la div.view
                    $('#view').html(cityToFindTable);

                    


                } else{ //Si le tableau est vide
                    //Insertion d'un message d'erreur
                    $('#view').html('<p class="error">Ville inconnue. Veuillez modifier votre recherche</p>');
                }
            },
            error: function(){ //Code lu en cas d'echec
                //Insertion d'un message d'erreur
                $('#view').html('<p class="error">Problème de connexion</p>');
            },
            beforeSend: function(){
                //Mise en place de l'overlay
                setOverlay();
            }, 
            complete: function(){
                //Suppression de l'overlay
                removeOverlay();
            }
        });
    }
});