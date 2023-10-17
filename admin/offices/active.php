<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $method = $_POST['method'];
    $officeID = $_POST['officeID'];
    //
    $jsonObject = new json();
    //
    setActive($dbConn, $officeID, $method == "active" ? 1 : 0, $jsonObject);
    $jsonObject->send();

	function setActive($connection, $officeID, $isActive, $jsonObject)
	{
		$query = <<<EOD
                UPDATE office
                SET active = $isActive
                WHERE id = $officeID;
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}
?>