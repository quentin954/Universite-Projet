<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8" />
    <title>Mot de passe oublié</title>
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
                <p class="co"><strong>Réinitialisation du mot de passe</strong></p>

                <form action="<?= isset($token) ? '?controller=connexion&action=changePassword' : '?controller=connexion&action=sendResetLink' ?>" method="post">
                    <div class="form-group">
                        <label for="email">
                            <img class='icone_co' src='Content/img/icons8-email-100.png'/>
                            Adresse e-mail
                        </label>
                        <?php if(isset($token)): ?>
                            <input class="form-control" type="email" name="email" id="email" value="<?= e($email) ?>" readonly/>
                            <input type="hidden" name="token" value="<?= e($token) ?>">
                        <?php else: ?>
                            <input class="form-control" type="email" name="email" id="email" required/>
                        <?php endif ?>
                    </div>

                    <?php if(isset($token)): ?>
                        <div class="form-group">
                            <label for="password">
                                Nouveau mot de passe
                            </label>
                            <input class="form-control" type="password" name="password" id="password" required/>
                        </div>
                    <?php endif ?>

                    <?php if(isset($message)): ?>
                        <p class='psswrd'> <?= $message ?> </p>
                    <?php endif ?>

                    <label>
                        <?php if(isset($token)): ?>
                            <input class="bouton" type="submit" value="Réinitialiser le mot de passe" />
                        <?php else: ?>
                            <input class="bouton" type="submit" value="Envoyer le lien de réinitialisation" />
                        <?php endif ?>
                    </label>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
