<?php 
// Titre de la page
$title= "Annuaire";

// Inclusion du fichier d'en-tête
require "view_begin.php"; 
?>

<!-- Formulaire de recherche -->
<form>
    <p>
        <!-- Champs cachés pour le contrôleur et l'action -->
        <input type="hidden" name="controller" value="annuaire"/>
    </p>
    <p>
        <input type="hidden" name="action" value="annuaire"/>
    </p>
    <p class="ajt">
        <!-- Champ de recherche avec bouton de soumission -->
        <label>
            <input class='resr' type="text" name="recherche" placeholder='Rechercher...'/>  
            <input class='bouton_v3' type="submit" value="Rechercher"/>
        </label>
    </p>    
</form>

<!-- Bouton d'ajout d'utilisateur (visible pour les utilisateurs avec le droit de direction) -->
<?php if(isset($_SESSION["permission"]) and $_SESSION["permission"]=="direction"):?>
    <p class='ajt'>
        <label>
            <a href="?controller=annuaire&action=ajouter">
                <button class='bouton_v3'>Ajouter</button>
            </a>
        </label>
    </p>
<?php endif ?>

<!-- Tableau des utilisateurs -->
<div id='cont_case' class='container-fluid col justify-content-center align-items-center'>
    <div class='row marge'>
        <table>
            <!-- En-têtes de colonne -->
            <tr class='texttr' class='row'>
                <td>
                    <strong>Nom</strong>
                </td>
                <td>
                    <strong>Prénom</strong>
                </td>
                <td>
                    <strong>Grade</strong>
                </td>
            </tr>
            <!-- Itération sur les utilisateurs -->
            <?php foreach($infos as $v): ?>
                <tr>
                    <!-- Nom avec lien vers le profil -->
                    <td>
                        <a class="lien" href="?controller=profil&action=profil&id=<?= e($v["id_personne"])?>"><?=e($v["nom"])?></a>
                    </td>
                    <!-- Prénom avec lien vers le profil -->
                    <td>
                        <a class="lien" href="?controller=profil&action=profil&id=<?= e($v["id_personne"])?>"><?=e($v["prenom"])?></a>
                    </td>
                    <!-- Grade de l'utilisateur -->
                    <td class="fonction">
                        <?= e($v["fonction"])?>
                    </td>
                    <!-- Bouton de suppression (visible pour les utilisateurs avec le droit de direction) -->
                    <?php if(isset($_SESSION["permission"]) and $_SESSION["permission"]=="direction"):?>     
                        <td>
                            <a href="?controller=annuaire&action=supprimer&id=<?= e($v["id_personne"])?>">
                                <img class="croix" src="Content/img/icons8-cross-in-circle-100.png" alt="supprimer"/> 
                            </a>
                        </td>
                    <?php endif ?>
                </tr>
            <?php endforeach ?>
        </table>
    </div>
</div>

<?php 
// Inclusion du fichier de pied de page
require "view_end.php"; 
?>
