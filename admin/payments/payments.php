<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    if (isset($_POST['reservationID'])){
        $reservationID = $_POST['reservationID'];
    }else{
        $reservationID = NULL;
    }
	//
	$jsonObject = new json(); 
	//
    getPayments($dbConn, $reservationID, $jsonObject);
	$jsonObject->send();

	function getPayments($connection, $reservationID, $jsonObject)
	{
	    $actualID = $reservationID;
	    if ($reservationID == NULL || $reservationID == ""){
	        $actualID = "NULL";
	    }
		$query = <<<EOD
            SELECT s.id, r.id as reservation_id, r.user_email as user_email, s.amount, s.date
                FROM reservation r join payment p on r.payment_id = p.id join subpayment s on p.id = s.payment_id
                WHERE (ISNULL($actualID) || r.id = $actualID) ORDER BY s.date DESC;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->payments = $rows;
        $result->free_result();
		return true;
	}
?>