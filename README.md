# 🏆 Champion Dex - League of Legends

[![Deploy on Vercel](https://vercel.com/button)](https://champion-dex-lol.vercel.app/)

## 📖 Sobre o Projeto

**Champion Dex** é uma aplicação web moderna e interativa que permite explorar todos os campeões do League of Legends. Com uma interface elegante e responsiva, os usuários podem navegar, pesquisar e descobrir informações detalhadas sobre cada campeão.

### 🎯 História do Projeto

Este projeto começou como um **hobby pessoal** que eu estava desenvolvendo na minha máquina por diversão, aprendendo desenvolvimento web aos poucos e experimentando com diferentes tecnologias. O código ficou guardado localmente por um tempo, sem estar no GitHub.

Quando meu **professor da faculdade passou um desafio** de criar um webapp que se conectasse com uma API e fizesse deploy, eu decidi **finalizar e aprimorar** este projeto que já estava em andamento. Foi a oportunidade perfeita para aplicar conceitos acadêmicos em algo que eu já estava construindo com paixão!

O resultado é uma aplicação completa que combina **aprendizado prático**, **criatividade pessoal** e **requisitos acadêmicos** em um projeto do qual tenho muito orgulho.

### ✨ Funcionalidades

- 🔍 **Pesquisa Inteligente**: Busque campeões por nome ou função
- 📱 **Design Responsivo**: Experiência perfeita em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Design clean com tema escuro e acentos dourados
- ⚡ **Performance Otimizada**: Carregamento rápido e animações suaves
- 🎮 **Detalhes Completos**: Informações abrangentes sobre cada campeão
- 🔥 **Habilidades Interativas**: Modal com detalhes das habilidades
- 🖼️ **Galeria de Skins**: Carrossel interativo com todas as skins dos campeões

## 🚀 Demonstração

### Página Principal
- Lista de campeões em grid responsivo
- Sistema de busca em tempo real
- Cards animados com hover effects
- Loading state elegante

### Página de Detalhes
- Splash art em alta qualidade
- Habilidades em layout compacto com modal
- Galeria de skins com navegação
- Tags de função do campeão

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: 
  - CSS Grid e Flexbox
  - CSS Variables (Custom Properties)
  - Animações e transições suaves
  - Media queries para responsividade
- **JavaScript (ES6+)**:
  - Fetch API para requisições
  - Async/await
  - DOM manipulation
  - Event handling
- **API**: League of Legends Data Dragon API
- **Fonts**: Google Fonts (Inter)

## 📁 Estrutura do Projeto

```
ProjetoLeagueOfLegends/
├── 📁 src/                      # Código fonte organizado
│   ├── index.html               # Página principal da aplicação
│   ├── 📁 pages/               # Páginas da aplicação
│   │   └── champion-details.html  # Página de detalhes do campeão
│   │
│   ├── 📁 styles/              # Folhas de estilo modulares
│   │   ├── base.css            # CSS base (variáveis, reset, componentes)
│   │   ├── index.css           # Estilos da página principal
│   │   └── details.css         # Estilos da página de detalhes
│   │
│   └── 📁 scripts/             # Scripts JavaScript
│       ├── script.js           # Lógica da página principal
│       └── champion-details.js # Lógica da página de detalhes
│
└──  📄 README.md                 # Documentação do projeto
```

## 🎨 Design System

### Cores
- **Primária**: `#ffd700` (Dourado)
- **Background**: `#0c0c0c` (Preto)
- **Cards**: `#1b1b1b` / `#2b2b2b` (Gradientes escuros)
- **Texto**: `#eee` (Claro) / `#ccc` (Secundário)
- **Bordas**: `#333` (Sutil)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Pesos**: 400, 600, 700

### Responsividade
- **Desktop**: > 768px
- **Tablet**: ≤ 768px
- **Mobile**: ≤ 480px
- **Mobile Small**: ≤ 360px

## 🚀 Como Executar

### Localmente
1. Clone o repositório
2. Abra o arquivo `public/index.html` em um navegador
3. Ou use um servidor local:
   ```bash
   npm install
   npm run dev
   ```

### Deploy no Vercel

Se quiser fazer seu próprio deploy:
1. Faça fork ou clone este repositório
2. Conecte sua conta GitHub ao Vercel
3. Importe o projeto no Vercel
4. Deploy automático será realizado

### Arquitetura Modular
- **Separação de Responsabilidades**: Cada tipo de arquivo em sua pasta
- **CSS Modular**: Estilos organizados por funcionalidade
- **JavaScript Organizado**: Scripts separados por página
- **Deploy Otimizado**: Configuração específica para Vercel

## 📱 Recursos Mobile

- **Layout Adaptativo**: Habilidades sempre visíveis (5 em linha)
- **Touch Friendly**: Botões e cards otimizados para toque
- **Performance**: Imagens otimizadas e lazy loading
- **Navegação**: Smooth scroll e transições suaves

## 🔧 Funcionalidades Técnicas

### Habilidades Compactas
- Layout em flexbox com scroll horizontal quando necessário
- Cálculo dinâmico de largura: `calc((100vw - padding) / 5 - gap)`
- Modal interativo com informações detalhadas

### Sistema de Busca
- Debounce para otimizar performance
- Busca por nome e tags de função
- Tradução automática de tags (EN → PT)

### Navegação
- SPA (Single Page Application) com parâmetros de URL
- Histórico do navegador preservado
- Estados de loading e erro

## 🌟 Melhorias Futuras

- [ ] Filtros avançados (função, dificuldade, etc.)
- [ ] Favoritos salvos no localStorage
- [ ] Comparação entre campeões
- [ ] Busca por voz
- [ ] PWA (Progressive Web App)
- [ ] Modo claro/escuro
- [ ] Internacionalização (i18n)

## 📄 API Utilizada

Este projeto utiliza a **Riot Games API** através do serviço **Data Dragon**:
- **Champion Data**: `https://ddragon.leagueoflegends.com/cdn/{version}/data/pt_BR/champion.json`
- **Champion Details**: `https://ddragon.leagueoflegends.com/cdn/{version}/data/pt_BR/champion/{championName}.json`
- **Images**: Splash arts, ícones de habilidades e skins

## 👨‍💻 Autor

**Arthur Silveira**
- Projeto desenvolvido como demonstração de habilidades em desenvolvimento web
- Iniciado como hobby pessoal e finalizado para projeto acadêmico
- Foco em design moderno, responsividade e experiência do usuário
- Combinação de aprendizado autodidata e aplicação de conceitos acadêmicos

### 💡 Motivação
Este projeto representa a evolução do meu aprendizado em desenvolvimento web - do que começou como experimentos casuais em casa até se tornar uma aplicação completa e profissional. A tarefa acadêmica foi o empurrão que precisava para finalizar e polir algo que já estava desenvolvendo por paixão!

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT. Sinta-se livre para usar, modificar e distribuir.

## 🙏 Agradecimentos

 - **Riot Games** pela API oficial do League of Legends
 - **Google Fonts** pela fonte Inter
 - **Comunidade** de desenvolvedores que inspiraram este projeto
 - **Professor Geraldo Gomes da Cruz Junior** por propor este desafio acadêmico, que foi fundamental para a finalização e aprimoramento deste projeto!

---

⭐ Se você gostou deste projeto, considere dar uma estrela no repositório!

🐛 Encontrou algum bug? Abra uma issue ou envie um pull request!
