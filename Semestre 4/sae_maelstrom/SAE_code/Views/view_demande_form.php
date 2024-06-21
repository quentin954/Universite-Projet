<?php $title= "Formulaire de demande";
require "view_begin.php"; 
 ?>
<!-- Conteneur principal -->
<div class="container">
	<div class="row justify-content-center align-items-center">
		<!-- Conteneur du formulaire -->
		<div class="container col-lg-6 col-md-8 col-sm-10 col-12 formulaire">
			<!-- Titre du formulaire -->
			<p class="form-titre">Formulaire de demande</p>
            <!-- Formulaire de demande -->
            <form method="post" action="?controller=departement&action=validation">
				<!-- Champ pour saisir le nombre d'heures -->
				<div class="form-group">
					<label>Heures
						<input type="text" class="form-control" size="30" name="besoin" required/>
					</label>
                </div>
				<!-- Sélection de l'année -->
				<div class="form-group">
					<label>Année</label>
					<select name="annee" class="form-select" style="width: 350px;" required>
                        <!-- Options d'année générées dynamiquement -->
                        <option value="" selected disabled>Choississez une option</option>
                        <?php foreach($annee as $c): ?>
						    <?php foreach($c as $v): ?>
                                <option value="<?= e($v) ?>"> <?= e($v) ?> </option>
						    <?php endforeach ?>
                        <?php endforeach ?>
					</select>
				</div>
				<!-- Sélection du semestre -->
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
				<!-- Sélection de la formation -->
				<div class="form-group b">Formation
					<div class="form-check form-g d-block">
						<?php foreach($formation as $v): ?>
							<input class="form-check-input" type="radio" name="formation" value=<?= e($v["id"]) ?>>
							<label class="form-check-label c d-block"><?= e($v["nom"]) ?></label>
						<?php endforeach ?>
					</div>
				</div>
                <!-- Sélection de la discipline -->
				<div class="form-group b">Discipline
					<div class="form-check form-g d-block">
						<select name="discipline" class="form-select" style="width: 350px;" required>
                            <!-- Options de discipline générées dynamiquement -->
                            <option value="" selected disabled>Choississez la discipline</option>
                            <?php foreach($discipline as $v): ?>
                                <option value="<?= e($v["id"]) ?>"> <?=e($v["nom"]) ?> </option>
                            <?php endforeach ?>
						</select>
					</div>
				</div>
                <!-- Bouton pour soumettre le formulaire -->
				<button type="submit" value="Envoyer" class="form-group bouton_v2">Envoyer la demande</button>
			</form>
		</div>
	</div>
</div>
<?php require "view_end.php"; ?>
