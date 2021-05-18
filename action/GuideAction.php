<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/UserDAO.php");

    class GuideAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $articles = UserDAO::getAllArticles();
            $comments = [];

            if (!empty($articles)) {
                foreach($articles as $elements) {
                    $comments[] = UserDAO::getAllCommentsById($elements["id"]);
                }
            }

            if (!empty($_GET["?selectedArticles"])) {
                $article = UserDAO::getArticleByName($_GET["?selectedArticles"]);
                $comments[] = UserDAO::getAllCommentsById($elements["id"]);
            } else {
                $article = $articles[0];
            }

            return compact("article", "articles", "comments");
        }
    }