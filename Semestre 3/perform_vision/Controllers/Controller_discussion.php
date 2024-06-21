<?php

class Controller_discussion extends Controller
{
    public function action_default()
    {
        $this->action_list();
    }

    public function action_list()
    {

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $role = getUserRole($user);

        $model = Model::getModel();

        $discussions = $model->recupererDiscussion($user['id_utilisateur']);

        $discussionList = [];

        foreach ($discussions as $discussion) {
            $interlocuteurId = ($role === 'Client') ? $discussion['id_utilisateur_1'] : $discussion['id_utilisateur'];
            $interlocuteur = $model->getUserById($interlocuteurId);
    
            if (!$interlocuteur) {
                continue;
            }
    
            $unreadMessages = $model->countUnreadMessages($interlocuteurId, $discussion['id_discussion']);
    
            $discussionList[] = [
                'discussion_id' => $discussion['id_discussion'],
                'nom_interlocuteur' => $interlocuteur['nom'],
                'prenom_interlocuteur' => $interlocuteur['prenom'],
                'photo_interlocuteur' => $interlocuteur['photo_de_profil'],
                'unread_messages' => ($unreadMessages > 0),
            ];
        }

        $data = [
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'photo_de_profil' => $user['photo_de_profil'],
            'role' => $role,
            'discussions' => $discussionList
        ];

        $this->render('discussion_list', $data);
    }

    public function action_discussion()
    {

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $model = Model::getModel();

        $discussionId = isset($_GET['id']) ? e($_GET['id']) : null;

        if (!$discussionId) {
            header('Location: ?controller=discussion');
            exit();
        }

        $isModo = $model->verifModerateur($user['id_utilisateur']);

        $discussion = $model->getDiscussionById($discussionId);

        if (!$discussion || !($isModo || isUserInDiscussion($user['id_utilisateur'], $discussion))) {
            header('Location: ?controller=discussion');
            exit();
        }        

        $role = getUserRole($user);
        $receiverId = ($role === 'Client') ? $discussion['id_utilisateur_1'] : $discussion['id_utilisateur'];
        $receiver = $model->getUserById($receiverId);
    
        if (!$receiver) {
            header('Location: ?controller=discussion');
            exit();
        }
        
        $messages = $model->messagesDiscussion($discussionId);

        $data = [
            'nom_receiver' => $receiver['nom'],
            'prenom_receiver' => $receiver['prenom'],
            'photo_receiver' => $receiver['photo_de_profil'],
            'messages' => $messages,
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'photo_de_profil' => $user['photo_de_profil'],
            'role' => $role,
            'user_id' => $user['id_utilisateur'],
            'isModo' => $isModo
        ];

        $this->render('discussion', $data);
    }

    public function action_envoi_message()
    {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ?controller=discussion');
            exit();
        }

        $user = checkUserAccess();

        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        $model = Model::getModel();

        $discussionId = isset($_POST['discussionId']) ? e($_POST['discussionId']) : null;

        if (!$discussionId) {
            header('Location: ?controller=discussion');
            exit();
        }

        $discussion = $model->getDiscussionById($discussionId);

        if (!$discussion || !isUserInDiscussion($user['id_utilisateur'], $discussion)) {
            header('Location: ?controller=discussion');
            exit();
        }

        $texteMessage = isset($_POST['texte_message']) ? e($_POST['texte_message']) : '';

        $isAdmin = $model->verifAdmin($user['id_utilisateur']);
        $isModo = $model->verifModerateur($user['id_utilisateur']);
        $isAffranchi = $model->verifAffranchiModerateur($user['id_utilisateur']);

        $validation_moderation = ($isAdmin || $isModo || $isAffranchi);

        $result = $model->addMessageToDiscussion($texteMessage, $discussion['id_utilisateur'], $discussion['id_utilisateur_1'], $discussionId, $validation_moderation, $user['id_utilisateur']);

        header('Location: ?controller=discussion&action=discussion&id=' . $discussionId);
        exit();
    }

    public function action_start_discussion() {

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ?controller=discussion');
            exit();
        }

        $user = checkUserAccess();
    
        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }
    
        $model = Model::getModel();

        $id_client = $user['id_utilisateur'];

        $id_formateur = isset($_POST['id_formateur']) ? e($_POST['id_formateur']) : null;

        $discussion_id = $model->startDiscussion($id_client, $id_formateur);
        if(!$discussion_id){
            header('Location: ?controller=discussion');
            exit();
        }
    
        header('Location: ?controller=discussion&action=discussion&id=' . $discussion_id);
        exit();
    }

    public function action_validate_message()
    {
        $user = checkUserAccess();
    
        if (!$user) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }
    
        $model = Model::getModel();

        $isModo = $model->verifModerateur($user['id_utilisateur']);
        if (!$isModo) {
            echo "Accès non autorisé.";
            $this->render('auth', []);
        }

        // Récupérer l'id du message à valider depuis la requête GET
        $id_message = isset($_GET['id_message']) ? e($_GET['id_message']) : null;

        if (!$id_message) {
            // Rediriger ou afficher un message d'erreur si l'id du message n'est pas fourni
            header('Location: ?controller=discussion');
            exit();
        }

        // Appeler la fonction du modèle pour valider le message
        $discussion_id = $model->validateMessage($id_message);

        if (!$discussion_id) {
            echo "Erreur lors de la validation du message.";
            exit();
        }

        // Rediriger ou effectuer d'autres actions après la validation du message
        header('Location: ?controller=discussion&action=discussion&id=' . $discussion_id);
        exit();
    }

    

}