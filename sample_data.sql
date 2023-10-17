INSERT INTO `user`(email,first_name,last_name,phone,birthdate,national_id,hashed_password,is_admin) VALUES ('andrew@gmail.com','Andrew','Wahid','+20120123456','1999-01-01','123456','098f6bcd4621d373cade4e832627b4f6', false);
INSERT INTO `user`(email,first_name,last_name,phone,birthdate,national_id,hashed_password,is_admin) VALUES ('maaroof@gmail.com','Ahmed','Maaroof','+20120123457','1999-01-02','123457','098f6bcd4621d373cade4e832627b4f6', false);
INSERT INTO `user`(email,first_name,last_name,phone,birthdate,national_id,hashed_password,is_admin) VALUES ('karim@gmail.com','Karim','Sameh','+20120123458','1999-01-03','123458','098f6bcd4621d373cade4e832627b4f6', false);
INSERT INTO `user`(email,first_name,last_name,phone,birthdate,national_id,hashed_password,is_admin) VALUES ('kiro@gmail.com','Kyrollos','Magdy','+20120123459','1999-01-04','123459','098f6bcd4621d373cade4e832627b4f6', false);
INSERT INTO `user`(email,first_name,last_name,phone,birthdate,national_id,hashed_password,is_admin) VALUES ('admin@gmail.com','Admin','Account','+20120123450','1999-01-05','123450','098f6bcd4621d373cade4e832627b4f6', true);


INSERT INTO office(id,location,city,country,active) VALUES (1,'Smouha','Alexandria','Egypt',true);
INSERT INTO office(id,location,city,country,active) VALUES (2,'Moharam Bek','Alexandria','Egypt',true);
INSERT INTO office(id,location,city,country,active) VALUES (3,'Fifth Settlement','Cairo','Egypt',true);
INSERT INTO office(id,location,city,country,active) VALUES (4,'Champs-Elysees','Paris','France',true);
INSERT INTO office(id,location,city,country,active) VALUES (5,'Orange County','California','United States of America',false);


INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('TYY 120','Toyota','Corolla',2016,20,'https://i.ibb.co/sq2kL6g/Toyota-Corolla-2016.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('TYY 121','Toyota','Corolla',2018,25,'https://i.ibb.co/cb9XNKv/Toyota-Corolla-2018.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('NSS 130','Nissan','Sunny',2020,20,'https://i.ibb.co/xf8PNpg/Nissan-Sunny-2020.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('NSS 131','Nissan','Sentra',2016,10,'https://i.ibb.co/n1gZvFz/Nissan-Sentra-2016.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('CVV 140','Chevrolet','Aveo',2013,10,'https://i.ibb.co/d6VQ3Lw/Cheverolet-Aveo-2013.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('CVV 141','Chevrolet','Optra',2012,15,'https://i.ibb.co/2YNkM6c/Cheverolet-Optra-2012.jpg',1);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('BWW 150','BMW','M3',2018,50,'https://i.ibb.co/wKs0k2Q/BMW-M3-2018.jpg',1);
--
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('JEP 160','Jeep','Cherokee',2016,60,'https://i.ibb.co/tQr1BkY/Jeep-Cherokee-2016.jpg',2);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('OPE 170','Opel','Grandland X',2019,40,'https://i.ibb.co/JdYkpfF/Opel-Grandland-X-2019.jpg',2);
--
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('MRR 180','Mercedes-Benz','GLA250',2021,75,'https://i.ibb.co/zXYPBFn/Mercedes-Benz-GLA250-2021.jpg',3);
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('KIA 190','KIA','Sportage',2018,50,'https://i.ibb.co/Rh5bMDM/KIA-Sportage-2018.jpg',3);
--
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('TES 200','Tesla','Model S',2020,100,'https://i.ibb.co/fNcwxpq/Tesla-Model-S-2020.jpg',4);
--
INSERT INTO car(plate,manufacturer,model,year,price_per_day,image,office_id) VALUES ('FRD 210','Ford','Mustang',2019,100,'https://i.ibb.co/GPyGjBy/Ford-Mustang-2019.jpg',5);

INSERT INTO payment(id,due_payment) VALUES (1,80.0);
INSERT INTO payment(id,due_payment) VALUES (2,60.0);
INSERT INTO payment(id,due_payment) VALUES (3,75.0);
INSERT INTO payment(id,due_payment) VALUES (4,75.0);
--
INSERT INTO payment(id,due_payment) VALUES (5,60);
INSERT INTO payment(id,due_payment) VALUES (6,45);
INSERT INTO payment(id,due_payment) VALUES (7,400);
INSERT INTO payment(id,due_payment) VALUES (8,300);
--
INSERT INTO payment(id,due_payment) VALUES (9,300);
INSERT INTO payment(id,due_payment) VALUES (10,120);

INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (1,'andrew@gmail.com','TYY 120','2021-10-15','2021-10-18',1);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (2,'maaroof@gmail.com','TYY 120','2021-10-19','2021-10-21',2);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (3,'kiro@gmail.com','TYY 121','2021-10-16','2021-10-18',3);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (4,'karim@gmail.com','TYY 121','2021-10-21','2021-10-23',4);
--
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (5,'andrew@gmail.com','CVV 140','2021-12-02','2021-12-06',5);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (6,'maaroof@gmail.com','CVV 141','2021-12-08','2021-12-10',6);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (7,'kiro@gmail.com','TES 200','2021-12-22','2021-10-25',7);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (8,'karim@gmail.com','MRR 180','2021-12-10','2021-12-13',8);
--
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (9,'andrew@gmail.com','JEP 160','2022-01-08','2022-01-12',9);
INSERT INTO reservation(id,user_email,car_plate,start_date,end_date,payment_id) VALUES (10,'maaroof@gmail.com','OPE 170','2022-01-17','2022-01-19',10);


INSERT INTO subpayment(payment_id,amount,date) VALUES (1,15.0,'2021-10-15');
INSERT INTO subpayment(payment_id,amount,date) VALUES (1,30.0,'2021-10-17');
INSERT INTO subpayment(payment_id,amount,date) VALUES (1,35.0,'2021-10-18');
INSERT INTO subpayment(payment_id,amount,date) VALUES (2,60.0,'2021-10-19');
INSERT INTO subpayment(payment_id,amount,date) VALUES (3,50.0,'2021-10-16');
INSERT INTO subpayment(payment_id,amount,date) VALUES (3,25.0,'2021-10-18');
INSERT INTO subpayment(payment_id,amount,date) VALUES (4,75.0,'2021-10-19');
--
INSERT INTO subpayment(payment_id,amount,date) VALUES (5,60.0,'2021-12-03');
INSERT INTO subpayment(payment_id,amount,date) VALUES (8,150.0,'2021-12-10');
INSERT INTO subpayment(payment_id,amount,date) VALUES (8,100.0,'2021-12-13');
--
INSERT INTO subpayment(payment_id,amount,date) VALUES (9,100.0,'2022-01-08');
INSERT INTO subpayment(payment_id,amount,date) VALUES (10,50.0,'2022-01-05');

INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',null,'ACTIVE','2021-10-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',null,'ACTIVE','2021-10-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('NSS 130',null,'ACTIVE','2021-10-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('NSS 131',null,'ACTIVE','2021-10-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 140',null,'ACTIVE','2021-10-05');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 141',null,'ACTIVE','2021-10-05');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('BWW 150',null,'ACTIVE','2021-10-08');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('JEP 160',null,'ACTIVE','2021-10-08');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('OPE 170',null,'ACTIVE','2021-10-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('MRR 180',null,'ACTIVE','2021-10-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('KIA 190',null,'ACTIVE','2021-10-15');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TES 200',null,'ACTIVE','2021-10-15');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('FRD 210',null,'ACTIVE','2021-10-15');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('NSS 131',null,'OUT OF SERVICE','2021-12-15');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('NSS 131',null,'ACTIVE','2021-12-25');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 141',null,'OUT OF SERVICE','2022-01-05');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',1,'RESERVED','2021-10-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',2,'RESERVED','2021-10-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',3,'RESERVED','2021-10-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',4,'RESERVED','2021-10-10');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 140',5,'RESERVED','2021-12-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 141',6,'RESERVED','2021-12-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TES 200',7,'RESERVED','2021-12-01');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('MRR 180',8,'RESERVED','2021-12-01');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('JEP 160',7,'RESERVED','2022-01-03');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('OPE 170',8,'RESERVED','2022-01-03');


INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',1,'PICKED UP','2021-10-15');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',1,'RETURNED','2021-10-18');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',2,'PICKED UP','2021-10-19');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 120',2,'RETURNED','2021-10-20');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',3,'PICKED UP','2021-10-16');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',3,'RETURNED','2021-10-18');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',4,'PICKED UP','2021-10-21');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TYY 121',4,'RETURNED','2021-10-23');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 140',5,'PICKED UP','2021-12-02');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 140',5,'RETURNED','2021-12-06');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 141',6,'PICKED UP','2021-12-08');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('CVV 141',6,'RETURNED','2021-12-10');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TES 200',7,'PICKED UP','2021-12-22');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('TES 200',7,'RETURNED','2021-12-24');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('MRR 180',8,'PICKED UP','2021-12-10');
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('MRR 180',8,'RETURNED','2021-12-13');
--
INSERT INTO car_status(car_plate,reservation_id,status,date) VALUES ('JEP 160',9,'PICKED UP','2022-01-08');