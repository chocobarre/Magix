<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            /*if (!empty($_GET["training"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["type"] = $_GET[""];

                $result = parent::callAPI("games/auto-match", $data);

                if ($result == "JOINED_PVP") {
                    // joined pvp
                } else if ($result == "CREATED_PVP") {
                    // created pvp
                } else if ($result == "JOINED_TRAINING") {
                    // training
                }
            }*/
        }
    }