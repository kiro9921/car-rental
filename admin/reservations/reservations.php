<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

	//
	$jsonObject = new json(); 
	//
    getReservations($dbConn, $jsonObject);
    $jsonObject->send();

	function getReservations($connection, $jsonObject)
	{
        $query = <<<EOD
            SELECT r2.id as reservation_id, r2.user_email, r2.car_plate, r2.start_date, r2.end_date,
                   IFNULL(SUM(p2.due_payment) - IFNULL(NULLIF((COUNT(s.payment_id)-1)*p2.due_payment, -p2.due_payment), 0), 0) as due,
                   IFNULL(SUM(s.amount), 0) AS received,
                   (SELECT cs.status
                    FROM car_status cs join car c on cs.car_plate = c.plate
                    where cs.date <= current_timestamp() AND c.plate = r2.car_plate AND cs.reservation_id = r2.id
                        AND (cs.status != 'OUT OF SERVICE' AND cs.status != 'ACTIVE')
                    ORDER BY cs.date DESC
                    LIMIT 1) as status
            FROM car c right join reservation r2 on c.plate = r2.car_plate left join payment p2 on r2.payment_id = p2.id LEFT JOIN subpayment s ON s.payment_id = p2.id
            GROUP BY r2.id;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->reservations = $rows;
        $result->free_result();
		return true;
	}
?>