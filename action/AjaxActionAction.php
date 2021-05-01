<?php
    require_once("action/CommonAction.php");

    class AjaxActionAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"] = $_POST["type"];

            if (!empty($_POST["uid"])) {
                $data["uid"] = $_POST["uid"];
            }

            $result = parent::callAPI("games/action", $data);

            return compact("result");
        }
    }