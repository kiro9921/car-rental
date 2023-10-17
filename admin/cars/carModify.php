<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";

    $method = $_POST['method'];
    $plate = $_POST['plate'];
    $manufacturer = $_POST['manufacturer'];
    $model = $_POST['model'];
    $year = $_POST['year'];
    $pricePerDay = $_POST['pricePerDay'];
    $image = $_POST['image'];
    $officeID = $_POST['officeID'];
    //
    $jsonObject = new json();
    //
    if (doesOfficeExist($dbConn, $officeID)){
        if ($method == "add"){
            if (doesCarExist($dbConn, $plate)){
                $jsonObject->success = false;
                $jsonObject->error = [440, "A car already exist with the same plate"];
            }else{
                addCar($dbConn, $plate, $manufacturer, $model, $year, $pricePerDay, $image, $officeID, $jsonObject);
            }
        }else if ($method == "edit"){
            updateCar($dbConn, $plate, $manufacturer, $model, $year, $pricePerDay, $image, $officeID, $jsonObject);
        }
    }else{
        $jsonObject->success = false;
        $jsonObject->error = [430, "No office with such ID"];
    }
    $jsonObject->send();

	function addCar($connection, $plate, $manufacturer, $model, $year, $pricePerDay, $image, $officeID, $jsonObject)
	{
		$query = <<<EOD
            INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id)
            VALUES ('$plate','$manufacturer','$model',$year,$pricePerDay,'$image',$officeID);
            INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('$plate',NULL,'ACTIVE',current_timestamp());
EOD;
		$result = $connection->multi_query($query);
        $jsonObject->success = true;
		return true;
	}

	function updateCar($connection, $plate, $manufacturer, $model, $year, $pricePerDay, $image, $officeID, $jsonObject)
	{
		$query = <<<EOD
            UPDATE car SET manufacturer='$manufacturer', model='$model', year ='$year', price_per_day=$pricePerDay, image='$image', office_id=$officeID
            WHERE plate = '$plate';
EOD;
		$result = $connection->query($query);
        $jsonObject->success = true;
		return true;
	}



    function doesCarExist($connection, $plate)
    {
        $query = "SELECT * FROM car WHERE plate='$plate';";
        $result = $connection->query($query);
        if ($result->num_rows == 0){
            $result->free_result();
            return false;
        }
        $result->free_result();
        return true;
	}

	function doesOfficeExist($connection, $officeID)
	{
        $query = "SELECT * FROM office WHERE id=$officeID;";
        $result = $connection->query($query);
        if ($result->num_rows == 0){
            $result->free_result();
            return false;
        }
        $result->free_result();
        return true;
	}
?>