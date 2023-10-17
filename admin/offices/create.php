<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $country = $_POST['country'];
    $city = $_POST['city'];
    $location = $_POST['location'];
    //
    $jsonObject = new json();
    //
    if (doesOfficeExist($dbConn, $country, $city, $location)){
        $jsonObject->success = false;
        $jsonObject->error = [450, "An office exists in the same exact country and city and location"];
    }else{
        addOffice($dbConn, $country, $city, $location, $jsonObject);
    }
    $jsonObject->send();

	function addOffice($connection, $country, $city, $location, $jsonObject)
	{
		$query = <<<EOD
            INSERT INTO office(location,city,country,active)
            VALUES ('$location','$city','$country',true);
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}

	function doesOfficeExist($connection, $country, $city, $location)
    {
        $query = "SELECT * FROM office WHERE country='$country' AND city='$city' AND location='$location';";
        $result = $connection->query($query);
        if ($result->num_rows == 0){
            $result->free_result();
            return false;
        }
        $result->free_result();
        return true;
    }
?>