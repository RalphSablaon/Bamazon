var mysql = require ('mysql');
var inquirer = require ('inquirer');
var nodeTable = require ('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Z5hjd875*!",
    database: "bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id" + connection.threadId);
});

var displayProducts = function() {
    connection.query("SELECT * FROM products", function(res, err) {
        if (err) throw err;
        var displayTable = new Table ({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock Quantity"],
            colWidths: [10,20,20,10,15]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, rse[i].department, res[i].price, res[i].stock_quantity]
            );
        console.log(displayTable.toString());
        }
        purchasePrompt();
    });
}

function purchasePrompt() {
    inquirer.prompt([
        {
            name: "ID",
            type: "input",
            message: "Please enter the ID number of the product that you would like to purchase.",
            filter: Number
        },
        {
            name: "Quantity",
            type: "input",
            message: "How many of this product would you like to purchase?",
            filter: Number
        }
    ]).then(function(answer) {
        var idRequested = answers.ID;
        var qtyRequested = answer.Quantity;
    });
};

function purchaseOrder(ID, qtyRequested) {
    connection.query("SELECT * FROM products WHERE item_id = " + ID, function(res, err) {
        if (err) throw err;
        if (qtyRequested <= res[0].stock_quantity) {
            var cost = res[0].price * qtyRequested;
            console.log("Thank you for your pruchase!");
            console.log("Your total cost for: " + qtyRequested + res[0].product_name + "is: " + cost + ". Thanks!! :)");

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qtyRequested + "WHERE item_id = " + ID);

        } else {
            console.log("Insufficient quantity! Sorry we have run out of " + res[0].product_name + ". But we promise to get some back in stock reql soon!");
        };
        displayProducts();
    });
};

displayProducts();
