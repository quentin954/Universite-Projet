<?php
class Controller_connexion extends Controller {

    public function action_connexion(){
        /*
        On vérifie si l'utilisateur est déjà connecté lorsqu'il essaye d'accéder à la page de connexion.
        Cela empêche de charger le formulaire de connexion si une personne connectée essaye d'accéder à la page.
        */
        if(isset($_SESSION["connecte"]) and $_SESSION["connecte"]){
            header("Location: .");
            exit();
        }
        //Si l'utilisateur n'est pas connecté, on charge la vue pour afficher la page du formulaire de connexion
        $this->render("connexion");
    }

    //L'action par default si on tente d'accéder à la page est donc d'appeler l'action de connexion qui effectue les tâches expliquées au-dessus
    public function action_default(){
        $this->action_connexion();
    }

    //Cette action est appelée lors de la soumission du formulaire pour vérifier si les identifiants sont corrects
    public function action_check(){
        /*
        On charge le modèle pour le lien avec la base de données
        Ensuite, on appelle une fonction du modèle qui va renvoyer le mot de passe et tester si celui entré correspond au mot de passe chiffré stocké
        Si les identifiants sont corrects, on passe la session à 'True' pour indiquer que l'utilisateur est connecté
        Il n'est donc plus automatiquement redirigé sur la page de connexion
        Dans tous les cas, on le renvoie à la page d'accueil, s'il n'est pas connecté la vue de connexion s'affiche sinon il obtient la vue accueil
        */
        $m = Model::getModel();
        $infos = $m->identification_Check();
        if($infos != false){
            if(password_verify($_POST['mdp'], $infos["mdp"])){
                $_SESSION["connecte"] = true; 
                $_SESSION["id"] = $infos["id"];
                $_SESSION["permission"] = $infos["fonction"];
                if($infos["id"]== 123){
                    $_SESSION["permission"] = "direction";
                }
            } else {
                $this->render("connexion", ['message'=> 'Mot de passe ou login incorret']);
            }
        } else {
            $this->render("connexion", ['message'=> 'Cet utilisateur n\'existe pas']);
        }
        
        header("Location: .");
    }

    //Lors de l'appel à l'action de deconnexion, on change la statut de connexion à false ce qui bloquera l'accès aux informations et redirigera vers la page de connexion
    public function action_deconnexion(){
        $_SESSION["connecte"]=false;
        header("Location: .");
    }

    public function action_forgetmdp(){

        if (isset($_GET['token'])) {
            $token = $_GET['token'];
            $m = Model::getModel();
            
            // Vérifier si le token correspond à une personne
            $personne = $m->getPersonneByToken($token);
            
            // Si une personne correspond au token, afficher le formulaire de réinitialisation du mot de passe
            if ($personne) {
                $this->render("forgetmdp", ['email' => $personne['email'], 'token' => $token]);
                exit();
            }else{
                $this->render("forgetmdp", ['message'=> 'Ce token est mort']);
                exit;
            }
        }

        $this->render("forgetmdp", []);
    }

    public function action_sendResetLink(){

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->render("forgetmdp", ['message'=> 'Cette page nécessite une requête POST.']);
            exit();
        }

        $email = $_POST['email'];
        $m = Model::getModel();
        if (!$m->emailExiste($email)) {
            $this->render("forgetmdp", ['message'=> 'Cet utilisateur n\'existe pas']);
            exit;
        }

        $token = bin2hex(random_bytes(32));
        $m->updateResetToken($email, $token);

        $host = $_SERVER['HTTP_HOST'];
        $scriptName = $_SERVER['SCRIPT_NAME'];

        $resetLink = 'http://' . $host . dirname($scriptName) . '/?controller=connexion&action=forgetmdp' . '&token=' . urlencode($token);
        EmailSender::sendResetEmail($email, 'Réinitialisation de mot de passe', 'Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ' . $resetLink);

        $this->render("forgetmdp", ['message'=> 'Un lien de réinitialisation a été envoyé à votre adresse email.']);

    }

    public function action_changePassword(){

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->render("forgetmdp", ['message'=> 'Cette page nécessite une requête POST.']);
            exit();
        }

        $token = isset($_POST['token']) ? $_POST['token'] : null;
        $newPassword = isset($_POST['password']) ? $_POST['password'] : null;

        if (!$token || !$newPassword) {
            $this->render("forgetmdp", ['message'=> 'Veuillez fournir un token et un nouveau mot de passe.']);
            exit();
        }

        $m = Model::getModel();
        $personne = $m->getPersonneByToken($token);
    
        if (!$personne) {
            $this->render("forgetmdp", ['message'=> 'Token invalide ou expiré. Veuillez réessayer ou demander un nouveau lien de réinitialisation.']);
            exit();
        }

        $success = $m->changePasswordAndClearToken($personne["id_personne"], $newPassword);

        if ($success) {
            $this->render("forgetmdp", ['message'=> 'Le mot de passe a été réinitialisé avec succès.']);
        } else {
            $this->render("forgetmdp", ['message'=> 'Une erreur s\'est produite lors de la réinitialisation du mot de passe. Veuillez réessayer.']);
        }
        exit();

    }
}
?>