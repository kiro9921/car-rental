<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$email = $_POST['email'];
	$firstName = $_POST['firstName'];
	$lastName = $_POST['lastName'];
	$phone = $_POST['phone'];
	$birthdate = $_POST['birthdate'];
	$nationalID = $_POST['nationalID'];
	$password = $_POST['password'];
	//
	$emailDuplicate = false;
	$jsonObject = new json();
	//
	if (!checkDuplicate($dbConn, $email, $nationalID)){
		createAccount($dbConn, $email, $firstName, $lastName, $phone, $birthdate, $nationalID, $password);
		$jsonObject->success = true;
		$jsonObject->cookie = encrypt($email);
		$jsonObject->send();
	}else{
	    $jsonObject->success = false;
	    if ($emailDuplicate == true){
	        $jsonObject->error = [420, "Account with this email already exists"];
	    }else{
	        $jsonObject->error = [421, "Account with this national ID already exists"];
	    }
		$jsonObject->send();
	}

	function createAccount($connection, $email, $firstName, $lastName, $phone, $birthdate, $nationalID, $password){
		$query = "INSERT INTO user (email, first_name, last_name, phone, birthdate, national_id, hashed_password, is_admin) VALUES ('$email','$firstName','$lastName','$phone', '$birthdate', '$nationalID', '$password', false);";
		$connection->query($query);
	}

	function checkDuplicate($connection, $email, $nationalID)
	{
	    global $emailDuplicate;
		$query = "SELECT * FROM user WHERE email='$email';";
		$result = $connection->query($query);
		if ($result->num_rows > 0){
		    $emailDuplicate = true;
			$result->free_result();
			return true;
		}
		$query2 = "SELECT * FROM user WHERE national_id='$nationalID';";
		$result2 = $connection->query($query2);
		if ($result2->num_rows > 0){
            $emailDuplicate = false;
            $result2->free_result();
            return true;
        }
		$result->free_result();
		return false;
	}
?>