<?php
// Définition du titre de la page
$title = "Ajouter un utilisateur";

// Inclusion du fichier d'en-tête
require "view_begin.php";
?>

<div id="cont_case" class="container">
    <!-- Titre de la section -->
    <h1 class="h1titre">Quel type d'utilisateur <br> voulez-vous ajouter ?</h1>

    <!-- Boutons pour ajouter un enseignant ou un secrétaire -->
    <a href="?controller=annuaire&action=ajouter_form&poste=enseignant">
        <button class="ajout bouton_v2">Enseignant</button>
    </a>
    <a href="?controller=annuaire&action=ajouter_form&poste=secretaire">
        <button class="ajout bouton_v2">Secrétaire</button>
    </a>
</div>

<?php
// Inclusion du fichier de pied de page
require "view_end.php";
?>
