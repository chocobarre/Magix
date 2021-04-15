<?php
    require_once("action/CommonAction.php");

    class AjaxActionAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            if (!empty($_GET["endturn"])) {
                $data = [];
                $data["key"] = $_SESSION["key"];
                $data["type"];

                $result = parent::callAPI("games/action", $data);
            }

            /*$data = [];
            $data["key"] = $_SESSION["key"];
            $data["type"];*/

            //return compact("result");
        }
    }