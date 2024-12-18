import '../node_modules/xlsx/xlsx.js';
 
// Get the orders from localStorage
let orders = JSON.parse(localStorage.getItem("pedidos")) || []; // Default to empty array if no orders
 
// Function to display the orders
function displayOrders() {
  if (orders && orders.length > 0) {
    let orderList = document.getElementById("order-list");
    let orderListHtml = "";
 
    orders.forEach((order, index) => {
      orderListHtml += `
<li class="order-card">
<h3>Pedido: ${order.id}</h3>
<p>Endereço:</p>
<ul>
<li>Cliente: ${order.address.name} ${order.address.surname}</li>
<li>Rua: ${order.address.address},${order.address.address_2}</li>
<li>Cidade: ${order.address.city}</li>
<li>UF: ${order.address.UF}</li>
<li>CEP: ${order.address.zip}</li>
</ul>
<p>Itens:</p>
<ul>
          `;
 
      // Check if order.items exists and is an array
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item) => {
          orderListHtml += `
<li>
<p>Codigo Produto: ${item.codigoProduto}</p>
<p>Produto: ${item.tituloProduto}</p>
<p>Quantidade: ${item.quantity}</p>
<p>Preço: R$ ${item.preco}</p>
</li>
          `;
        });
      }
 
      orderListHtml += `
</ul>
<p>Valor Total do Pedido: R$ ${order.totalValue}</p>
</li>
          `;
    });
 
    orderList.innerHTML = orderListHtml;
  } else {
    console.log("No orders found");
  }
}
 
// Call the displayOrders function
displayOrders();
 
// Export function
function exportToExcel() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []; // Default to empty array if no orders
 
  const workbook = XLSX.utils.book_new();
 
  const worksheet = XLSX.utils.aoa_to_sheet([
    // Header row
    ["ID", "E-mail", "Name", "Surname", "Phone", "CPF", "Address", "Zip", "Number", "Address 2", "Neighborhood", "City", "UF", "Item Code", "Item Title", "Item Price", "Item Description", "Item Category", "Item Classification", "Item Home Display", "Item Quantity", "Total Value"],
    // Data rows
    ...pedidos.flatMap((pedido) => {
      if (pedido.items && Array.isArray(pedido.items)) {
        return pedido.items.map((item) => [
          pedido.id,
          pedido.address.email,  // corrected "e-mail" to "email"
          pedido.address.name,
          pedido.address.surname,
          pedido.address.phone,
          pedido.address.CPF,
          pedido.address.address,
          pedido.address.zip,
          pedido.address.number,
          pedido.address.address_2,
          pedido.address.neighborhood,
          pedido.address.city,
          pedido.address.UF,
          item.codigoProduto,
          item.tituloProduto,
          item.preco,
          item.descricao,
          item.categoriaProduto,
          item.classificacaoProduto,
          item.exibirHome,
          item.quantity,
          pedido.totalValue,
        ]);
      }
      return []; // Return empty array if no items
    }),
  ]);
 
  XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
 
  XLSX.writeFile(workbook, "orders.xlsx");
}
 
// Add an event listener to the button
const exportButton = document.getElementById("export-button");
if (exportButton) {
  exportButton.addEventListener("click", exportToExcel);
} else {
  console.log("Export button not found.");
}
