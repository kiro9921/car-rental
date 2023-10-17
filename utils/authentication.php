<?php

	use Simple\json;

	include('../includes/json.php');
	require_once "../connection.php";
	require_once "crypto.php";

	$method = $_POST['method'];
	$input = "";
	if (isset($_POST['input'])){
	    $input = $_POST['input'];
    }
	//
	$jsonObject = new json();
	//
	if ($method == "encrypt"){
	    $cookie = encrypt($input);
	    $jsonObject->cookie = $cookie;
	    $jsonObject->success = true;
	}else if ($method == "decrypt"){
	    $email = decrypt($input);
        $jsonObject->email = $email;
        $jsonObject->success = true;
	}else if ($method == "verify"){
	    $email = decrypt($input);
        $jsonObject->verified = doesUserExist($dbConn, $email);
	    $jsonObject->success = true;
	}else if ($method == "verifyAdmin"){
        $email = decrypt($input);
        $jsonObject->verified = doesAdminExist($dbConn, $email);
        $jsonObject->success = true;
    }
	$jsonObject->send();

    function doesUserExist($connection, $email){
        $query = "SELECT * FROM user WHERE email='$email';";
        $result = $connection->query($query);
        if ($result->num_rows == 0){
            $result->free_result();
            return false;
        }
        $result->free_result();
        return true;
    }

    function doesAdminExist($connection, $email){
            $query = "SELECT * FROM user WHERE email='$email' AND is_admin=true;";
            $result = $connection->query($query);
            if ($result->num_rows == 0){
                $result->free_result();
                return false;
            }
            $result->free_result();
            return true;
        }

?>