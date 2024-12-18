
import { getProdId, loadProducts } from "./functions.js";

// -------- Variáveis do projeto ------------------------
const sectionProducts = document.querySelector(".section-product-grid");

// Função para buscar os produtos da API
async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/produtos');  // URL da sua API
        if (!response.ok) throw new Error("Erro ao carregar os produtos.");

        const produtos = await response.json();  // Converte a resposta em JSON
        loadProducts(produtos, sectionProducts);  // Carregar os produtos na página
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        alert("Não foi possível carregar os produtos.");
    }
}

// Chamar a função para obter os produtos e carregá-los na página
fetchProducts();

getProdId();


//joga tudo
