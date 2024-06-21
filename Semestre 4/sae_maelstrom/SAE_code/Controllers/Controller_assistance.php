<?php 

class Controller_assistance extends Controller {

    public function action_assistance(){   
        $m = Model::getModel();
        $this->render("assistance", ["profil" => $m->getInfoProfil($_SESSION['id']),]);
    }

    public function action_default(){
        $this->action_assistance();
    }

    public function action_validation(){ 
        $this->render("message", ["title" => ":)","message" => "Demande envoyée !"]);
    }
}

?>