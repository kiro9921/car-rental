let reservationsTable;
let reservationHistoryTable;
//
function changeStatus(reservationID, plate, status){
	SlickLoader.enable();
	$.ajax({
		type: "POST",
		url: "changeStatus.php",
		data: {"reservationID": reservationID, "plate": plate, "status": status},
		cache: false,
		success: function(data) {
			SlickLoader.disable();
			location.reload();
		}
	});
}

$(document).ready(function() {
	verifyLoggedAdmin("../../user/login").then(function (result) {
		if (result === true){
			$(document).initializeReservationsTables();
			$(document).loadReservationsData();
		}
	});
	let uBody = $('#reservationsTable tbody');
	uBody.on('click', '.table-button.payments', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		window.location.href = "../payments?reservationID="+data["reservation_id"];
	});
	uBody.on('click', '.table-button.pick-up', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		changeStatus(data["reservation_id"], data["car_plate"], "PICKED UP");
	});
	uBody.on('click', '.table-button.return', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		changeStatus(data["reservation_id"], data["car_plate"], "RETURNED");
	});
	uBody.on('click', '.table-button.cancel', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		Swal.fire({
			icon: 'question',
			title: 'Are you sure ?',
			html: '<pre>' + `Are you sure you want to cancel\nreservation for ${data["car_plate"]}\nfrom ${data["start_date"]} to ${data["end_date"]} ?` + '</pre>',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
		}).then((result) => {
			if (result.isConfirmed) {
				SlickLoader.enable();
				$.ajax({
					type: "POST",
					url: "../../user/reservations/cancel.php",
					data: {"reservationID": parseInt(data["reservation_id"])},
					cache: false,
					success: function(data) {
						SlickLoader.disable();
						location.reload();
					}
				});
			}
		});
	});
	uBody.on('click', '.table-button.history', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "history.php",
			data: {"reservationID" : data["reservation_id"]},
			cache: false,
			success: function(data) {
				console.log(data);
				SlickLoader.disable();
				reservationHistoryTable.clear().draw();
				reservationHistoryTable.rows.add(data['history']).draw();
			}
		});
	});
	$.fn.loadReservationsData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "GET",
			url: "reservations.php",
			data: {},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				reservationsTable.clear().draw();
				reservationsTable.rows.add(data['reservations']).draw();
			}
		});
	}
	$.fn.initializeReservationsTables = async function (){
		reservationsTable = $('#reservationsTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
					{
						"targets": -1,
						"defaultContent": `
							<div style="display: flex">
								<button class=\"table-button pick-up\">Pick up</button>
								<button class=\"table-button return\">Return</button>
								<button class=\"table-button cancel\">Cancel</button>
								<button class=\"table-button history\">Check status</button>
								<button class=\"table-button payments\">Check payments</button>
							</div>
						`
					},
				],
				columns: [
					{ "data": "reservation_id"},
					{ "data": "user_email"},
					{ "data": "car_plate"},
					{ "data": "start_date"},
					{ "data": "end_date"},
					{ "data": "due" },
					{ "data": "received"},
					{ "data": "status"},
					{ "data": "actions" },
				],
				rowCallback: function(row, data, index) {
					if (data.status === "RESERVED") {
						$("td:eq(7)", row).css("color", "cornflowerblue");
						$("td:eq(8)", row).html(`
							<div style="display: flex">
								<button class=\"table-button pick-up\">Pick up</button>
								<button class=\"table-button cancel\">Cancel</button>
								<button class=\"table-button history\">Check status</button>
								<button class=\"table-button payments\">Check payments</button>
							</div>
						`);
					}else if (data.status === "PICKED UP") {
						$("td:eq(7)", row).css("color", "orange");
						$("td:eq(8)", row).html(`
							<div style="display: flex">
								<button class=\"table-button return\">Return</button>
								<button class=\"table-button cancel\">Cancel</button>
								<button class=\"table-button history\">Check status</button>
								<button class=\"table-button payments\">Check payments</button>
							</div>
						`);
					}else if (data.status === "RETURNED") {
						$("td:eq(7)", row).css("color", "green");
						$("td:eq(8)", row).html(`
							<div style="display: flex">
								<button class=\"table-button cancel\">Cancel</button>
								<button class=\"table-button history\">Check status</button>
								<button class=\"table-button payments\">Check payments</button>
							</div>
						`);
					}
				}
			}
		);
		reservationHistoryTable = $('#reservationHistoryTable').DataTable({
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
					}
				}
			}
		);
	}
});