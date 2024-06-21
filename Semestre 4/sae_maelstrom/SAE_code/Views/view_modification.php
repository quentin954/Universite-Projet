<?php
// Définir le titre de la page
$title = "Modifier son profil";
// Inclure la partie initiale de la vue
require "view_begin.php"; 
?>

<div class="container">
    <div class="row justify-content-center align-items-center">
        <div class="container col-lg-6 col-md-8 col-sm-10 col-12 formulaire">
            <!-- Titre pour le formulaire -->
            <p class="form-titre">Modifier profil</p>
            <!-- Formulaire de modification de profil -->
            <form method="post" action="?controller=profil&action=modifier">
                <!-- Champs cachés pour les informations du profil -->
                <div class="form-group">
                    <label>
                        <input type="hidden" class="form-control" size="30" name="fonction" value="<?= e($profil['fonction'])?>"/>
                    </label>
                </div>
                <div class="form-group">
                    <label>
                        <input type="hidden" class="form-control" size="30" name="id" value="<?= e($profil['id'])?>"/>
                    </label>
                </div>
                <!-- Champs d'entrée pour le nom, l'email, le téléphone et le mot de passe -->
                <div class="form-group">
                    <label>Nom
                        <input type="text" class="form-control" size="30" name="nom" value="<?= e($profil['nom'])?>"/>
                    </label>
                </div>
                <div class="form-group">
                    <label>Prénom
                        <input type="text" class="form-control" size="30" name="prenom" value="<?= e($profil['prenom'])?>"/>
                    </label>
                </div>
                <div class="form-group">
                    <label>Email
                        <input type="email" class="form-control" size="30" name="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+" value="<?= e($profil['email'])?>"/>
                    </label>
                </div>
                <div class="form-group">
                    <label>Téléphone
                        <input type="text" class="form-control" size="30" name="phone" type="tel" pattern="\d{10}" maxlength="10" value="<?= e($profil['phone'])?>"/>
                    </label>
                </div>
                <div class="form-group">
                    <label>Mot de passe
                        <input type="password" class="form-control" size="30" name="mdp" />
                    </label>
                </div>

                <!-- Champs supplémentaires si le rôle de l'utilisateur n'est ni "secretaire" ni "personne" -->
                <?php if($profil["fonction"] != "secretaire" and $profil["fonction"] != "personne") :?>
                    <!-- Menu déroulant pour "Année" -->
                    <div class="form-group">
                        <label>Année</label>
                        <select name="annee" class="form-select" style="width: 350px;" required>
                            <option value="" selected disabled>Choisissez une option</option>
                            <?php foreach($annee as $c): ?>
                                <?php foreach($c as $v): ?>
                                    <option value="<?= e($v) ?>"> <?= e($v) ?> </option>
                                <?php endforeach ?>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <!-- Boutons radio pour "Semestre" -->
                    <div class="form-group b">Semestre
                        <?php foreach($semestre as $c): ?>
                            <?php foreach($c as $v): ?>
                                <div class="form-check form-g">
                                    <input class="form-check-input" type="radio" name="semestre" value="<?= e($v) ?>">
                                    <label class="form-check-label c"><?= e($v) ?></label>
                                </div>
                            <?php endforeach ?>
                        <?php endforeach ?>
                    </div>
                    <!-- Menu déroulant pour "Statut" et "Discipline" -->
                    <div class="form-group">
                        <label>Statut</label>
                        <select name="statut" class="form-select" style="width: 350px;">
                            <?php $dis = true; ?>
                            <?php foreach($list['statut'] as $v): ?>
                                <?php if ($dis): ?>
                                    <option value="<?= e($profil["statut"]) ?>"> <?= e($profil["statut"]) ?> </option>
                                    <?php $dis = false; ?>
                                <?php endif ?>
                                <?php if ($v["siglecat"] != $profil["statut"]):?>
                                    <option value="<?= e($v["siglecat"]) ?>"> <?= e($v["siglecat"]) ?> </option>
                                <?php endif ?>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Discipline</label>
                        <select name="discipline" class="form-select" style="width: 350px;;">
                            <?php $dis = true; ?>
                            <?php foreach($list['discipline'] as $v): ?>
                                <?php if ($dis): ?>
                                    <option value="<?= e($profil["discipline"]) ?>"> <?= e($profil["discipline"]) ?> </option>
                                    <?php $dis = false; ?>
                                <?php endif ?>
                                <?php if ($v["libelledisc"] != $profil["discipline"]):?>
                                    <option value="<?= e($v["libelledisc"]) ?>"> <?= e($v["libelledisc"]) ?> </option>
                                <?php endif ?>
                            <?php endforeach ?>
                        </select>
                    </div>
                    <!-- Cases à cocher pour "Départements" -->
                    <div class="form-group b">Départements</br>
                        <?php foreach ($list['departements'] as $v): ?>
                            <?php $deptFound = false; ?>
                            <?php foreach ($profil['depts'] as $dept) : ?>
                                <?php if ($v['libelledept'] == $dept['depts']) : ?>
                                    <div class="form-check form-g">
                                        <input class="form-check-input" type="checkbox" name="departements[]" value="<?= e($dept['depts'])?>" checked/>
                                        <label class="form-check-label c"><?= e($dept['depts']) ?></label></br>
                                        <?php $deptFound = true; ?>
                                    </div>
                                <?php endif ?>
                            <?php endforeach ?>
                            <?php if (!$deptFound): ?>
                                <input class="form-check-input" type="checkbox" name="departements[]" value="<?= e($v["libelledept"])?>"/>
                                <label class="form-check-label c"><?= e($v["libelledept"]) ?></label></br>
                            <?php endif ?>
                        <?php endforeach ?>
                    </div>
                <?php endif ?>

                <!-- Button to submit the form -->
                <button type="submit" value="Mettre à jour" class="form-group bouton_v2 ">Mettre à jour</button>
            </form>
        </div>
    </div>
</div>

<?php 
// Include the end part of the view
require "view_end.php" 
?>