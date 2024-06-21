<?php $title= "Département";
require "view_begin.php"; ?>

<!-- Conteneur principal -->
<div id='cont_case' class='container-fluid justify-content-center align-items-center'>
    <!-- Titre de la page avec le nom du département -->
    <h1 class="h1titre">Département 
        <p class='gold'>
            <?=e(mb_strtoupper($info['libelledept']))?>
        </p>
    </h1>
    
    <!-- Tableau affichant les détails du département -->
    <table class='tb'>
        <!-- Nom du département -->
        <tr>
            <th class="gold2 basic" scope='row'>Nom</th>
            <td class="white2 basic t">
                <?= e($info['libelledept'])?>
            </td>
        </tr>
        <!-- Parcours associés au département -->
        <tr>
            <th class="gold2 basic" scope='row'>Parcours</th>
            <td class="white2 basic t">
                <?php foreach($nomf as $n): ?>
                    <?=$n["nom"]?>
                <?php endforeach?>
            </td>
        </tr>
        <!-- Effectif du département -->
        <tr>
            <th class="gold2 basic" scope='row'>Effectif</th>
            <td class="white2 basic t">
                <?=e($effectif)?>
            </td>
        </tr>
        <!-- Besoin en nombre d'heures -->
        <tr>
            <th class="gold2 basic" scope='row'>Besoin en nombre d'heures</th>
            <td class="white2 basic t">
                <?=e($besoinh["sum"])?>
            </td>
        </tr>
    </table>
    
    <!-- Bouton pour accéder aux demandes (visible uniquement pour les chefs de département) -->
    <?php if($_SESSION["permission"]=="chefdedpt"): ?>
        <p class='ajt'>
            <a href="?controller=departement&action=demande">
                <button class='bouton_v2'>Demandes</button>
            </a>
        </p>
    <?php endif?>
</div>

<?php require "view_end.php"; ?>
