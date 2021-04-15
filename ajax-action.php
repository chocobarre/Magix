<?php
    require_once("action/AjaxActionAction.php");

    $action = new AjaxActionAction();
    $data = $action->execute();

    echo json_encode($data["result"]);