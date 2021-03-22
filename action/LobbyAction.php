<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if (!empty($_GET["logout"])) {
				session_unset();
				session_destroy();
				session_start();
			}
            return [];
        }
    }