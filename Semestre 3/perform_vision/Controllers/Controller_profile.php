<?php

class Controller_profile extends Controller
{
    public function action_default()
    {
        $this->action_profile();
    }

    public function action_profile()
    {

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $role = getUserRole($user);

        $model = Model::getModel();

        $data = [
            'mail' => $user['mail'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'photo_de_profil' => $user['photo_de_profil'],
            'role' => $role
        ];

        if ($role === 'Client') {
            $data['societe'] = $model->getClientById($user['id_utilisateur']);
            $this->render('monprofilclient', $data);
        } elseif ($role === 'Formateur') {
            $data['formateur'] = $model->getFormateurById($user['id_utilisateur']);
            $data['competences'] = $model->getCompetencesFormateurById($user['id_utilisateur']);
            $this->render('monprofilformateur', $data);
        } else {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }
    }

    public function action_modifier()
    {

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $role = getUserRole($user);

        $model = Model::getModel();

        $data = [
            'mail' => $user['mail'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'photo_de_profil' => $user['photo_de_profil'],
            'role' => $role
        ];

        if ($role === 'Client') {
            $data['societe'] = $model->getClientById($user['id_utilisateur']);
            $this->render('modifiermonprofilClient', $data);
        } elseif ($role === 'Formateur') {
            $data['formateur'] = $model->getFormateurById($user['id_utilisateur']);
            $data['competences'] = $model->getCompetencesFormateurById($user['id_utilisateur']);
            $this->render('modifiermonprofilformateur', $data);
        } else {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }
    }

    public function action_modifier_info(){

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ?controller=profile');
            exit();
        }

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $role = getUserRole($user);

        $model = Model::getModel();

        if (isset($_POST['nouvelle_email']) && !empty($_POST['nouvelle_email']) && $_POST['nouvelle_email'] !== $user['mail'] && filter_var($_POST['nouvelle_email'], FILTER_VALIDATE_EMAIL)) {
            $nouvelle_email = $_POST['nouvelle_email'];
            $model->updateEmail($user['id_utilisateur'], $nouvelle_email);
        }

        if (isset($_POST['nouveau_mot_de_passe']) && !empty($_POST['nouveau_mot_de_passe'])) {
            $nouveau_mot_de_passe = e(trim($_POST['nouveau_mot_de_passe']));
            if (strlen($nouveau_mot_de_passe) <= 256) {
                $model->updatePassword($user['id_utilisateur'], $nouveau_mot_de_passe);
            }
        }

        if (isset($_POST['nouvelle_societe'])) {
            $nouvelle_societe = e(trim($_POST['nouvelle_societe']));
            if (!empty($nouvelle_societe) && $nouvelle_societe !== $model->getClientById($user['id_utilisateur'])['societe']) {
                $model->updateSociete($user['id_utilisateur'], $nouvelle_societe);
            }
        }

        if (isset($_POST['nouveau_linkedin'])) {
            $nouveau_linkedin = e(trim($_POST['nouveau_linkedin']));
            $ancien_linkedin = $model->getFormateurById($user['id_utilisateur'])['linkedin'];
        
            if (!empty($nouveau_linkedin) && $nouveau_linkedin !== $ancien_linkedin) {
                $model->updateLinkedIn($user['id_utilisateur'], $nouveau_linkedin);
            }
        }
        
        if (isset($_POST['nouveau_cv'])) {
            $nouveau_cv = e(trim($_POST['nouveau_cv']));
            $ancien_cv = $model->getFormateurById($user['id_utilisateur'])['cv'];
        
            if (!empty($nouveau_cv) && $nouveau_cv !== $ancien_cv) {
                $model->updateCV($user['id_utilisateur'], $nouveau_cv);
            }
        }

        header('Location: ?controller=profile');
        exit();

    }

}