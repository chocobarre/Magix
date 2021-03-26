<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if (!empty($_GET["logout"])) {
                $result = parent::callAPI("signout", $data);

                if ($result == "SIGNED_OUT") {
                    session_unset();
                    session_destroy();
                    session_start();
                    header("location:index.php");
                    exit;
                }
            }
        }
    }