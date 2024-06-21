<?php 
$title = "Accueil";
require "view_begin.php"; 
?>

<div id="cont_case" class="container justify-content-center align-items-center">
    <!-- Section de bienvenue -->
    <div>
        <!-- Affiche le nom et le prénom de l'utilisateur -->
        <h2 id="deco" class="badge rounded-pill" class="position-absolute top-0 start-0 translate-middle">
            <?= "Bonjour " . e(strtoupper($nom)) . " " . e($prenom) ?>
        </h2>
    </div>

    <!-- Conteneur principal pour les cartes -->
    <div class="row">
        <!-- Carte "Mon profil" -->
        <div class="card" style="max-width: 12rem;">
            <a class="home-badge" aria-current="page" href="?controller=profil&action=profil">
                <img src="Content/img/icons8-user-100.png" class="logo-home">
                <div class="card-body col-sm">
                    <h5>Mon profil</h5>
                </div>
            </a>
        </div>

        <!-- Cartes supplémentaires pour les utilisateurs avec des permissions spécifiques -->
        <?php if ($_SESSION["permission"] != "secretaire" && $_SESSION["permission"] != "personne"): ?>
            <!-- Carte "Déclarer mes heures" -->
            <div class="card" style="max-width: 12rem;">
                <a class="home-badge" aria-current="page" href="?controller=declaration&action=declaration">
                    <img src="Content/img/icons8-schedule-100.png" class="logo-home">
                    <div class="card-body col-sm">
                        <h5>Déclarer mes heures</h5>
                    </div>
                </a>
            </div>

            <!-- Carte "Consulter mes heures" -->
            <div class="card" style="max-width: 12rem;">
                <a class="home-badge" aria-current="page" href="?controller=consultation&action=consultation">
                    <img src="Content/img/icons8-bar-chart-100.png" class="logo-home">
                    <div class="card-body col-sm">
                        <h5>Consulter mes heures</h5>
                    </div>
                </a>
            </div>
        <?php endif ?>
    </div>

    <div class="row">
        <!-- Carte "Données de l'IUT" -->
        <div class="card" style="max-width: 12rem;">
            <a class="home-badge" aria-current="page" href="?controller=consultation&action=iut">
                <img src="Content/img/icons8-pie-chart-100.png" class="logo-home">
                <div class="card-body col-sm">
                    <h5>Données de l'IUT</h5>
                </div>
            </a>
        </div>

        <!-- Carte "Annuaire" -->
        <div class="card" style="max-width: 12rem;">
            <a class="home-badge" aria-current="page" href="?controller=annuaire&action=annuaire">
                <img src="Content/img/icons8-user-account-100.png" class="logo-home">
                <div class="card-body col-sm">
                    <h5>Annuaire</h5>
                </div>
            </a>
        </div>

        <!-- Carte "Assistance" -->
        <div class="card" style="max-width: 12rem;">
            <a class="home-badge" aria-current="page" href="?controller=assistance&action=assistance">
                <img src="Content/img/icons8-request-service-100.png" class="logo-home">
                <div class="card-body col-sm">
                    <h5>Assistance</h5>
                </div>
            </a>
        </div>
    </div>

    <div class="row">
        <!-- Cartes supplémentaires pour les utilisateurs avec des permissions de direction ou chef de département -->
        <?php if ($_SESSION["permission"] == "direction" || $_SESSION["permission"] == "chefdedpt"): ?>
            <!-- Carte "Données du département" -->
            <div class="card" style="max-width: 12rem;">
                <a class="home-badge" aria-current="page" href="?controller=departement&action=departement">
                    <img src="Content/img/icons8-department-100.png" class="logo-home">
                    <div class="card-body col-sm">
                        <h5>Données du département</h5>
                    </div>
                </a>
            </div>

            <!-- Carte "Mes demandes" -->
            <div class="card" style="max-width: 12rem;">
                <a class="home-badge" aria-current="page" href="?controller=demande&action=demande">
                    <img src="Content/img/icons8-request-100.png" class="logo-home">
                    <div class="card-body col-sm">
                        <h5>Mes demandes</h5>
                    </div>
                </a>
            </div>

            <!-- Carte "Log" pour les utilisateurs avec permission de direction -->
            <?php if ($_SESSION["permission"] == "direction"): ?>
                <div class="card" style="max-width: 12rem;">
                    <a class="home-badge" aria-current="page" href="?controller=log&action=log">
                        <img src="Content/img/icons8-history-folder-100.png" class="logo-home">
                        <div class="card-body col-sm">
                            <h5>Log</h5>
                        </div>
                    </a>
                </div>
            <?php else: ?>
                <div class="card" :hover style="max-width: 12rem; visibility: hidden;"></div>
            <?php endif ?>
        <?php endif ?> 
    </div>
</div>

<?php require "view_end.php"; ?>
