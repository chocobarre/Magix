<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];

            if (!empty($_GET["logout"])) {
                $result = parent::callAPI("signout", $data);

                if ($result == "SIGNED_OUT") {
                    session_unset();
                    session_destroy();
                    session_start();
                    header("location:index.php");
                    exit;
                }
            } else if (!empty($_GET["training"])) {
                $data["type"] = "TRAINING";

                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_TRAINING") {
                    header("location:game.php");
                    exit;
                }
            } else if (!empty($_GET["play"])) {
                $data["type"] = "PVP";

                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_PVP" || $result == "CREATED_PVP") {
                    header("location:game.php");
                    exit;
                }
            } else if (!empty($_GET["coop"])) {
                $data["type"] = "PVP";
                $data["mode"] = "COOP";
    
                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_PVP" || $result == "CREATED_PVP") {
                    header("location:game.php");
                    exit;
                }
            }
        }
    }