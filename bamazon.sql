DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER(4) NOT NULL,
    PRIMARY KEY (item_id),
    product_name VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);


INSERT INTO products (item_id, product_name, department, price, stock_quantity)
VALUES (9, "Phone Charger USB Cable", "Electronics", 9.99, 50),
        (13, "Teddy Bear", "Toys", 14.99, 300),
        (76, "Wireless Controller", "Video Games", 59.99, 2000),
        (145, "Wireless Bluetooth Headphones", "Electronics", 129.99, 5000),
        (285, "Playstation 4 w/ 3 Games Bundle", "Video Games", 499.99, 0),
        (583, "Fidget Spinner", "Toys", 2.99, 50000),
        (872, "Call of Duty Console Game", "Video Games", 9.99, 20000),
        (1004, "Pioneer XDJ-RR DJ System", "Electronics", 999.99, 0),
        (1477, "Off-Road R/C Car", "Toys", 39.99, 378),
        (5395, "Easy Bake Oven Set", "Toys", 24.99, 50);

SELECT * FROM products;