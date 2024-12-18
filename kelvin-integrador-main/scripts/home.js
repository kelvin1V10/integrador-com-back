// Importação da base de dados e das funçoes

import { getProdId, loadProducts } from "./functions.js";

// -------- Variáveis do projeto ------------------------
const sectionNovidades = document.querySelector("#section-novidades .carrousel");
const sectionMaisVendidos = document.querySelector("#section-maisvendidos .carrousel");
const sectionPromocoes = document.querySelector("#section-promocoes .carrousel");

// Função para obter os produtos da API
async function fetchProducts() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/produtos");  // URL da sua API
        if (!response.ok) throw new Error("Não foi possível carregar os produtos.");
        
        const produtos = await response.json();

        // Filtrando os produtos conforme as categorias
        const filtroCategoriaNovidades = produtos.filter(produto => produto.classificacaoProduto === "Novidades" && produto.exibirHome == true);
        const filtroMaisVendidos = produtos.filter(produto => produto.classificacaoProduto === "Mais_Vendidos" && produto.exibirHome == true);
        const filtroPromocoes = produtos.filter(produto => produto.classificacaoProduto === "Promocoes" && produto.exibirHome == true);

        // Carregar os produtos nas seções
        loadProducts(filtroCategoriaNovidades, sectionNovidades);
        loadProducts(filtroMaisVendidos, sectionMaisVendidos);
        loadProducts(filtroPromocoes, sectionPromocoes);

    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

// Chamar a função para buscar e carregar os produtos
fetchProducts();

// Chama a função para obter o ID do produto, se necessário
getProdId();

//so essa parte de cima







// ------- carrousel de imagens home -------------------

document.querySelectorAll('.section-product').forEach( carrousel => {
const productCarousel = carrousel.querySelector('.carrousel');
const prevBtn = carrousel.querySelector('.prev');
const nextBtn = carrousel.querySelector('.next');

let scrollAmount = 0;

nextBtn.addEventListener('click', () => {
  scrollAmount += 340; // Largura do produto + margem
  if (scrollAmount > productCarousel.scrollWidth - carrousel.offsetWidth) {
    scrollAmount = productCarousel.scrollWidth - carrousel.offsetWidth;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= 340; // Largura do produto + margem
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});
})