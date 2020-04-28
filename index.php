<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercice Api Geo</title>
    <style>
        body{
            text-align: center;
        }
        #view{
            border: 2px solid black;
            min-height: 300px;
            width: 50%;
            margin: auto;
            margin-top: auto;
            margin-top: 30px;
            padding: 1rem;
        }
    </style>
</head>
<body>

        <h1>Récupérer les infos d'une ville à partir de l'api : <br>
            <a href="https://api.gouv.fr/api/api-geo.html">https://api.gouv.fr/api/api-geo.html</a>
        </h1>

        <p style="font-size: 2rem;">URL de base :<br> https://geo.api.gouv.fr/communes/?nom=VILLE</p>

        <form action="https://geo.api.gouv.fr/communes/" method="GET">
            <input type="text" name="nom" placeholder="Ville recherchée">
            <input type="submit" value="Rechercher">
        </form>

        <div id="view"></div>


    <script src="https://code.jquery.com/jquery-3.5.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>