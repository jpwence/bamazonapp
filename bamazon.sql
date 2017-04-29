CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(40) NOT NULL,
	department_name VARCHAR(40) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Tide Pods', 'Laundry', 19.97, 20),
				('Bounce Dryer Sheets', 'Laundry', 8.96, 24),
				('Isopure Protein', 'Nutrition', 26.01, 41),
				('Kind Bars', 'Nutrition', 14.91, 50),
				('Vitamin C', 'Pharmacy', 10.99, 30),
				('Biotin', 'Pharmacy', 12.61, 10),
				('Connect 4', 'Games', 8.77, 20),
				('Battleship', 'Games', 11.93, 20),
				('LIFE', 'Games', 10.75, 20),
				('Cheetos', 'Grocery', 2.99, 50),
				('Kettle Chips', 'Grocery', 3.30, 40),
				('Doritos', 'Grocery', 2.50, 50);