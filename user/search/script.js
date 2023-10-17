function pad(num, size) {
	num = num.toString();
	while (num.length < size) num = "0" + num;
	return num;
}
//
const startDate = document.getElementById("search-start-date");
const endDate = document.getElementById("search-end-date");
const country = document.getElementById("search-country");
const city = document.getElementById("search-city");
//
function adjustDatesLimits(){
	let currentDate = new Date();
	let minimumDate = (currentDate.getFullYear()) + "-" + pad(currentDate.getMonth()+1, 2) + "-" + pad(currentDate.getDate()+1, 2);
	startDate.setAttribute('min', minimumDate);
	endDate.setAttribute('min', minimumDate);
	//
	if (startDate.value !== ""){
		let dateSplitted = startDate.value.split("-");
		dateSplitted[2] = parseInt(dateSplitted[2])+1;
		let maxDate = dateSplitted[0] + "-" + dateSplitted[1] + "-" + pad(dateSplitted[2],2);
		endDate.setAttribute('min', maxDate);
	}
	if (endDate.value !== ""){
		let dateSplitted = endDate.value.split("-");
		dateSplitted[2] = parseInt(dateSplitted[2])-1;
		let minDate = dateSplitted[0] + "-" + dateSplitted[1] + "-" + pad(dateSplitted[2],2);
		startDate.setAttribute('max',minDate);
	}else{
		startDate.removeAttribute('max');
	}
}
//
function validateSearchInputs(){
	let errorMessage = "";
	if (startDate.value === ""){
		errorMessage += "Please select a start date.\n";
	}
	if (endDate.value === ""){
		errorMessage += "Please select an end date.\n";
	}
	if ((startDate !== "" && endDate !== "") && startDate.value >= endDate.value){
		errorMessage += "End date must be after start date.\n";
	}
	return errorMessage;
}
$(document).ready(function() {
	adjustDatesLimits();
	verifyLoggedUser("../login", false).then(function (result) {
		if (result === true){
			$(document).loadCountries();
		}
	});
	$("#search-country").change(async function(event) {
		$("#search-city").find('option').remove().end();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "../../utils/utils.php",
			data: {"functionName": "findAllCitiesInCountry", "miscData1": country.value},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				for (let _city in data["cities"]) {
					let opt = document.createElement('option');
					opt.value = data["cities"][_city]["city"];
					opt.innerHTML = data["cities"][_city]["city"];
					city.appendChild(opt);
				}
				$('#search-city').removeAttr('disabled');
			}
		});
	});
	$("#search-form").submit( async function(event) {
		event.preventDefault();
		var errorMessage = validateSearchInputs();
		if (errorMessage !== ""){
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				html: '<pre>' + errorMessage + '</pre>',
			});
			return false;
		}
		//var email = $("#signup-email").val();
		window.location.href = 'result.html?startDate='+startDate.value+'&endDate='+endDate.value+'&country='+country.value+'&city='+city.value;
		return false;
	});
	$.fn.loadCountries = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "../../utils/utils.php",
			data: {"functionName": "findAllCountries"},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				for (let _country in data["countries"]) {
					let opt = document.createElement('option');
					opt.value = data["countries"][_country]["country"];
					opt.innerHTML = data["countries"][_country]["country"];
					country.appendChild(opt);
				}
				$( "#search-country" ).trigger( "change" );
			}
		});
	}
});