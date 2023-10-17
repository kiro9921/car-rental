let url = new URL(window.location.href);
let getParams = new URLSearchParams(url.search);
let paymentsTable;
//
$(document).ready(function() {
	verifyLoggedAdmin("../../user/login").then(function (result) {
		if (result === true){
			$(document).initializePaymentsTable();
			$(document).loadPaymentsData();
		}
	});
	if (getParams.get("reservationID") != null){
		$("#paymentsTitle").text("Payments for reservation " + getParams.get("reservationID"))
	}
	let uBody = $('#paymentsTable tbody');
	$.fn.loadPaymentsData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "payments.php",
			data: {reservationID: getParams.get("reservationID")},
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				paymentsTable.clear().draw();
				paymentsTable.rows.add(data['payments']).draw();
			}
		});
	}
	$.fn.initializePaymentsTable = async function (){
		paymentsTable = $('#paymentsTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
				],
				columns: [
					{ "data": "id" },
					{ "data": "user_email" },
					{ "data": "reservation_id" },
					{ "data": "amount" },
					{ "data": "date" },
				],
			}
		);
	}
});