<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $method = $_POST['method'];
    $email = $_POST['email'];
    //
    $jsonObject = new json();
    //
    setAdmin($dbConn, $email, $method == "set" ? 1 : 0, $jsonObject);
    $jsonObject->send();

	function setAdmin($connection, $email, $isAdmin, $jsonObject)
	{
		$query = <<<EOD
                UPDATE user
                SET is_admin = $isAdmin
                WHERE email = '$email';
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}
?>