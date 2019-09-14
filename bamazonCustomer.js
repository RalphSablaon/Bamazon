var mysql = require ('mysql');
var inquirer = require ('inquirer');
var Table = require ('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err){
	if(err)throw err;
	console.log("connected as id: " + connection.threadId);
});

var displayProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var displayTable = new Table ({
            head: ["Item ID", "Product Name", "Department", "Price", "Stock Quantity"],
            colWidths: [10, 25, 20, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayTable.push(
                [res[i].item_id, res[i].product_name, res[i].department, res[i].price, res[i].stock_quantity]
                );
        }
        console.log(displayTable.toString());
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
        var idRequested = answer.ID;
        var qtyRequested = answer.Quantity;
        purchaseOrder (idRequested, qtyRequested);
    });
};

function purchaseOrder(idRequested, qtyRequested) {
    connection.query("SELECT * FROM products WHERE item_id = " + idRequested, function(err, res) {
        if (err) throw err;
        if (qtyRequested <= res[0].stock_quantity) {
            var cost = res[0].price * qtyRequested;
            console.log("Thank you for your purchase!");
            console.log("Your total cost for: " + qtyRequested + " " +res[0].product_name + " is: $" + cost + ". Thanks!! :)");

            
            // connection.query("UPDATE products SET stock_quantity = stock_quantity - " + qtyRequested + "WHERE item_id = " + idRequested);

            var updatedQty = res[0].stock_quantity - qtyRequested;

            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updatedQty
                },
                {
                    item_id: idRequested
                }
            ]
            )

        } else {
            console.log("Insufficient quantity! Sorry we have run out of " + res[0].product_name + ". But we promise to get some back in stock real soon!");
        };
        displayProducts();
    });
};

displayProducts();