<?php 
// Définition du titre de la page
$title = "Message";
// Inclusion du fichier d'en-tête de la vue
require "view_begin.php";
?>

<div id="cont_case" class="container">
    <!-- Titre de la page -->
    <h1 class="gold">
        <?= e($title) ?>
    </h1>
    <!-- Message affiché -->
    <p class="white2" style="margin-top:30px">
        <?= e($message) ?>
    </p>
</div>

<?php require "view_end.php"; ?>
