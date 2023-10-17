<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

	//
	$jsonObject = new json(); 
	//
    getUsers($dbConn, $jsonObject);
	$jsonObject->send();

	function getUsers($connection, $jsonObject)
	{
		$query = <<<EOD
                SELECT u.email, first_name, last_name, phone, birthdate, national_id, is_admin, COUNT(r2.id) as reservations_count, IFNULL(SUM(p2.due_payment), 0) as due,
                       (SELECT IFNULL(SUM(s.amount), 0) FROM subpayment s left join payment p on s.payment_id = p.id right join reservation r on p.id = r.payment_id where r.user_email = u.email) AS paid
                FROM user as u left join reservation r2 on u.email = r2.user_email left join payment p2 on r2.payment_id = p2.id
                GROUP BY u.email;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->users = $rows;
        $result->free_result();
		return true;
	}
?>