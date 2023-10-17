<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

	//
	$jsonObject = new json(); 
	//
    getCars($dbConn, $jsonObject);
    $jsonObject->send();

	function getCars($connection, $jsonObject)
	{
        $query = <<<EOD
            SELECT plate, manufacturer, model, year, price_per_day, image, office_id,
                   (COUNT(r2.id)-IFNULL(NULLIF(COUNT(s.payment_id)-1, -1), 0)) as reservations_count,
                   IFNULL(SUM(p2.due_payment) - IFNULL(NULLIF((COUNT(s.payment_id)-1)*p2.due_payment, -p2.due_payment), 0), 0) as income,
                   IFNULL(SUM(s.amount), 0) AS received_income,
                   IFNULL(SUM(DATEDIFF(r2.end_date, r2.start_date)+1) - IFNULL(NULLIF((COUNT(s.payment_id)-1)*(DATEDIFF(r2.end_date, r2.start_date)+1), -(DATEDIFF(r2.end_date, r2.start_date)+1)), 0), 0) as reserved_days,
                  (SELECT cs.status
                   FROM car_status cs
                   where cs.date <= current_timestamp() AND cs.car_plate = plate AND (cs.status = 'ACTIVE' OR cs.status = 'OUT OF SERVICE')
                   ORDER BY cs.date DESC
                   LIMIT 1) as status
            FROM car c left join reservation r2 on c.plate = r2.car_plate left join payment p2 on r2.payment_id = p2.id LEFT JOIN subpayment s ON s.payment_id = p2.id
            GROUP BY c.plate;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->cars = $rows;
        $result->free_result();
		return true;
	}
?>