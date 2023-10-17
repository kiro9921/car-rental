let reservationsTable;
let paymentsTable;
//
$(document).ready(function() {
	verifyLoggedUser("../login", false).then(function (result) {
		if (result === true){
			$(document).initializeReservationTables();
			$(document).loadReservationsData();
		}
	});
	let rBody = $('#reservationsTable tbody');
	rBody.on('click', '.table-button.history', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		let regExSearch = '^' + data["id"] +'$';
		paymentsTable.column(1).search(regExSearch, true, false).draw();
	});
	rBody.on('click', '.table-button.cancel', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		Swal.fire({
			icon: 'question',
			title: 'Are you sure ?',
			html: '<pre>' + `Are you sure you want to cancel\nyour reservation for ${data["car_plate"]}\nfrom ${data["start_date"]} to ${data["end_date"]} ?` + '</pre>',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
		}).then((result) => {
			if (result.isConfirmed) {
				SlickLoader.enable();
				$.ajax({
					type: "POST",
					url: "cancel.php",
					data: {"reservationID": parseInt(data["id"])},
					cache: false,
					success: function(data) {
						SlickLoader.disable();
						location.reload();
					}
				});
			}
		});
	});
	rBody.on('click', '.table-button.pay', function () {
		let data = reservationsTable.row( $(this).parents('tr') ).data();
		let maxAmount = parseInt(data["due_payment"]) - parseInt(data["paid"]);
		if (maxAmount <= 0){
			Swal.fire({
				icon: 'error',
				title: 'Failed',
				html: '<pre>' + "You don't owe anything to pay!" + '</pre>',
			});
			return false;
		}
		Swal.fire({
			title: 'How much do you want to pay ?',
			icon: 'question',
			input: 'range',
			inputLabel: 'Amount in EGP',
			inputAttributes: {
				min: 0,
				max: maxAmount,
				step: 1
			},
			inputValue: 0
		}).then((result) => {
			if (!result.isConfirmed) return false;
			let amount = result.value;
			$.ajax({
				type: "POST",
				url: "pay.php",
				data: {"reservationID": parseInt(data["id"]), "amount": amount},
				cache: false,
				success: function(data) {
					SlickLoader.disable();
					location.reload();
				}
			});
		});
	});
	$.fn.loadReservationsData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "reservations.php",
			data: {"method": "reservations", "user": Cookies.get('user')},
			cache: false,
			success: function(data) {
				console.log(data);
				reservationsTable.clear().draw();
				reservationsTable.rows.add(data['reservations']).draw();
				$.ajax({
					type: "POST",
					url: "reservations.php",
					data: {"method": "payments", "user": Cookies.get('user')},
					cache: false,
					success: function(data) {
						paymentsTable.clear().draw();
						paymentsTable.rows.add(data['payments']).draw();
						SlickLoader.disable();
					}
				});
			}
		});
	}
	$.fn.initializeReservationTables = async function (){
		reservationsTable = $('#reservationsTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
					{
						"targets": -1,
						"data": null,
						"defaultContent": `
							<div style="display: flex">
								<button class=\"table-button pay\">Pay</button>
								<button class=\"table-button cancel\">Cancel</button>
							</div>
						`
					},
					{
						"targets": -2,
						"data": null,
						"defaultContent": "<button class=\"table-button history\">Check</button>"
					},
				],
				columns: [
					{ "data": "id" },
					{ "data": "car_plate" },
					{ "data": "start_date" },
					{ "data": "end_date" },
					{ "data": "stat" },
					{ "data": "due_payment" },
					{ "data": "paid" },
					{ "data": "history" },
					{ "data": "pay" },
				],
				rowCallback: function(row, data, index) {
					if (data.stat === "RESERVED") {
						$("td:eq(4)", row).css("color", "cornflowerblue");
					}else if (data.stat === "PICKED UP") {
						$("td:eq(4)", row).css("color", "orange");
					}else if (data.stat === "RETURNED") {
						$("td:eq(4)", row).css("color", "green");
					}
				}
			}
		);
		paymentsTable = $('#paymentsTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
				],
				columns: [
					{ "data": "id" },
					{ "data": "rid" },
					{ "data": "amount" },
					{ "data": "date" },
				],
			}
		);
	}
});