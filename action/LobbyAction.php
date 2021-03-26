<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if (!empty($_GET["logout"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                
                $result = parent::callAPI("signout", $data);

                if ($result == "SIGNED_OUT") {
                    session_unset();
                    session_destroy();
                    session_start();
                    header("location:index.php");
                    exit;
                }
            } else if (!empty($_GET["training"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["type"] = "TRAINING";

                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_TRAINING") {
                    header("location:game.php");
                    exit;
                }
            } else if (!empty($_GET["play"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["type"] = "PVP";

                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_PVP") {
                    header("location:game.php");
                    exit;
                } else if ($result == "CREATED_PVP") {
                    header("location:game.php");
                    exit;
                }
            }
        }
    }