let carsTable;
let carHistoryTable;
//
function validateCarInputs(plate, manufacturer, model, year, pricePerDay, image, officeID){
	let errorMessage = "";
	if (plate === null || plate === ""){
		errorMessage += "Plate number required<br>";
	}
	if (manufacturer === null || manufacturer === ""){
		errorMessage += "Manufacturer required<br>";
	}
	if (model === null || model === ""){
		errorMessage += "Model required<br>";
	}
	//
	let isYearCorrect = /^\d+$/.test(year);
	if (year === null || year === ""){
		errorMessage += "Year required<br>";
	}else if (!isYearCorrect){
		errorMessage += "Year can only contain numbers<br>";
	}
	//
	let isPriceCorrect = /^\d+$/.test(pricePerDay);
	if (pricePerDay === null || pricePerDay === ""){
		errorMessage += "Price required<br>";
	}else if (!isPriceCorrect){
		errorMessage += "Price can only contain numbers<br>";
	}
	//
	if (image === null || image === ""){
		errorMessage += "Image required<br>";
	}
	//
	let isOfficeCorrect = /^\d+$/.test(officeID);
	if (officeID === null || officeID === ""){
		errorMessage += "Office ID required<br>";
	}else if (!isOfficeCorrect){
		errorMessage += "Office ID can only contain numbers<br>";
	}
	//
	return errorMessage;
}

function preconfirmDialog(isCreateMode, carPlate){
	return new Promise(function (resolve) {
		let plate = !isCreateMode ? carPlate : $('#car-plate').val();
		let manufacturer = $('#car-manufacturer').val();
		let model = $('#car-model').val();
		let year = $('#car-year').val();
		let pricePerDay = $('#car-price-per-day').val();
		let image = $('#car-image').val();
		let officeID = $('#car-office-id').val();
		// Validate input
		let errorMessage = validateCarInputs(plate, manufacturer, model, year, pricePerDay, image, officeID);
		if ( errorMessage !== '') {
			Swal.showValidationMessage(errorMessage); // Show error when validation fails.
			Swal.enableButtons();
		} else {
			Swal.resetValidationMessage(); // Reset the validation message.
			resolve({
				"plate": plate,
				"manufacturer": manufacturer,
				"model": model,
				"year": year,
				"pricePerDay": pricePerDay,
				"image": image,
				"officeID": officeID,
				"method": isCreateMode ? "add" : "edit",
			});
		}
	});
}

function openEditCreateDialog(data){
	let isCreateMode = data == null;
	let html = `
			Plate:<input id="car-plate" class="swal2-input">
			<br>Manufacturer:<input id="car-manufacturer" style="max-width: 200px" class="swal2-input">
			<br>Model:<input id="car-model" class="swal2-input" style="max-width: 200px">
			<br>Year:<input id="car-year" class="swal2-input" style="max-width: 200px">
			<br>Price per day:<input id="car-price-per-day" class="swal2-input" style="max-width: 200px">
			<br>Image:<input id="car-image" class="swal2-input" style="max-width: 200px">
			<br>Office ID:<input id="car-office-id" class="swal2-input" style="max-width: 200px">
			`;
	if (!isCreateMode){
		html = `
			Manufacturer:<input id="car-manufacturer" class="swal2-input" style="max-width: 200px" value="${data["manufacturer"]}">
			<br>Model:<input id="car-model" class="swal2-input" style="max-width: 200px" value="${data["model"]}">
			<br>Year:<input id="car-year" class="swal2-input" style="max-width: 200px" value="${data["year"]}">
			<br>Price per day:<input id="car-price-per-day" class="swal2-input" style="max-width: 200px" value="${data["price_per_day"]}">
			<br>Image:<input id="car-image" class="swal2-input" style="max-width: 200px" value="${data["image"]}">
			<br>Office ID:<input id="car-office-id" class="swal2-input" style="max-width: 200px" value="${data["office_id"]}">
			`;
	}
	Swal.fire({
		title: isCreateMode ? 'Create car' : 'Edit car: ' + data["plate"],
		html: html,
		preConfirm: function () {
			return preconfirmDialog(isCreateMode, isCreateMode ? null : data["plate"]);
		},
	}).then(function (result) {
		if (typeof(result.value) == 'undefined') {
			return false;
		}
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "carModify.php",
			data: result["value"],
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				if (!data["success"]){
					Swal.fire({
						icon: 'error',
						title: 'Failed',
						text: data["error"][1],
					});
					return false;
				}
				Swal.fire(
					'Success!',
					"Car " + (result["value"]["plate"]) +" is " + (isCreateMode ? "created" : "edited") + " successfully!",
					'success'
				).then((result) => {
					location.reload();
				});
			}
		});
	}).catch(Swal.noop)
}

function changeCarStatus(plate, status){
	SlickLoader.enable();
	$.ajax({
		type: "POST",
		url: "status.php",
		data: {"plate": plate, "status": status},
		cache: false,
		success: function(data) {
			//console.log(data);
			SlickLoader.disable();
			location.reload();
		}
	});
}

$(document).ready(function() {
	verifyLoggedAdmin("../../user/login").then(function (result) {
		if (result === true){
			$(document).initializeCarsTables();
			$(document).loadCarsData();
		}
	});
	let uBody = $('#carsTable tbody');
	uBody.on('click', '.table-button.check-image', function () {
		let data = carsTable.row( $(this).parents('tr') ).data();
		window.open(data["image"], '_blank').focus();
	});
	uBody.on('click', '.table-button.history', function () {
		let data1 = carsTable.row( $(this).parents('tr') ).data();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "carHistory.php",
			data: {"plate":data1["plate"]},
			cache: false,
			success: function(data) {
				$('#historyTitle').text("Car " + data1["plate"] + " History");
				SlickLoader.disable();
				carHistoryTable.clear().draw();
				carHistoryTable.rows.add(data['history']).draw();
			}
		});
	});
	uBody.on('click', '.table-button.edit-car', function () {
		let data = carsTable.row( $(this).parents('tr') ).data();
		openEditCreateDialog(data);
	});
	uBody.on('click', '.table-button.set-active', function () {
		let data = carsTable.row( $(this).parents('tr') ).data();
		changeCarStatus(data["plate"], "ACTIVE");
	});
	uBody.on('click', '.table-button.set-out-of-service', function () {
		let data = carsTable.row( $(this).parents('tr') ).data();
		changeCarStatus(data["plate"], "OUT OF SERVICE");
	});
	$.fn.loadCarsData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "GET",
			url: "cars.php",
			data: {},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				carsTable.clear().draw();
				carsTable.rows.add(data['cars']).draw();
			}
		});
	}
	$.fn.initializeCarsTables = async function (){
		carsTable = $('#carsTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
					{
						"targets": 6,
						"defaultContent": "<button class='table-button check-image' type='button'>Check image</button>"
					},
					{
						"targets": -1,
						"defaultContent": `
							<div style="display: flex">
								<button class=\"table-button edit-car\">Edit</button>
								<button class=\"table-button history\">Check History</button>
								<button class=\"table-button set-out-of-service\">Set out of service</button>
							</div>
						`
					},
				],
				columns: [
					{ "data": "plate" },
					{ "data": "manufacturer" },
					{ "data": "model" },
					{ "data": "year" },
					{ "data": "price_per_day" },
					{ "data": "status" },
					{ "data": "image-null" },
					{ "data": "office_id" },
					{ "data": "reservations_count" },
					{ "data": "reserved_days" },
					{ "data": "income" },
					{ "data": "received_income" },
					{ "data": "actions" },
				],
				rowCallback: function(row, data, index) {
					console.log(data.status);
					if (data.status === "ACTIVE") {
						$("td:eq(5)", row).css("color", "green");
						$("td:eq(12)", row).html(`
							<div style="display: flex">
								<button class=\"table-button edit-car\">Edit</button>
								<button class=\"table-button history\">Check History</button>
								<button class=\"table-button set-out-of-service\">Set out of service</button>
							</div>
						`);
					}else{
						$("td:eq(5)", row).css("color", "darkred");
						$("td:eq(12)", row).html(`
							<div style="display: flex">
								<button class=\"table-button edit-car\">Edit</button>
								<button class=\"table-button history\">Check History</button>
								<button class=\"table-button set-active\">Set active</button>
							</div>
						`);
					}
				}
			}
		);
		carHistoryTable = $('#carHistoryTable').DataTable({
				order: [[ 2, "desc" ]],
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
				],
				columns: [
					{ "data": "reservation_id" },
					{ "data": "status" },
					{ "data": "date" },
				],
				rowCallback: function(row, data, index) {
					if (data.status === "RESERVED") {
						$("td:eq(1)", row).css("color", "cornflowerblue");
					}else if (data.status === "PICKED UP") {
						$("td:eq(1)", row).css("color", "orange");
					}else if (data.status === "RETURNED") {
						$("td:eq(1)", row).css("color", "green");
					}else if (data.status === "ACTIVE") {
						$("td:eq(1)", row).css("color", "seagreen");
					}else if (data.status === "OUT OF SERVICE") {
						$("td:eq(1)", row).css("color", "darkred");
					}
				}
			}
		);
	}
});