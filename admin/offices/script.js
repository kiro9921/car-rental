let officesTable;
//

function validateOfficeInputs(country, city, location){
	let errorMessage = "";
	if (country === null || country === ""){
		errorMessage += "Country required<br>";
	}
	if (city === null || city === ""){
		errorMessage += "City required<br>";
	}
	if (location === null || location === ""){
		errorMessage += "Location required<br>";
	}
	//
	return errorMessage;
}

function preconfirmDialog(){
	return new Promise(function (resolve) {
		let country = $('#office-country').val();
		let city = $('#office-city').val();
		let location = $('#office-location').val();
		// Validate input
		let errorMessage = validateOfficeInputs(country, city, location);
		if ( errorMessage !== '') {
			Swal.showValidationMessage(errorMessage); // Show error when validation fails.
			Swal.enableButtons();
		} else {
			Swal.resetValidationMessage(); // Reset the validation message.
			resolve({
				"country": country,
				"city": city,
				"location": location,
			});
		}
	});
}

function openCreateDialog(){
	let html = `
			Country:<input id="office-country" class="swal2-input">
			<br>City:<input id="office-city" style="max-width: 200px" class="swal2-input">
			<br>Location:<input id="office-location" class="swal2-input" style="max-width: 200px">
			`;
	Swal.fire({
		title: "Create office",
		html: html,
		preConfirm: function () {
			return preconfirmDialog();
		},
	}).then(function (result) {
		if (typeof(result.value) == 'undefined') {
			return false;
		}
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "create.php",
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
					"Office created successfully!",
					'success'
				).then((result) => {
					location.reload();
				});
			}
		});
	}).catch(Swal.noop)
}
//
$(document).ready(function() {
	verifyLoggedAdmin("../../user/login").then(function (result) {
		if (result === true){
			$(document).initializeOfficesTable();
			$(document).loadOfficesData();
		}
	});
	let uBody = $('#officesTable tbody');
	uBody.on('click', '.table-button', function () {
		let data = officesTable.row( $(this).parents('tr') ).data();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "active.php",
			data: {"method": data["active"] === "0" ? "active" : "inactive", "officeID": data["id"]},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				location.reload();
			}
		});
	});
	$.fn.loadOfficesData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "offices.php",
			data: {},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				officesTable.clear().draw();
				officesTable.rows.add(data['offices']).draw();
			}
		});
	}
	$.fn.initializeOfficesTable = async function (){
		officesTable = $('#officesTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
					{
						"targets": -1,
						"defaultContent": "<button class='table-button set-active' type='button'>Set Active</button>"
					},
				],
				columns: [
					{ "data": "id" },
					{ "data": "country" },
					{ "data": "city" },
					{ "data": "location" },
					{ "data": "cars" },
					{ "data": "active-null" },
				],
				rowCallback: function(row, data, index) {
					if (data.active === "1") {
						$("td:eq(5)", row).html('<button class=\'table-button set-inactive\' type=\'button\'>Set Inactive</button>');
					}
				}
			}
		);
	}
});