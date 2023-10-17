<?php
$serverName = "116.203.129.97:6578";
$username = "root";
$password = "final";
$dbName = "final";

// Create dbConn$dbConn
$dbConn = new mysqli($serverName, $username, $password, $dbName);

// Check dbConn$dbConn
if ($dbConn->connect_error) {
	//printf("CONNECTION FAILED");
	die("MySQL (Connection failed): " . $dbConn->connect_error);
}

		$query = <<<EOD
            SET sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION';
EOD;
		$result = $dbConn->query($query);

?>