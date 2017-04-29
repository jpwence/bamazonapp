var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: '',
	database: 'Bamazon'
});

function promptUserPurchase() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'What would you like to purchase? (enter Item ID)'
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many do you need?'
		}
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;

		var dbQuery = 'SELECT * FROM products WHERE ?';

		connection.query(dbQuery, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				setTimeout(function() {
                	displayInventory();
            	}, 5000);

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {
					console.log('Requested item is in stock! Placing order!');

					var updateDBQuant = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateDBQuant, setTimeout(function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed.');
						console.log('Your total price is $' + productData.price * quantity);
						console.log('Thanks for shopping!');
						console.log("\n---------------------------------------------------------------------\n");
						
						setTimeout(function() {
                			displayInventory();
            			}, 4000);

					}, 4000));
				} else if (quantity >= productData.stock_quantity) {
					console.log('Insufficient Quantity!');
					console.log('Please modify your order.');
					console.log("\n---------------------------------------------------------------------\n");

            		setTimeout(function() {
                		displayInventory();
            		}, 5000);
				}
			}
		})
	})
}

function displayInventory() {

	dbQuery = 'SELECT * FROM products';

	// Make the db query
	connection.query(dbQuery, function(err, data) {
		if (err) throw err;

		console.log('Currently in Stock: ');
		console.log('...............................................................................\n');

		var currentDBInventory = '';
		for (var i = 0; i < data.length; i++) {
			currentDBInventory = '';
			currentDBInventory += 'Item ID: ' + data[i].item_id + '  //  ';
			currentDBInventory += 'Product Name: ' + data[i].product_name + '  //  ';
			currentDBInventory += 'Department: ' + data[i].department_name + '  //  ';
			currentDBInventory += 'Price: $' + data[i].price + '\n';

			console.log(currentDBInventory);
		}

	  	console.log("---------------------------------------------------------------------\n");


	  	promptUserPurchase();
	})
}

function runBamazon() {
	displayInventory();
}

runBamazon();