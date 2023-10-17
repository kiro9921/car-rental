<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$car = $_POST['car'];
	$user = $_POST['user'];
	$startDate = $_POST['startDate'];
	$endDate = $_POST['endDate'];
	$totalPrice = $_POST['totalPrice'];
	//
	$jsonObject = new json(); 
	//
	$email = decrypt($user);
	reserve($dbConn, $car, $email, $startDate, $endDate, $totalPrice, $jsonObject);
	$jsonObject->send();

	function reserve($connection, $car, $user, $startDate, $endDate, $totalPrice, $jsonObject)
	{
		$query = <<<EOD
            INSERT INTO payment(due_payment) VALUES ($totalPrice);
            INSERT INTO reservation(user_email,car_plate,start_date,end_date,payment_id) VALUES ('$user','$car','$startDate','$endDate',LAST_INSERT_ID());
            INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('$car',LAST_INSERT_ID(),'RESERVED',current_timestamp());
EOD;
		$result = $connection->multi_query($query);
        $jsonObject->success = true;
		return true;
	}
?>