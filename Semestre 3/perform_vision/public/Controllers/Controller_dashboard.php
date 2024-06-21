<?php

class Controller_dashboard extends Controller
{
    public function action_default()
    {
        $this->action_dashboard();
    }

    public function action_dashboard(){

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
    
            $lastMessage = $model->getLastMessageInfo($interlocuteurId, $discussion['id_discussion']);
    
            $discussionList[] = [
                'discussion_id' => $discussion['id_discussion'],
                'nom_interlocuteur' => $interlocuteur['nom'],
                'prenom_interlocuteur' => $interlocuteur['prenom'],
                'photo_interlocuteur' => $interlocuteur['photo_de_profil'],
                'lastMessage' => $lastMessage,
            ];
        }

        $this->render('dashboard', [
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'photo_de_profil' => $user['photo_de_profil'],
            'role' => $role,
            'discussions' => $discussionList
        ]);

    }
}