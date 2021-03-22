<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $hasConnectionError = false;
            
			if (isset($_POST["username"])) {
                $data = [];
                $data["username"] = $_POST["username"];
                $data["password"] = $_POST["password"];

                $result = parent::callAPI("signin", $data);
                
                if ($result == "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                }
                else {
                    // Pour voir les informations retournées : var_dump($result);exit;
                    $key = $result->key;
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_MEMBER;
                    header("location:lobby.php");
					exit;
                }

				/*if ($_POST["username"] == "a" && $_POST["password"] == "a") {
                    $_SESSION["visibility"] = CommonAction::$VISIBILITY_ADMINISTRATOR;
                    
					header("location:index.php");
					exit;
				}
				else {
					$hasConnectionError = true;
				}*/
			}

			return compact("hasConnectionError");
        }
    }