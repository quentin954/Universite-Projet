<?php 
// Définir le titre de la page
$title = "Notification demande";
// Inclure la partie initiale de la vue
require "view_begin.php";
?>

<!-- Conteneur pour afficher les demandes -->
<div id='cont_case' class='container-fluid justify-content-center align-items-center'>
    <h1 class="h1titre">Demandes</h1>
    <!-- Tableau pour afficher les demandes -->
    <table class='tb'>
        <tr>
            <!-- En-têtes du tableau -->
            <th class='gold2 basic'>Personne</th>
            <th class='gold2 basic'>Département</th>
            <th class='gold2 basic'>Besoin heure</th>
            <th class='gold2 basic'>Discipline</th>
            <th class='gold2 basic'>Semestre</th>
            <th class='gold2 basic'>Année</th>
        </tr>
        
        <?php foreach($demande as $d):?>
            <!-- Ligne pour chaque demande -->
            <tr>
                <td class="white2 basic">
                    <?= e($d['nom'])?> <?= e($d['prenom'])?>
                </td>
                <td class="white2 basic">
                    <?= e($d['libelledept'])?>
                </td>
                <td class="white2 basic">
                    <?= e($d['besoin_heure'])?>
                </td>
                <td class="white2 basic">
                    <?= e($d['libelledisc'])?>
                </td>
                <td class="white2 basic">
                    <?= e($d['s'])?>
                </td>
                <td class="white2 basic">
                    <?= e($d['aa'])?>
                </td>
            </tr>
        <?php endforeach?>
    </table>
</div>

<?php require "view_end.php";?>
