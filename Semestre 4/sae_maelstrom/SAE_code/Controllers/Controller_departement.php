<?php
class Controller_departement extends Controller {

    public function action_departement(){
   // tester permissions si l'utilisateur est a les droits de voir la page, sinon afficher la page 
        if($_SESSION["permission"]=="chefdedpt"){
            $m=Model::getModel();
            $data['info']=$m->getInfoDepartement($_SESSION["id"]);
            $data['nomf']=$m->getNomFormationPropose($data['info']['iddepartement']);
            $data['effectif']=$m->getEffectifDpt($data['info']['iddepartement']);
            $data['besoinh']=$m->getBesoinHeureDpt($data['info']['iddepartement']);
            if(is_null($data['besoinh']['sum'])){
                $data['besoinh']['sum'] = 0; // a voir on met quoi quand c'est null
            }
            $this->render("departement",$data);
            
        }
        elseif($_SESSION["permission"]=="direction"){
            $m=Model::getModel();
            $data["libelledept"] = $m->getNomDepartement();
            if(isset($_GET["id"])){
                $data["info"]=$m->getInfoDepartement2($_GET["id"]);
                $data['nomf']=$m->getNomFormationPropose($data['info']['iddepartement']);
                $data['effectif']=$m->getEffectifDpt($data['info']['iddepartement']);
                $data['besoinh']=$m->getBesoinHeureDpt($data['info']['iddepartement']);
                if(is_null($data['besoinh']['sum'])){
                    $data['besoinh']['sum'] = 0; // a voir on met quoi quand c'est null
                }

                $this->render("departement",$data);
            }
            $this->render("list_dpt",$data);
        }
        $this->action_error("Vous n'avez pas les permissions");
    }

    public function action_demande(){
        if($_SESSION["permission"]=="chefdedpt" || $_SESSION["permission"]=="direction") {
            $m=Model::getModel();
            $data = ["annee" => $m->getAnnee(), "semestre" => $m->getSemestre(),"departement" => $m->getDpt(), "discipline" => $m->getDiscipline(), "formation"=>$m->getFormation()];
            $this->render("demande_form",$data);
        }
        $this->action_default();
    }

    public function action_validation() {
        $m=Model::getModel();
       if(preg_match("/^[0-9]+$/",$_POST["besoin"]) and isset($_POST["annee"]) and isset($_POST["semestre"] ) and isset($_POST["formation"] ) and isset($_POST["discipline"]) ){
            $m->ajouterBesoin();
            $this->render("message", ["title" => ":)","message" => "Envoi réussi !"]);
        }
        else{
            $this->action_error("Informations non valide !");
        }
    }

    public function action_default(){
        $this->action_departement();
    }

}
?>
