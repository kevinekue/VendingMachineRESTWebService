$(document).ready(function () {
    loadItems();
    var cash = addMoney();
    var itemIdd;
    var itemPrice;
    var itemStock;
    var totalChange;
});

function loadItems() {
    var items = $('#items-for-sale');
    var options = $('.options');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (itemsArray) {
            $.each(itemsArray, function (index, item) {
                var thisItem = item;
                var id = Number(item.id);
                var name = item.name;
                var price = Number(item.price);
                var quantity = item.quantity;
                var testInfo = '<p> This is item : ' + itemsArray[id - 1].name + ' <p>';
                var itemButton = '<button type="button" class="itemToChoose"  style="margin: 3%" value=' + id + ' >';
                itemButton += '<p id ="itemId" style="vertical-align:top; text-align: left">' + id + '</p>';
                itemButton += '<p id ="itemName" style="text-align: center">' + name + '</p>';
                itemButton += '<p id = "itemPrice" style="text-align: center"> $' + item.price + '</p>';
                itemButton += '<p id = "itemQuantity" style="vertical-align: bottom"> Quantity Left: ' + item.quantity + '</p>';

                itemButton += '</button>';


                options.append(itemButton);
                $('.itemToChoose').click(function () {
                    thisItem = $(this).val();
                    $('#purchase-itemId').val(thisItem[0]);
                    itemIdd = thisItem[0];
                    itemPrice = thisItem[2];
                    itemStock = thisItem[3];
                });
            });

        },
        error: function () {
            $('.container')
            .append($('<li>')
            .attr({class:'list-group-item list-group-item-danger'})
            .text('Error calling web service. Please try again later.')) 
        }
    });
}

function getId(id) {

    return id;
}


var dollar = $('#add-dollar').val("1.00");
var quarter = $('#add-quarter').val("0.25");
var dime = $('#add-dime').val("0.10");
var nickel = $("#add-nickel").val("0.05");

var userCash = 0;
var thisItem;
function addMoney() {

    $('.ambg').click(function () {
        userCash = userCash + Number($(this).val());
        $('#add-userMoney').val(userCash.toFixed(2));
    });
}



function purchaseItem() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + userCash + '/item/' + itemIdd,
        success: function (result) {

            $('#purchase-message').val('Successful purchase. Thank you for shopping with us.');

            totalChange = result;

            var quarters = JSON.stringify(totalChange.quarters);
            var dimes = JSON.stringify(totalChange.dimes);
            var nickels = JSON.stringify(totalChange.nickels);
            var pennies = JSON.stringify(totalChange.pennies);

            $('#button-change').click(function () {

                $('#get-change').val("You're getting back " + quarters + " quarter(s), " + dimes + " dime(s), " + nickels + " nickel(s), and " + pennies + " pennie(s)");
                $('#button-change').hide();
                userCash=0;
                $('#add-userMoney').val(userCash);
                
            });
            
        },
        error: function (result) {

            var res = result.responseJSON.message;
            
            $('#purchase-message').val(res);
            //Consolelog to view whole error object.
            
        },
    }


    );
}