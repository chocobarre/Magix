<?php
    require_once("action/DAO/Connection.php");

    class UserDAO {

        // Retourne tout les articles
        public static function getAllArticles() {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM articles");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $articles = null;

            if ($row = $statement->fetchAll()) {
                $articles = $row; 
            }

            return $articles;
        }

        // Retourne tout les commentaires d'un article spécifique
        public static function getAllCommentsById($articleId) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM comments WHERE id_article = ?");
            $statement->bindParam(1, $articleId);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $comments = null;

            if ($row = $statement->fetchAll()) {
                $comments = $row; 
            }

            return $comments;
        }

        // Retourne un article par son nom
        public static function getArticleByName($articleName) {
            $connection = Connection::getConnection();
            $statement = $connection->prepare("SELECT * FROM articles WHERE article_name = ?");
            $statement->bindParam(1, $articleName);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $articleName = null;

            if ($row = $statement->fetchAll()) {
                $articleName = $row; 
            }

            return $articleName;
        }
    }