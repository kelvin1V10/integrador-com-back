export async function loadProducts(products, load){
  /* carrega os produtos na home e na pagina de produtos */
  try {
    // Limpa o conteúdo anterior
    load.innerHTML = '';
 
    // Para cada produto na lista, cria o HTML correspondente
    products.forEach((produto) => {
      const valParcela = (produto.preco / 10).toFixed(2);
      const html = `
<div class="product-card idprod" id="${produto.codigoProduto}">
<div>
<img id="${produto.codigoProduto}"
                 src="${produto.imagemProduto.img1}"
                 alt="${produto.tituloProduto}" />
</div>
<div class="product-card-info-container">
<h2 class="product-card-title" title="${produto.tituloProduto}">
              ${produto.tituloProduto}
</h2>
<h4 class="product-card-reference">Cod. ${produto.codigoProduto}</h4>
<h3 class="product-card-price">R$ ${produto.preco}</h3>
<h4 class="product-card-installment">
              10x de R$ ${valParcela} s/juros
</h4>
</div>
<a href="./product.html">
<button id="${produto.codigoProduto}" class="product-card-btn">COMPRAR</button>
</a>
</div>`;
 
      // Adiciona o HTML gerado ao container de produtos
      load.innerHTML += html;
    });
  } catch (error) {
    console.error("Erro ao carregar os produtos: ", error);
    alert("Não foi possível carregar os produtos");
  }
}
//essa função

// captura o codigo/id do produto
// captura o codigo/id do produto
export function getProdId(){
  let itens = document.querySelectorAll(".idprod")
  console.log(itens)
  itens.forEach(item => item.addEventListener('click',(evento)=>{
      let prodID = evento.target.id
      localStorage.setItem('prodId',prodID)
  }))
}



// localiza o produto na base de dados
// localiza o produto na base de dados
export async function findProduct(productId){
  try{
    //faz a requisição à API para encontrar o produto com o código fornecido
    const response = await fetch(`http://127.0.0.1:8000/api/produtos/${productId}`);
    if(!response.ok) throw new Error("Produto não encontrado");
    //retorna o produto encontrado
    const produto = await response.json();
    console.log("Produto encontrado:", produto);
    return produto;
 
  }catch(error){
    console.error("Erro ao buscar produto: ", error);
    // alert("Produto não encontrado!");
    return null;
  }
}

 //esssa função

//carrega o produto na pagina do produto

// Função para carregar os detalhes do produto na página
export function loadProduct(produto, selecaoProduto) {
  // Verifica se os elementos existem antes de tentar acessá-los
  const productCategory = document.querySelector("#product-category");
  const productTitle = document.querySelector("#product-title");
  
  if (productCategory) {
    productCategory.innerText = produto.categoriaProduto || 'Categoria não disponível';  // Fallback caso o produto não tenha categoria
  }

  if (productTitle) {
    productTitle.children[0].innerText = `COD: ${produto.codigoProduto || 'Desconhecido'}`;  // Fallback para código
    productTitle.children[1].innerText = produto.tituloProduto || 'Título não disponível';  // Fallback para título
  }

  // Verifica se as imagens existem antes de tentar exibi-las
  const HTML = `
    <div class="product_images_container">
      <div class="images_selector">
        <i class="bi bi-chevron-double-up"></i>
        <ul>
          ${produto.imagemProduto && produto.imagemProduto.img1 ? `<li><img src="${produto.imagemProduto.img1}" alt="Imagem 1" class="product_thumb"></li>` : ''}
          ${produto.imagemProduto && produto.imagemProduto.img2 ? `<li><img src="${produto.imagemProduto.img2}" alt="Imagem 2" class="product_thumb"></li>` : ''}
          ${produto.imagemProduto && produto.imagemProduto.img3 ? `<li><img src="${produto.imagemProduto.img3}" alt="Imagem 3" class="product_thumb"></li>` : ''}
          ${produto.imagemProduto && produto.imagemProduto.img4 ? `<li><img src="${produto.imagemProduto.img4}" alt="Imagem 4" class="product_thumb"></li>` : ''}
        </ul>
        <i class="bi bi-chevron-double-down"></i>
      </div>
      <div class="images_main">
        ${produto.imagemProduto && produto.imagemProduto.img1 ? `<img src="${produto.imagemProduto.img1}" alt="Imagem principal">` : 'Imagem não disponível'}
      </div>
    </div>

    <div class="product_description_container">
      <h3 class="main-text">Descrição</h3>
      <p class="product_description">${produto.descricao || 'Descrição não disponível'}</p>
    </div>
  `;

  selecaoProduto.innerHTML = HTML;

  // Verifica se o preço e as parcelas são exibidos corretamente
  const price = document.querySelector(".product_price_container");
  if (price) {
    const parcela = (produto.preco / 10).toFixed(2);
    price.children[0].innerText = `R$ ${produto.preco.toFixed(2)}`;
    price.children[1].innerText = `Ou em até 10x sem juros de R$ ${parcela} no cartão de crédito`;
  }
}
// essa função

function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + item.preco * item.quantity, 0);
}


export function loadCartItem(cartItens,cartItensHTML){

  if(cartItens.length == [] || cartItens.length == [] ){
    cartItensHTML.innerHTML = `Seu carrinho está vazio`
  } else {
    cartItens.forEach(item => {  
      let html = `
      <div class="cart_item" id="${item.codigoProduto}">
                  <div class="cart_item_main_img">
                      <img src="${item.imagemProduto.img1}" alt="">
                  </div>
                  <div class="cart_item_info">
                      <p>${item.tituloProduto}</p>
                      <p>
                          R$ ${item.preco}
                          <span>Un.</span>
                      </p>
  
                      <h3>R$ ${(item.preco)*(item.quantity)}</h3>
                     <div class="cart_item_qtd_selector">
                      <div class="cart_item_qtd_selector_container">
                          <i class="bi bi-dash"></i>
                          <span>${item.quantity}</span>
                          <i class="bi bi-plus"></i>
                      </div>
                      <button id="${item.codigoProduto}" class="remove">remover</button>
                     </div>
                  </div>
              </div>
  `
  cartItensHTML.innerHTML += html
  })
  const total = cartTotal(cartItens);
  localStorage.setItem('totalValue', total);
  const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
  price.innerHTML = `R$ ${total.toFixed(2)}`}

  }
  


  export function removeCartItem(sacolaCompras) {
    let botaoDel = document.querySelectorAll("button.remove") /* remover produto do carrinho */
    let cartItens = document.querySelector(".grid_col_1")
    botaoDel.forEach(botao => botao.addEventListener('click', (event) => {
      let item = event.target.parentElement.parentElement.parentElement
      console.log(item)
      cartItens.removeChild(item)
      console.log(item.id)
      let index = sacolaCompras.findIndex(i => i.codigoProduto == item.id)
      console.log(index)
      sacolaCompras.splice(index, 1)
      console.log(sacolaCompras)
      localStorage.setItem('listaCompras', JSON.stringify(sacolaCompras))
  
      // Update the price element here
      const total = cartTotal(sacolaCompras);
      localStorage.setItem('totalValue', total);
      const price = document.querySelector('.total.container-flex:nth-child(1) h3:nth-child(2)');
      price.innerHTML = `R$ ${total.toFixed(2)}`;
     
    }));
  }


export function shop(pedidos){

const form = document.querySelector('#billing form');
const inputs = form.querySelectorAll('input,select');
const inputValues = {};
inputs.forEach((input) => {
  if (input.type!== 'submit' && input.type!== 'button') {
    inputValues[input.name] = input.value;
  }
});
console.log(inputValues);
const order = {
   id: pedidos.length > 0? pedidos[pedidos.length - 1].id + 1 : 1,
   address:{...inputValues},
   items: JSON.parse(localStorage.getItem("listaCompras")),
   totalValue: parseFloat(localStorage.getItem("totalValue"))
};

pedidos.push(order);
localStorage.setItem("pedidos", JSON.stringify(pedidos));;
alert("pedido realizado com sucesso")
localStorage.removeItem("listaCompras");
localStorage.removeItem("totalValue");
window.location = "./index.html"
} 