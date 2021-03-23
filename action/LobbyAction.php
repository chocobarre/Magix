<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $result = parent::callAPI("signout", $data);

            if ($result == "INVALID_KEY") {

            }
            else {
                $key = $result->key;
            }

            return compact("result");
        }
    }