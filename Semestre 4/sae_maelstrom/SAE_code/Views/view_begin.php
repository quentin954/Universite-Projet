<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8"/>
    <!-- Titre de la page -->
    <title><?= $title ?></title>
    <!-- Liens vers les fichiers CSS -->
    <link rel="stylesheet" href="Content/Css/stylesheet.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>
<body class="base">
    <!-- Script Bootstrap pour la navigation mobile -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <!-- Script pour les graphiques (Chart.js) -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
        
    <!-- Barre de navigation -->
    <nav class="navbar navbar-expand-lg bg-or-primaire">
        <div class="container-fluid">
            <!-- Logo de la navbar -->
            <a class="navbar_logo" href="?controller=accueil&action=accueil">
                <img src="Content/img/LOGOTYPE_BLANC.png" alt="Logo">
            </a>

            <!-- Bouton de menu pour les petits écrans -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="menu_h">
                    <img src="Content/img/icons8-hamburger-menu.png" alt="Logo">
                </span>
            </button>

            <!-- Contenu de la barre de navigation -->
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav ms-auto">
                    <!-- Liens de navigation -->
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="?controller=accueil&action=accueil">Accueil</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Profil</a>
                        <!-- Sous-menu pour le profil -->
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="?controller=profil&action=profil">Profil personnel</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="?controller=annuaire&action=annuaire">Annuaire</a>
                            </li>
                        </ul>
                    </li>
                    <?php if($_SESSION["permission"]!="secretaire" and $_SESSION["permission"]!="personne"): ?>
                        <!-- Liens pour les heures -->
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Heures</a>
                            <!-- Sous-menu pour les heures -->
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item" href="?controller=consultation&action=consultation">Consultation</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="?controller=declaration&action=declaration">Déclaration</a>
                                </li>
                            </ul>
                        </li>
                    <?php endif ?>
                    <!-- Liens pour les demandes (visible pour les utilisateurs avec les droits appropriés) -->
                    <?php if ($_SESSION['permission'] == "chefdedpt" or $_SESSION['permission'] == "direction") :?>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="?controller=demande&action=demande">Demandes</a>
                        </li>
                    <?php endif ?>
                    <!-- Lien vers l'assistance -->
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="?controller=assistance&action=assistance">Assistance</a>
                    </li>
                    <!-- Lien pour se déconnecter -->
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="?controller=connexion&action=deconnexion">Déconnexion</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</body>
</html>
