-- User
	-- - Email
	-- - First Name
	-- - Last Name
	-- - Phone
	-- - Birthdate
	-- - National ID
	-- - Password
	-- - admin (bool)
	
CREATE TABLE `user` (
	email VARCHAR(50) PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	phone VARCHAR(50),
	birthdate DATE,
	national_id VARCHAR(50) UNIQUE,
	hashed_password VARCHAR(256),
	is_admin BOOLEAN
);

-- Office
	-- - ID (Office)
	-- - Name
	-- - Location
	-- - City
	-- - Country
	-- - Active (bool)

CREATE TABLE office (
	id INT UNIQUE NOT NULL AUTO_INCREMENT,
	location VARCHAR(50),
	city VARCHAR(50),
	country VARCHAR(50),
	active BOOLEAN,
	PRIMARY KEY (country, city, location)
);

-- Car
	-- - Manufacturer
	-- - Model
	-- - Year
	-- - Plate
	-- - Price per day
	-- - ID (Office)
	
CREATE TABLE car (
	plate VARCHAR(10) PRIMARY KEY,
	manufacturer VARCHAR(50),
	model VARCHAR(50),
	year int,
	price_per_day FLOAT,
	image VARCHAR(2083), -- Why 2083 ? https://web.archive.org/web/20060218052923/http://www.boutell.com/newfaq/misc/urllength.html
	office_id INT,
	CHECK(year BETWEEN 2005 AND (YEAR(CURRENT_TIMESTAMP) + 1) ),
	FOREIGN KEY (office_id) REFERENCES office(id)
);

-- Payment
	-- - ID (Payment)
	-- - Due price
	
CREATE TABLE payment (
	id int UNIQUE NOT NULL AUTO_INCREMENT,
	due_payment DOUBLE
);

-- Reservation
	-- - ID (reservation)
	-- - User
	-- - Car
	-- - Start date
	-- - End date
	-- - ID (Payment)

CREATE TABLE reservation (
	id int UNIQUE NOT NULL AUTO_INCREMENT,
	user_email VARCHAR(50),
	car_plate VARCHAR(10),
	start_date DATE,
	end_date DATE,
	payment_id INT,
	PRIMARY KEY (user_email, car_plate, start_date, end_date),
	FOREIGN KEY (user_email) REFERENCES `user`(email),
	FOREIGN KEY (car_plate) REFERENCES car(plate),
	FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
);

-- Subpayments
	-- - Payment
	-- - Paid amount
	-- - Date
	
CREATE TABLE subpayment (
	id INT UNIQUE NOT NULL AUTO_INCREMENT,
	payment_id INT,
	amount DOUBLE,
	date DATE,
	FOREIGN KEY (payment_id) REFERENCES payment(id) ON DELETE CASCADE
);

-- Status
	-- - Car
	-- - status
	-- - Date
	-- - ID (reservation)
	
CREATE TABLE car_status (
	id INT AUTO_INCREMENT PRIMARY KEY,
	car_plate VARCHAR(10),
	reservation_id INT,
	status ENUM('ACTIVE', 'OUT OF SERVICE', 'RESERVED', 'PICKED UP', 'RETURNED'),
	date TIMESTAMP,
	FOREIGN KEY (reservation_id) REFERENCES reservation(id) ON DELETE CASCADE,
	FOREIGN KEY (car_plate) REFERENCES car(plate) ON DELETE CASCADE
);
	