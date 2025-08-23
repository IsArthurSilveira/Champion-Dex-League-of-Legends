// ===== CONFIGURAÇÕES E UTILITÁRIOS =====
const CONFIG = {
    API_BASE: 'https://ddragon.leagueoflegends.com/cdn',
    SPLASH_BASE: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash',
    SCROLL_AMOUNT: 320
};

const ELEMENTS = {
    loading: () => document.getElementById('loading-state'),
    error: () => document.getElementById('error-state'),
    content: () => document.getElementById('champion-content'),
    errorTitle: () => document.getElementById('error-title'),
    errorMessage: () => document.getElementById('error-message')
};

const TAGS_TRANSLATION = {
    'Fighter': 'Lutador',
    'Tank': 'Tanque',
    'Assassin': 'Assassino',
    'Mage': 'Mago',
    'Marksman': 'Atirador',
    'Support': 'Suporte'
};

// ===== VARIÁVEIS GLOBAIS PARA HABILIDADES =====
let championAbilities = {
    passive: null,
    q: null,
    w: null,
    e: null,
    r: null
};

// ===== FUNÇÕES UTILITÁRIAS =====
const getUrlParameter = (name) => {
    const regex = new RegExp(`[\\?&]${name.replace(/[\[\]]/g, '\\$&')}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
};

// Função para limpar e processar HTML das descrições
const cleanHtmlDescription = (htmlText) => {
    if (!htmlText) return '';
    
    return htmlText
        // Converter <br> para quebra de linha
        .replace(/<br\s*\/?>/gi, '\n')
        // Remover tags HTML mas manter o conteúdo
        .replace(/<[^>]*>/g, '')
        // Limpar entidades HTML comuns
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        // Limpar espaços excessivos
        .replace(/\s+/g, ' ')
        .trim();
};

const translateTag = (tag) => TAGS_TRANSLATION[tag] || tag;

const showState = (state) => {
    const states = ['loading', 'error', 'content'];
    states.forEach(s => ELEMENTS[s]()?.classList.toggle('hidden', s !== state));
};

const setElementContent = (id, content, attribute = 'textContent') => {
    const element = document.getElementById(id);
    if (element) element[attribute] = content;
};

const setElementAttribute = (id, attribute, value) => {
    const element = document.getElementById(id);
    if (element) element.setAttribute(attribute, value);
};

// ===== FUNÇÕES PRINCIPAIS =====
function goBackToList() {
    window.history.back();
}

function scrollSkins(direction) {
    const carousel = document.getElementById('skinsCarousel');
    const scrollAmount = direction === 'next' ? CONFIG.SCROLL_AMOUNT : -CONFIG.SCROLL_AMOUNT;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

async function loadChampionDetails() {
    const championId = getUrlParameter('champion');
    const version = getUrlParameter('version');
    
    // Validação dos parâmetros
    if (!championId || !version) {
        showError('❌ Campeão não encontrado', 'Os parâmetros da URL estão incorretos ou ausentes.');
        return;
    }

    showState('loading');

    try {
        const data = await fetchChampionData(championId, version);
        const championData = Object.values(data.data)[0];
        
        document.title = `${championData.name} - Champion Dex`;
        populateChampionData(championData, championId, version);
        showState('content');
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do campeão:', error);
        showError('⚠️ Erro ao carregar', 'Não foi possível carregar os detalhes do campeão. Verifique sua conexão.');
    }
}

async function fetchChampionData(championId, version) {
    const url = `${CONFIG.API_BASE}/${version}/data/pt_BR/champion/${championId}.json`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

function showError(title, message) {
    setElementContent('error-title', title);
    setElementContent('error-message', message);
    showState('error');
}

function populateChampionData(data, championId, version) {
    // Header Information
    setElementContent('champion-name', data.name);
    setElementContent('champion-title', data.title);
    setElementContent('champion-lore', data.lore);
    
    // Splash Image
    setElementAttribute('champion-splash', 'src', `${CONFIG.SPLASH_BASE}/${championId}_0.jpg`);
    setElementAttribute('champion-splash', 'alt', `${data.name} splash`);
    
    // Tags
    populateTags(data.tags);
    
    // Abilities
    populatePassive(data.passive, version);
    populateSpells(data.spells, version);
    
    // Skins
    populateSkins(data.skins, championId);
}

function populateTags(tags) {
    const container = document.getElementById('champion-tags');
    container.innerHTML = tags
        .map(tag => `<span class="tag">${translateTag(tag)}</span>`)
        .join('');
}

function populatePassive(passive, version) {
    // Armazenar dados da passiva para o modal
    championAbilities.passive = {
        name: passive.name,
        description: cleanHtmlDescription(passive.description),
        image: `${CONFIG.API_BASE}/${version}/img/passive/${passive.image.full}`,
        key: 'P'
    };
    
    setElementContent('passive-name', passive.name);
    setElementAttribute('passive-icon', 'src', `${CONFIG.API_BASE}/${version}/img/passive/${passive.image.full}`);
    setElementAttribute('passive-icon', 'alt', passive.name);
}

function populateSpells(spells, version) {
    const abilities = ['q', 'w', 'e', 'r'];
    
    spells.forEach((spell, index) => {
        const key = abilities[index];
        
        // Armazenar dados da habilidade para o modal
        championAbilities[key] = {
            name: spell.name,
            description: cleanHtmlDescription(spell.description),
            image: `${CONFIG.API_BASE}/${version}/img/spell/${spell.image.full}`,
            key: key.toUpperCase(),
            cooldown: spell.cooldownBurn || 'N/A',
            cost: spell.costBurn || 'N/A',
            range: spell.rangeBurn || 'N/A'
        };
        
        setElementContent(`${key}-name`, spell.name);
        setElementAttribute(`${key}-icon`, 'src', `${CONFIG.API_BASE}/${version}/img/spell/${spell.image.full}`);
        setElementAttribute(`${key}-icon`, 'alt', spell.name);
    });
}

function populateSkins(skins, championId) {
    const container = document.getElementById('skinsCarousel');
    container.innerHTML = skins
        .map(skin => `
            <div class="skin-card">
                <img src="${CONFIG.SPLASH_BASE}/${championId}_${skin.num}.jpg" 
                     alt="${skin.name}" loading="lazy">
                <div class="skin-info">
                    <h4>${skin.name === 'default' ? 'Clássica' : skin.name}</h4>
                </div>
            </div>
        `)
        .join('');
}

// ===== FUNÇÕES DO MODAL DE HABILIDADES =====
function showAbilityModal(abilityKey) {
    const ability = championAbilities[abilityKey];
    if (!ability) return;
    
    const modal = document.getElementById('abilityModal');
    
    // Preencher dados do modal
    document.getElementById('modal-ability-name').textContent = ability.name;
    
    // Processar descrição com quebras de linha
    const descriptionElement = document.getElementById('modal-ability-description');
    const cleanDescription = ability.description;
    
    // Se há quebras de linha, criar parágrafos separados
    if (cleanDescription.includes('\n')) {
        const paragraphs = cleanDescription.split('\n').filter(p => p.trim());
        descriptionElement.innerHTML = paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
    } else {
        descriptionElement.textContent = cleanDescription;
    }
    
    document.getElementById('modal-ability-image').src = ability.image;
    document.getElementById('modal-ability-image').alt = ability.name;
    document.getElementById('modal-ability-key').textContent = ability.key;
    
    // Preencher estatísticas (apenas para habilidades não-passivas)
    const statsContainer = document.getElementById('modal-ability-stats');
    if (abilityKey === 'passive') {
        statsContainer.style.display = 'none';
    } else {
        statsContainer.style.display = 'flex';
        document.getElementById('modal-cooldown').textContent = ability.cooldown;
        document.getElementById('modal-cost').textContent = ability.cost;
        document.getElementById('modal-range').textContent = ability.range;
    }
    
    // Mostrar modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAbilityModal() {
    const modal = document.getElementById('abilityModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAbilityModal();
    }
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', loadChampionDetails);
