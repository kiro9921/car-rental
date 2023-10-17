<?php

	use Simple\json;

	include('../../includes/json.php');
	require_once "../../connection.php";
	require_once "../../utils/crypto.php";

	$startDate = $_GET['startDate'];
	$endDate = $_GET['endDate'];
	$country = $_GET['country'];
	$city = $_GET['city'];
	//
	$minPrice = $_GET['minPrice'];
	$maxPrice = $_GET['maxPrice'];
	$manufacturer = $_GET['manufacturer'];
	$minYear = $_GET['minYear'];
	$maxYear = $_GET['maxYear'];
	//
	$jsonObject = new json(); 
	//
	findFreeCars($dbConn, $startDate, $endDate, $country, $city, $minPrice, $maxPrice, $manufacturer, $minYear, $maxYear, $jsonObject);
	$jsonObject->send();

	function findFreeCars($connection, $startDate, $endDate, $country, $city, $minPrice, $maxPrice, $manufacturer, $minYear, $maxYear, $jsonObject)
	{
		$query = <<<EOD
                SELECT plate, model, manufacturer, year, price_per_day, image, office_id, location, city, country
                  FROM car JOIN office o on car.office_id = o.id
                  where plate NOT IN (
                      SELECT c.plate
                      from reservation r right join car c on r.car_plate = c.plate join office o2 on c.office_id = o2.id
                      where (('$startDate' between r.start_date and r.end_date) OR ('$endDate' between r.start_date and r.end_date))
                         OR (('$startDate' <= r.start_date) AND ('$endDate') >= r.end_date)
                         OR o2.active = false
                         OR (c.price_per_day < $minPrice OR c.price_per_day > $maxPrice)
                         OR ('$manufacturer' != 'All' AND c.manufacturer != '$manufacturer')
                         OR (c.year < $minYear OR c.year > $maxYear)
                      )
                  AND (o.city = '$city' AND o.country = '$country') AND (SELECT cs.status
                        FROM car_status cs
                        where cs.date <= current_timestamp() AND cs.car_plate = plate AND (cs.status = 'ACTIVE' OR cs.status = 'OUT OF SERVICE')
                        ORDER BY cs.date DESC
                        LIMIT 1) = 'ACTIVE';
EOD;
        //echo $query;
		$result = $connection->query($query);
        $rows = $result->fetch_all(MYSQLI_ASSOC);
        $jsonObject->success = true;
        $jsonObject->cars = $rows;
        $result->free_result();
		return true;
	}
?>