<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

	//
	$jsonObject = new json(); 
	//
    getOffices($dbConn, $jsonObject);
    $jsonObject->send();

	function getOffices($connection, $jsonObject)
	{
        $query = <<<EOD
            SELECT o.id, o.location, o.city, o.country, o.active, COUNT(c.plate) as cars
            FROM office o left join car c on o.id = c.office_id
            GROUP BY o.id;
EOD;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->offices = $rows;
        $result->free_result();
		return true;
	}
?>