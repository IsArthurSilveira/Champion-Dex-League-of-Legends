// Variáveis globais
const searchInput = document.getElementById('searchInput');
const championListDiv = document.getElementById('champion-list');
const loadingDiv = document.getElementById('loading');
let allChampions = []; // Variável para armazenar todos os campeões
let currentVersion = ''; // Variável para armazenar a versão atual

// Função assíncrona para buscar os dados dos campeões
async function getChampions() {
    try {
        showLoading(true);
        
        // Passo 1: Obter a versão mais recente do jogo
        const versionResponse = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await versionResponse.json();
        currentVersion = versions[0]; // Pega a primeira versão, que é a mais recente

        // Passo 2: Construir a URL para o JSON dos campeões
        const language = 'pt_BR';
        const championsUrl = `https://ddragon.leagueoflegends.com/cdn/${currentVersion}/data/${language}/champion.json`;

        // Passo 3: Fazer a requisição para obter os dados dos campeões
        const championsResponse = await fetch(championsUrl);
        const championsData = await championsResponse.json();
        allChampions = Object.values(championsData.data); // Armazena todos os campeões

        // Passo 4: Exibir os campeões na página
        showLoading(false);
        displayChampions(allChampions, currentVersion);

    } catch (error) {
        console.error('Erro ao carregar os dados dos campeões:', error);
        showLoading(false);
        championListDiv.innerHTML = `
            <div class="error-message">
                <h2>Ops! Algo deu errado</h2>
                <p>Não foi possível carregar os campeões. Verifique sua conexão e tente novamente.</p>
                <button onclick="getChampions()" class="btn retry-btn">Tentar Novamente</button>
            </div>
        `;
        championListDiv.classList.remove('hidden');
    }
}

// Função para mostrar/esconder loading
function showLoading(show) {
    if (show) {
        loadingDiv.classList.remove('hidden');
        championListDiv.classList.add('hidden');
    } else {
        loadingDiv.classList.add('hidden');
        championListDiv.classList.remove('hidden');
    }
}

// Função de exibição aprimorada
function displayChampions(champions, version) {
    championListDiv.innerHTML = '';

    if (champions.length === 0) {
        championListDiv.innerHTML = `
            <div class="no-results">
                <h2>Nenhum campeão encontrado</h2>
                <p>Tente buscar por outro nome ou limpe o filtro de pesquisa.</p>
            </div>
        `;
        return;
    }

    // Adicionar contador de resultados
    const resultsCount = document.createElement('div');
    resultsCount.className = 'results-count';
    resultsCount.innerHTML = `<p>Encontrados <strong>${champions.length}</strong> campeões</p>`;
    championListDiv.appendChild(resultsCount);

    // Container para os cards
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    champions.forEach((champion, index) => {
        const championCard = document.createElement('div');
        championCard.classList.add('champion-card');
        championCard.style.animationDelay = `${index * 0.05}s`; // Animação escalonada

        // Adiciona evento de clique para navegar para a página de detalhes
        championCard.onclick = () => {
            championCard.classList.add('card-clicking');
            setTimeout(() => {
                window.location.href = `detalhes-campeao.html?champion=${champion.id}&version=${version}`;
            }, 200);
        };

        const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
        
        championCard.innerHTML = `
            <div class="card-image">
                <img src="${imageUrl}" alt="${champion.name}" loading="lazy">
                <div class="card-overlay">
                    <span class="view-details">Ver Detalhes</span>
                </div>
            </div>
            <div class="card-content">
                <h2>${champion.name}</h2>
                <p class="champion-title">${champion.title}</p>
                <div class="champion-tags">
                    ${champion.tags.map(tag => `<span class="tag">${translateTag(tag)}</span>`).join('')}
                </div>
            </div>
        `;
        cardsContainer.appendChild(championCard);
    });

    championListDiv.appendChild(cardsContainer);
}

// Função para traduzir as tags dos campeões
function translateTag(tag) {
    const translations = {
        'Fighter': 'Lutador',
        'Tank': 'Tanque',
        'Assassin': 'Assassino',
        'Mage': 'Mago',
        'Marksman': 'Atirador',
        'Support': 'Suporte'
    };
    return translations[tag] || tag;
}

// Event listener aprimorado para pesquisa
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        const filteredChampions = allChampions.filter(champion => 
            champion.name.toLowerCase().includes(searchTerm) ||
            champion.title.toLowerCase().includes(searchTerm) ||
            champion.tags.some(tag => translateTag(tag).toLowerCase().includes(searchTerm))
        );
        
        displayChampions(filteredChampions, currentVersion);
    }, 300); // Debounce de 300ms
});

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    getChampions();
});