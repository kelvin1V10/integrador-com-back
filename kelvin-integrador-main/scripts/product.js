import { findProduct, loadProduct } from "./functions.js";
 
let id = localStorage.getItem("prodId");
let listaCompras = JSON.parse(localStorage.getItem("listaCompras"));
 
if (listaCompras == null || listaCompras.length == 0) {
  listaCompras = [];
}
 
//aguarda o produto ser encontrado
async function carregarProduto() {
  let produto = await findProduct(id);
  if (produto) {
    let selecaoProduto = document.querySelector(".grid_col_1");
    loadProduct(produto, selecaoProduto);
    let botaoComprar = document.querySelector(
      ".product_price_container button"
    );
 
    botaoComprar.addEventListener("click", () => {
      let quantity = parseInt(document.querySelector("#quantity").value);
      produto.quantity = quantity;
      listaCompras.push(produto);
      alert("Produto adicionado com sucesso!");
      localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
      console.log(listaCompras);
      window.location = "./checkout.html";
    });
  }else{
    alert("Produto não encontrado!")
    // window.location = "./index.html";
  }
}
 
//chama a função para carregar o produto
carregarProduto()