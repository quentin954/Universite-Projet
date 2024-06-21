<?php 
// Définition du titre de la page
$title = "Liste des départements";
// Inclusion du fichier d'en-tête de la vue
require "view_begin.php"; 
 ?>

<div id="cont_case" class="container justify-content-center align-items-center">
    <!-- Titre de la section -->
    <div> 
        <h2 id="deco" class="badge rounded-pill"> Liste des départements </h2>
    </div>
    <!-- Boucle sur la liste des départements -->
    <div class="row">
        <?php foreach($libelledept as $n): ?> 
            <!-- Carte représentant un département -->
            <div class="card ldp" :hover style="max-height: 6rem;">
                <!-- Lien vers la page du département avec son ID -->
                <a class="home-badge" aria-current="page" href="?controller=departement&action=departement&id=<?=e($n["id"]) ?>">
                    <!-- Nom du département -->
                    <h2 class='deco2'> <?= e($n["libelledept"])?></h2>      
                </a>
            </div>
        <?php endforeach?>
    </div>
</div>

<?php require "view_end.php"; ?>
