<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailSender {
    
    public static function sendVerificationEmail($email, $subject, $message) {
        require 'PHPMailer/src/PHPMailer.php';
        require 'PHPMailer/src/SMTP.php';
        require 'PHPMailer/src/Exception.php';

        $mail = new PHPMailer(true);

        try {
            // Paramètres du serveur SMTP
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'no.reply.perform.vision@gmail.com'; 
            $mail->Password = 'votre_mdp';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            // Expéditeur et destinataire
            $mail->setFrom('noreply.perform.vision@gmail.com', 'perform vision');
            $mail->addAddress($email);

            // Contenu de l'e-mail
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $message;

            // Envoyer l'e-mail
            $mail->send();
        } catch (Exception $e) {
            // Gérer les erreurs d'envoi d'e-mail
            echo '\n EmailSender: Erreur lors de l\'envoi de l\'e-mail : ', $mail->ErrorInfo ,'\n';
        }
    }
}
