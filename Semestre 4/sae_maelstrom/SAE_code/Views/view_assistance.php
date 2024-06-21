<?php 
// Titre de la page
$title= "Assistance";

// Inclusion du fichier d'en-tête
require "view_begin.php";
?>

<!-- Conteneur principal -->
<div class="container">
    <!-- Ligne pour centrer le contenu -->
    <div class="row justify-content-center align-items-center">
        <!-- Formulaire d'assistance -->
        <div class="container col-lg-6 col-md-8 col-sm-10 col-12 formulaire">
            <!-- Titre du formulaire -->
            <p class="form-titre">Assistance</p>
            <!-- Formulaire -->
            <form action="?controller=assistance&action=validation" method="post">

                <!-- Champ pour le nom et prénom (lecture seule) -->
                <div class="form-group">
                    <label>Nom<input type="text" class="form-control" size="25" value="<?= $profil['nom']?>" readonly></label>
                    <label>Prénom<input type="text" class="form-control" size="25" value="<?= $profil['prenom']?>" readonly></label>
                </div>
                    
                <!-- Champ pour l'identifiant (lecture seule) -->
                <div class="form-group">
                    <label>Identifiant<input type="text" class="form-control" size="30" value="<?= $profil['id']?>" readonly></label>
                </div>

                <!-- Champ pour l'adresse email (lecture seule) -->
                <div class="form-group">
                    <label>Mail<input type="email" class="form-control" size="30" value="<?= $profil['email']?>" readonly></label>
                </div>
        
                <!-- Champ pour l'objet de la demande -->
                <div class="form-group">
                    <label>Objet<input type="text" class="form-control" size="30" required></label>
                </div>
        
                <!-- Champ pour la description de la demande -->
                <div class="form-group">
                    <label>Demande<textarea class="form-control" rows="5" cols="40" required></textarea></label>
                </div>
        
                <!-- Bouton d'envoi du formulaire -->
                <button type="submit" class="form-group bouton_v2 ">Envoyer</button>
        
            </form>
        
        </div>
    </div>
</div>

<?php 
// Inclusion du fichier de pied de page
require "view_end.php";
?>
