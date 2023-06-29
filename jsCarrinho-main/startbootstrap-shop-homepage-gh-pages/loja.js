let cartItems = [];
function addToCart(index) {
    cartItems.push(index);
    updateCartCount();
}
function removeFromCart(index) {
    const itemIndex = cartItems.indexOf(index);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCartCount();
    }
}
function updateCartCount() {
    const cartCountElement = document.getElementById("cartCount");
    cartCountElement.innerText = cartItems.length;
}
function redirectToCart() {
    console.log(cartItems);
}

        function updateCartItemsTable() {
            const cartItemsTableBody = document.getElementById("cartItemsTableBody");
            cartItemsTableBody.innerHTML = "";

            for (let i = 0; i < cartItems.length; i++) {
                const index = cartItems[i];
                const productName = getProductByIndex(index).name;
                const productPrice = getProductByIndex(index).price;

                const row = document.createElement("tr");

                const nameCell = document.createElement("td");
                nameCell.innerText = productName;
                row.appendChild(nameCell);

                const priceCell = document.createElement("td");
                priceCell.innerText = "R$" + productPrice.toFixed(2);
                row.appendChild(priceCell);

                const actionsCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.className = "btn btn-danger btn-sm";
                removeButton.innerText = "Remover";
                removeButton.onclick = function() {
                    removeFromCart(index);
                };
                actionsCell.appendChild(removeButton);
                row.appendChild(actionsCell);

                cartItemsTableBody.appendChild(row);
            }
        }

        function getProductByIndex(index) {
            const products = [
                { name: "Trufa de Leite Condensado", price: 5.0 },
                { name: "Trufa de Morango", price: 6.0 },
                { name: "Trufa de Maracujá", price: 5.0 },
                { name: "Trufa de Laranja", price: 5.0 },
                { name: "Trufa de Coco", price: 6.0 },
                { name: "Trufa de Choc. Branco", price: 5.0 }
            ];
            return products[index];
        }

        function checkout() {
            if (cartItems.length > 0) {
                $('#paymentModal').modal('show');
            } else {
                console.log("Carrinho vazio!");
            }
        }

        function confirmPayment() {
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (selectedPaymentMethod) {
                const paymentMethod = selectedPaymentMethod.id;
                console.log("Pagamento confirmado! Método selecionado: " + paymentMethod);
            } else {
                console.log("Selecione um método de pagamento!");
            }
        }
        const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
        if (cartItemsFromLocalStorage) {
            cartItems = JSON.parse(cartItemsFromLocalStorage);
            updateCartItemsTable();
        }
   