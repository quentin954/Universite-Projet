<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <title>Connexion</title>
    <link rel="stylesheet" href="Content/Css/stylesheet.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body class="body_co">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    
    <!--container-fluid permet d'obtenir un affichage responsive-->
    <div id="cont_co" class="container-fluid">
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-6 col-md-8 col-sm-10 col-12 form_co">
                <p class="co"><strong>Connexion</strong></p>

                <form action="?controller=connexion&action=check" method="post">
                    <div class="form-group">
                        <label for="id">
                            <img class='icone_co' src='Content/img/icons8-user-100.png'/>
                            Identifiant
                        </label>
                        <input class="form-control" type="text" name="id" id="id" required/>
                    </div>
                    
                    <div class="form-group">
                        <label for="mdp">
                            <img class='icone_co' src='Content/img/icons8-lock-100.png' />
                            Mot de passe
                        </label>
                        <input class="form-control" type="password" name="mdp" id="password" required/>
                    </div>

                    <?php if(isset($message)): ?>
                        <p class='psswrd'> <?= $message ?> </p>
                    <?php endif ?>
                    <p>
                        <a href="?controller=connexion&action=forgetmdp">Mot de passe oublié?</a>
                        <button type="button" id="togglePassword">Afficher</button>
                    </p>
                    <label>
                        <input class="bouton" type="submit" value="> Se connecter" />
                    </label>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Sélectionne les éléments
        const passwordField = document.getElementById('password');
        const togglePasswordButton = document.getElementById('togglePassword');

        // Ajoute un écouteur d'événement au bouton
        togglePasswordButton.addEventListener('click', function() {
            // Vérifie le type actuel du champ de mot de passe
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            
            // Change le type de l'input
            passwordField.setAttribute('type', type);
            
            // Change le texte du bouton
            this.textContent = type === 'password' ? 'Afficher' : 'Masquer';
        });
    </script>
</body>
</html>
