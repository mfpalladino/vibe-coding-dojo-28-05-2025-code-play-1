/**
 * Livro Jogo - Lógica principal do jogo
 */

// Estado do jogador
const player = {
    currentPage: null,
    inventory: [],
    stats: {
        health: 100,
        energy: 100
    },
    visitedPages: [],
    flags: {} // Para armazenar decisões ou eventos importantes
};

// Elementos do DOM
const storyTextElement = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices-container');
const titleElement = document.getElementById('title');
const playerStatsElement = document.getElementById('player-stats');
const inventoryElement = document.getElementById('inventory');
const imageContainer = document.getElementById('image-container');
const startButton = document.getElementById('start-button');

// Inicializar o jogo
function initGame() {
    // Configurar evento para o botão inicial
    startButton.addEventListener('click', () => {
        // Adicionar efeito de fade-out ao botão
        startButton.classList.add('fade-out');
        
        // Esperar a animação terminar antes de navegar
        setTimeout(() => {
            navigateToPage(story.startPage);
        }, 300);
    });
    
    // Exibir estatísticas iniciais
    updatePlayerStats();
    updateInventory();
    
    // Adicionar classe de fade-in ao container principal
    document.querySelector('.container').classList.add('fade-in');
}

// Navegar para uma página específica
function navigateToPage(pageId) {
    // Obter dados da página
    const page = story.data[pageId];
    
    if (!page) {
        console.error(`Página não encontrada: ${pageId}`);
        return;
    }
    
    // Atualizar estado do jogador
    player.currentPage = pageId;
    if (!player.visitedPages.includes(pageId)) {
        player.visitedPages.push(pageId);
    }
    
    // Aplicar efeitos da página, se houver
    if (page.effects) {
        applyPageEffects(page.effects);
    }
    
    // Adicionar efeito de fade-out ao conteúdo atual
    const mainContent = document.querySelector('main');
    mainContent.classList.add('fade-out');
    
    // Esperar a animação terminar antes de atualizar o conteúdo
    setTimeout(() => {
        // Atualizar título
        titleElement.textContent = page.title || 'Livro Jogo';
        
        // Atualizar texto da história com efeito de digitação
        storyTextElement.innerHTML = '';
        typeWriterEffect(storyTextElement, page.text, 10);
        
        // Exibir imagem, se houver
        updateImage(page);
        
        // Exibir diálogo, se houver
        if (page.dialog) {
            addDialogBox(page.dialog);
        }
        
        // Gerar botões de escolha
        renderChoices(page.choices);
        
        // Atualizar estatísticas e inventário
        updatePlayerStats();
        updateInventory();
        
        // Remover classe de fade-out e adicionar fade-in
        mainContent.classList.remove('fade-out');
        mainContent.classList.add('fade-in');
        
        // Remover a classe fade-in após a animação
        setTimeout(() => {
            mainContent.classList.remove('fade-in');
        }, 800);
    }, 300);
    
    // Rolar para o topo da página
    window.scrollTo(0, 0);
}

// Efeito de digitação para o texto
function typeWriterEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Atualizar a imagem da página
function updateImage(page) {
    imageContainer.innerHTML = '';
    
    if (page.image) {
        const img = document.createElement('img');
        img.src = page.image;
        img.alt = page.title || 'Imagem da história';
        img.className = 'story-image';
        imageContainer.appendChild(img);
    }
}

// Adicionar caixa de diálogo
function addDialogBox(dialogData) {
    const dialogBox = document.createElement('div');
    dialogBox.className = 'dialog-box';
    
    const characterName = document.createElement('div');
    characterName.className = 'character-name';
    characterName.textContent = dialogData.character;
    
    const dialogText = document.createElement('div');
    dialogText.textContent = dialogData.text;
    
    dialogBox.appendChild(characterName);
    dialogBox.appendChild(dialogText);
    
    // Inserir após o texto da história
    storyTextElement.parentNode.insertBefore(dialogBox, storyTextElement.nextSibling);
}

// Renderizar as escolhas disponíveis
function renderChoices(choices) {
    // Limpar escolhas anteriores
    choicesContainer.innerHTML = '';
    
    // Adicionar atraso para as escolhas aparecerem após o texto
    setTimeout(() => {
        // Criar botão para cada escolha
        choices.forEach((choice, index) => {
            // Verificar se a escolha deve ser exibida (baseado em condições)
            if (choice.condition && !evaluateCondition(choice.condition)) {
                return; // Pular esta escolha se a condição não for atendida
            }
            
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.style.animationDelay = `${index * 0.2}s`;
            button.textContent = choice.text;
            
            button.addEventListener('click', () => {
                navigateToPage(choice.nextPage);
            });
            
            choicesContainer.appendChild(button);
        });
    }, 1000); // Esperar 1 segundo após o texto começar a ser exibido
}

// Avaliar condições para exibição de escolhas
function evaluateCondition(condition) {
    // Exemplos de condições:
    // { hasItem: "lanterna" }
    // { flag: "falou_com_guarda" }
    // { minStat: { health: 50 } }
    
    if (condition.hasItem) {
        return player.inventory.includes(condition.hasItem);
    }
    
    if (condition.flag) {
        return player.flags[condition.flag] === true;
    }
    
    if (condition.minStat) {
        const statName = Object.keys(condition.minStat)[0];
        return player.stats[statName] >= condition.minStat[statName];
    }
    
    return true; // Se não houver condição específica, retorna verdadeiro
}

// Aplicar efeitos ao chegar em uma página
function applyPageEffects(effects) {
    // Adicionar itens ao inventário
    if (effects.addItems) {
        effects.addItems.forEach(item => {
            if (!player.inventory.includes(item)) {
                player.inventory.push(item);
                
                // Mostrar notificação de item adquirido
                showNotification(`Item adquirido: ${item}`);
            }
        });
    }
    
    // Remover itens do inventário
    if (effects.removeItems) {
        effects.removeItems.forEach(item => {
            const index = player.inventory.indexOf(item);
            if (index !== -1) {
                player.inventory.splice(index, 1);
                showNotification(`Item removido: ${item}`);
            }
        });
    }
    
    // Modificar estatísticas
    if (effects.modifyStats) {
        Object.keys(effects.modifyStats).forEach(stat => {
            const oldValue = player.stats[stat];
            player.stats[stat] += effects.modifyStats[stat];
            
            // Garantir que as estatísticas não fiquem negativas ou excedam 100
            player.stats[stat] = Math.max(0, Math.min(100, player.stats[stat]));
            
            // Mostrar notificação se houver mudança significativa
            const change = player.stats[stat] - oldValue;
            if (Math.abs(change) >= 10) {
                const changeText = change > 0 ? `+${change}` : change;
                showNotification(`${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${changeText}`);
            }
        });
    }
    
    // Definir flags
    if (effects.setFlags) {
        Object.keys(effects.setFlags).forEach(flag => {
            player.flags[flag] = effects.setFlags[flag];
        });
    }
}

// Mostrar notificação temporária
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após alguns segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Atualizar exibição das estatísticas do jogador
function updatePlayerStats() {
    playerStatsElement.innerHTML = `
        <div>
            <span><i class="fas fa-heart"></i> Saúde:</span>
            <div class="stat-bar">
                <div class="stat-fill health-fill" style="width: ${player.stats.health}%"></div>
            </div>
        </div>
        <div>
            <span><i class="fas fa-bolt"></i> Energia:</span>
            <div class="stat-bar">
                <div class="stat-fill energy-fill" style="width: ${player.stats.energy}%"></div>
            </div>
        </div>
    `;
}

// Atualizar exibição do inventário
function updateInventory() {
    if (player.inventory.length === 0) {
        inventoryElement.innerHTML = '<div><i class="fas fa-backpack"></i> Inventário vazio</div>';
        return;
    }
    
    inventoryElement.innerHTML = '<div><i class="fas fa-sack"></i> Inventário: </div>';
    
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'inventory-items';
    
    player.inventory.forEach(item => {
        const itemElement = document.createElement('span');
        itemElement.className = 'inventory-item';
        itemElement.textContent = item;
        itemsContainer.appendChild(itemElement);
    });
    
    inventoryElement.appendChild(itemsContainer);
}

// Iniciar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos adicionais
    addExtraStyles();
    
    // Inicializar o jogo
    initGame();
});

// Adicionar estilos CSS adicionais dinamicamente
function addExtraStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Animações adicionais */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        .fade-in {
            animation: fadeIn 0.8s ease forwards;
        }
        
        .fade-out {
            animation: fadeOut 0.5s ease forwards;
        }
        
        /* Notificações */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            border-left: 4px solid #ff9800;
            transform: translateX(120%);
            transition: transform 0.5s ease;
            z-index: 1000;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    document.head.appendChild(styleElement);
}
