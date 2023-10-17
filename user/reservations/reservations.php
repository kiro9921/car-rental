<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$method = $_POST['method'];
	$user = $_POST['user'];
	//
	$jsonObject = new json(); 
	//
	$email = decrypt($user);
	if ($method == "reservations"){
	    getReservations($dbConn, $email, $jsonObject);
    }else if ($method == "payments"){
        getPayments($dbConn, $email, $jsonObject);
    }
	$jsonObject->send();

	function getReservations($connection, $email, $jsonObject)
	{
		$query = <<<EOD
                SELECT distinct r.id, r.start_date, r.end_date, r.car_plate, p.due_payment, IFNULL(SUM(s.amount), 0) as paid,
                    (SELECT cs.status
                    FROM car_status cs join car c on cs.car_plate = c.plate
                    where cs.date <= current_timestamp() AND c.plate = r.car_plate AND cs.reservation_id = r.id
                    ORDER BY cs.date DESC
                    LIMIT 1) as stat
                FROM reservation r left join payment p on r.payment_id = p.id left join subpayment s on p.id = s.payment_id
                WHERE r.user_email = '$email'
                group by p.id;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->reservations = $rows;
        $result->free_result();
		return true;
	}

		function getPayments($connection, $email, $jsonObject)
    	{
    		$query = <<<EOD
                SELECT s.id, r.id as rid, s.amount, s.date
                FROM reservation r join payment p on r.payment_id = p.id join subpayment s on p.id = s.payment_id
                where r.user_email = '$email';
    EOD;
    		$result = $connection->query($query);
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            $jsonObject->success = true;
            $jsonObject->payments = $rows;
            $result->free_result();
    		return true;
    	}
?>