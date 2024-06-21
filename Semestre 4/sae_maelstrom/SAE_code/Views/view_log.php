<?php 
// Définition du titre de la page
$title = "Log";
// Inclusion du fichier d'en-tête de la vue
require "view_begin.php";
?>

<div id='cont_case' class='container-fluid justify-content-center align-items-center'>
    <!-- Titre de la page -->
    <h1 class="h1titre">Log</h1>
    <!-- Tableau affichant les logs -->
    <table class='tb'>
        <tr>
            <!-- En-têtes du tableau -->
            <th class='gold2 basic'>Action</th>
            <th class='gold2 basic'>Date de modification</th>
            <th class='gold2 basic'>Modification</th>
        </tr>
        <!-- Boucle sur les logs -->
        <?php foreach($log as $l):?>
            <tr>
                <!-- Colonne Action -->
                <td class="white2 basic">
                    <?= e($l['action'])?>
                </td>
                <!-- Colonne Date de modification -->
                <td class="white2 basic">
                    <?= e($l['date_modif'])?>
                </td>
                <!-- Colonne Modification -->
                <td class="white2 basic">
                    <?php 
                    // Condition pour déterminer le type de modification
                    if (e($l['action']) == 'INSERT') { ?>
                        <?= e($l['nom']) . " " . e($l['prenom']) ." a été ajouté dans la bdd"?>
                    <?php } else if (e($l['action']) == 'UPDATE') { ?>
                        <?= e($l['nom']) . " " . e($l['prenom']) ." a été modifié dans la bdd"?>
                    <?php } else { ?>
                        <?= e($l['nom']) . " " . e($l['prenom']) ." a été supprimé de la bdd"?>
                    <?php } ?>
                </td>
            </tr>
        <?php endforeach?>
    </table>
</div>

<?php require "view_end.php"; ?>
