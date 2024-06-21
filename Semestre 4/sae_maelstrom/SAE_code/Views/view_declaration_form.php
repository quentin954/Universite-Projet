<?php $title= "Declarer heures";
require "view_begin.php";
 ?>

<!-- Conteneur principal -->
<div class="container">
	<div class="row justify-content-center align-items-center">
		<!-- Conteneur du formulaire -->
		<div class="container col-lg-6 col-md-8 col-sm-10 col-12 formulaire">
			<!-- Titre du formulaire -->
			<p class="form-titre">Déclarer des heures</p>
			<!-- Formulaire de déclaration des heures -->
			<form method="post" action="?controller=declaration&action=validation">
				<!-- Champ pour saisir le nombre d'heures -->
				<div class="form-group">
					<label>Heures
						<input type="text" class="form-control" size="30" name="heure" required/>
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
				<!-- Sélection du département -->
				<div class="form-group b">Département
					<div class="form-check form-g d-block">
						<?php foreach($departement as $v): ?>
							<input class="form-check-input" type="radio" name="dept" value=<?= e($v["id"]) ?>>
							<label class="form-check-label c d-block"><?= e($v["nom"]) ?></label>
						<?php endforeach ?>
					</div>
				</div>
				<!-- Sélection du type d'heure -->
				<div class="form-group b">Type d'heure
					<div class="form-check form-g">
						<input class="form-check-input" type="radio" name="type_h" value='statuaire'>
						<label class="form-check-label c">Statuaire</label>
					</div>
					<div class="form-check form-g">
						<input class="form-check-input" type="radio" name="type_h" value='complementaire'>
						<label class="form-check-label c">Complémentaire</label>
					</div>
				</div>
				<!-- Bouton pour soumettre le formulaire -->
				<button type="submit" value="Ajouter" class="form-group bouton_v2">Ajouter</button>
			</form>
		</div>
	</div>
</div>

<?php require "view_end.php"; ?>
