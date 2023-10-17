<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";


	$email = $_POST['email'];
	$password = $_POST['password'];
	//
	$jsonObject = new json(); 
	//
	findAccount($dbConn, $email, $password, $jsonObject);
	$jsonObject->send();

	function findAccount($connection, $email, $password, $jsonObject)
	{
		$query = "SELECT * FROM user WHERE email='$email' AND hashed_password='$password';";
		$result = $connection->query($query);
		if ($result->num_rows == 0){
			$jsonObject->success = false;
			$jsonObject->error = $jsonObject->error = [422, "Wrong email and/or password"];
			$result->free_result();
			return false;
		}
		$row = $result->fetch_assoc();
		$jsonObject->isAdmin = $row['is_admin'];
		$jsonObject->cookie = encrypt($row['email']);
		$jsonObject->success = true;
		$result->free_result();
		return true;
	}
?>