let url = new URL(window.location.href);
let searchParams = new URLSearchParams(url.search);
//
const rawStartDate = searchParams.get("startDate");
const rawEndDate = searchParams.get("endDate");
var startDate = new Date(rawStartDate);
var endDate = new Date(rawEndDate);
const rentalDays = Math.abs((startDate.getTime() - endDate.getTime()) / (1000 * 3600 * 24)) + 1;
//
let minimumPrice = searchParams.get("minP") || 0;
let maximumPrice = searchParams.get("maxP") || 1000;
let manufacturer = searchParams.get("manufacturer") || "All";
let minimumYear = searchParams.get("minY") || 1995;
let maximumYear = searchParams.get("maxY") || 2022;
//
const manufacturers = document.getElementById("filter-manufacturer");
//
let userEmail;
let carData;
//
let yearSlider;
let priceSlider;

function onCarClick(carPlate, index){
	Swal.fire({
		icon: 'question',
		title: 'Are you sure ?',
		html: '<pre>' + `Are you sure you want to reserve ${carPlate}\nfrom ${rawStartDate} to ${rawEndDate} ?` + '</pre>',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
	}).then((result) => {
		if (result.isConfirmed) {
			$('#'+carPlate).reserveCar(carPlate, carData["cars"][index]["total_price"]);
		}
	});
}

function applyFilter() {
	minimumYear = yearSlider.getValue().split(",")[0];
	maximumYear = yearSlider.getValue().split(",")[1];
	//
	minimumPrice = priceSlider.getValue().split(",")[0];
	maximumPrice = priceSlider.getValue().split(",")[1];
	//
	manufacturer = manufacturers.value;
	//
	$(document).loadResults();
}

function initYearSlider(min, max) {
	yearSlider = new rSlider({
		target: '#filter-year',
		values: {min: 1995, max: 2022},
		step: 1,
		scale: true,
		labels: false,
		range: true,
	});
	yearSlider.setValues(min, max);
}

function initPriceSlider(min, max) {
	priceSlider = new rSlider({
		target: '#filter-price',
		values: {min: 0, max: 200},
		step: 5,
		scale: true,
		labels: false,
		range: true,
	});
	priceSlider.setValues(min, max);
}

function loadCarsList(){
	$('ul').empty();
	for (let _car in carData["cars"]) {
		carData["cars"][_car]["total_price"] = carData["cars"][_car]["price_per_day"] * rentalDays;
		$("ul").append(`
			<li onclick="onCarClick(this.id,this.getAttribute('carindex'))" id="${carData["cars"][_car]["plate"]}" carindex="${_car}">
				<a class="car">
					<img src="${carData["cars"][_car]["image"]}" class="car_image" alt=""/>
					<div class="car_overlay">
						<div class="car_header">
							<svg class="car_arc" xmlns="http://www.w3.org/2000/svg"><path/></svg>
							<div class="card_header-text">
								<h3 class="card_title">${carData["cars"][_car]["manufacturer"]} ${carData["cars"][_car]["model"]} ${carData["cars"][_car]["year"]}</h3>
								<span class="car_status">${carData["cars"][_car]["plate"]}</span>
							</div>
						</div>
						<p class="car_description">Price per day: ${carData["cars"][_car]["price_per_day"]} EGP<br/>Price for duration: ${carData["cars"][_car]["total_price"]} EGP<br/></p>
					</div>
				</a>
			</li>`
		);
	}
	return true;
}
//
//http://localhost/carrental/search/result.html?startDate=2021-10-10&endDate=2021-10-30&country=Egypt&city=Alexandria
$(document).ready(function() {
	verifyLoggedUser("../login", false).then(function (result) {
		if (result === true){
			$(document).loadResults();
			initPriceSlider(minimumPrice === "NULL" ? 0 : minimumPrice, maximumPrice === "NULL" ? 0 : maximumPrice);
			initYearSlider(minimumYear === "NULL" ? 0 : minimumYear, maximumYear === "NULL" ? 0 : maximumYear);
			$(document).loadManufacturers();
		}
	});
	$.fn.loadResults = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "GET",
			url: "search.php",
			data: {
				"startDate": searchParams.get("startDate"),
				"endDate": searchParams.get("endDate"),
				"country": searchParams.get("country"),
				"city": searchParams.get("city"),
				"minPrice": minimumPrice,
				"maxPrice": maximumPrice,
				"manufacturer": manufacturer,
				"minYear": minimumYear,
				"maxYear": maximumYear,
			},
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				carData = data;
				loadCarsList();

			}
		});
	}
	$.fn.reserveCar = async function (carPlate, totalPrice) {
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "reserve.php",
			data: {"car": carPlate, "user": Cookies.get('user'), "startDate": rawStartDate, "endDate": rawEndDate, "totalPrice": totalPrice},
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				if (data["success"]){
					Swal.fire(
						'Success!',
						'Car is rented for you successfully!',
						'success'
					).then((result) => {
						window.location.href = "../reservations"
					});
				}
			}
		});
	};
	$.fn.loadManufacturers = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "../../utils/utils.php",
			data: {"functionName": "findManufacturers"},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				let opt = document.createElement('option');
				opt.value = "All";
				opt.innerHTML = "All";
				manufacturers.appendChild(opt);
				for (let _manufacturer in data["manufacturers"]) {
					let opt = document.createElement('option');
					opt.value = data["manufacturers"][_manufacturer]["manufacturer"];
					opt.innerHTML = data["manufacturers"][_manufacturer]["manufacturer"];
					manufacturers.appendChild(opt);
				}
			}
		});
	}
});