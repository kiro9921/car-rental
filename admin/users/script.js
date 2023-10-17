let usersTable;
//
$(document).ready(function() {
	verifyLoggedAdmin("../../user/login").then(function (result) {
		if (result === true){
			$(document).initializeUsersTable();
			$(document).loadUsersData();
		}
	});
	let uBody = $('#usersTable tbody');
	uBody.on('click', '.table-button.set-admin', function () {
		let data = usersTable.row( $(this).parents('tr') ).data();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "admin.php",
			data: {"method": "set", "email": data["email"]},
			cache: false,
			success: function(data) {
				console.log("G1");
				console.log(data);
				SlickLoader.disable();
				location.reload();
			}
		});
	});
	uBody.on('click', '.table-button.remove-admin', function () {
		let data = usersTable.row( $(this).parents('tr') ).data();
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "admin.php",
			data: {"method": "remove", "email": data["email"]},
			cache: false,
			success: function(data) {
				console.log("G1");
				console.log(data);
				SlickLoader.disable();
				location.reload();
			}
		});
	});
	$.fn.loadUsersData = async function (){
		SlickLoader.enable();
		$.ajax({
			type: "POST",
			url: "users.php",
			data: {},
			cache: false,
			success: function(data) {
				SlickLoader.disable();
				usersTable.clear().draw();
				usersTable.rows.add(data['users']).draw();
			}
		});
	}
	$.fn.initializeUsersTable = async function (){
		usersTable = $('#usersTable').DataTable({
				columnDefs: [
					{"className": "dt-center", "targets": "_all"},
					{
						"targets": -1,
						"defaultContent": "<button class='table-button set-admin' type='button'>Set Admin</button>"
					},
				],
				columns: [
					{ "data": "email" },
					{ "data": "first_name" },
					{ "data": "last_name" },
					{ "data": "national_id" },
					{ "data": "phone" },
					{ "data": "birthdate" },
					{ "data": "reservations_count" },
					{ "data": "due" },
					{ "data": "paid" },
					{ "data": "admin_null" },
				],
				rowCallback: function(row, data, index) {
					if (data.is_admin === "1") {
						$("td:eq(9)", row).html('<button class=\'table-button remove-admin\' type=\'button\'>Remove Admin</button>');
					}
				}
			}
		);
	}
});