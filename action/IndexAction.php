<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $hasConnectionError = false;

            if (empty($_SESSION["isConnected"])) {
                $_SESSION["isConnected"] = false;
            }
            
			if (isset($_POST["username"])) {
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];
                $result = parent::callAPI("signin", $data);
                
                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                } else {
                    $_SESSION["key"] = $result->key;
                    $_SESSION["isConnected"] = true;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    header("location:lobby.php");
					exit;
                }
			}
        }
    }