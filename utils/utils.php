<?php

	use Simple\json;

	include('../includes/json.php');
	require_once "../connection.php";

	$functionName = $_POST['functionName'];
	$miscData1 = "";
	if (isset($_POST['miscData1'])){
	    $miscData1 = $_POST['miscData1'];
	}
	$miscData2 = "";
    if (isset($_POST['miscData2'])){
        $miscData2 = $_POST['miscData2'];
    }
	//
	$jsonObject = new json(); 
	//
	if ($functionName == "findAllCountries"){
	    findAllCountries($dbConn, $jsonObject);
	}else if ($functionName == "findAllCitiesInCountry"){
	    findAllCitiesInCountry($dbConn, $miscData1, $jsonObject);
	}else if ($functionName == "findManufacturers"){
        findManufacturers($dbConn, $jsonObject);
	}

	$jsonObject->send();

	function findAllCountries($connection, $jsonObject)
	{
		$query = "SELECT distinct country from office WHERE active=true;";
		$result = $connection->query($query);
		$rows = $result->fetch_all(MYSQLI_ASSOC);
		$jsonObject->success = true;
		$jsonObject->countries = $rows;
		$result->free_result();
		return true;
	}

	function findAllCitiesInCountry($connection, $country, $jsonObject)
	{
	    $query = "SELECT distinct city from office where country = '$country' AND active=true;";
        $result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->cities = $rows;
        $result->free_result();
        return true;
	}

	function findManufacturers($connection, $jsonObject)
    {
        $query = "SELECT distinct manufacturer from car;";
        $result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->manufacturers = $rows;
        $result->free_result();
        return true;
    }
?>