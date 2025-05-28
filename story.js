/**
 * Estrutura de dados para o livro-jogo
 * Tema: Memórias Perdidas - O protagonista recupera fragmentos de memória
 */

const storyData = {
    // Página inicial
    "start": {
        id: "start",
        title: "Memórias Fragmentadas",
        text: "Você acorda em uma cabana no meio da floresta, com uma forte dor de cabeça. Fragmentos de memória surgem como flashes: um laboratório, pessoas de jaleco, uma fuga desesperada. Você não se lembra de seu nome ou como chegou aqui. Pela janela, você vê que está anoitecendo.",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Minha cabeça... Quem sou eu? Por que não consigo lembrar? Esses flashes... parecem memórias, mas não fazem sentido."
        },
        choices: [
            {
                text: "Explorar a cabana em busca de pistas sobre sua identidade",
                nextPage: "explore_cabin"
            },
            {
                text: "Sair da cabana e investigar os arredores",
                nextPage: "outside_cabin"
            },
            {
                text: "Tentar se concentrar para recuperar mais memórias",
                nextPage: "memory_focus"
            }
        ]
    },
    
    // Explorar a cabana
    "explore_cabin": {
        id: "explore_cabin",
        title: "Pistas do Passado",
        text: "Você examina a cabana com cuidado. Em uma mesa no canto, encontra uma mochila velha, uma lanterna e um crachá de identificação danificado. No crachá, você consegue ler apenas parte de um nome: 'Dr. Alex M.' e o logo de um laboratório chamado 'Horizon'. Ao ver o nome, outro flash de memória surge: você correndo por corredores brancos, alarmes soando.",
        image: "https://images.unsplash.com/photo-1464288550599-43d5a73451b8?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Laboratório Horizon... esse nome me é familiar. Eu estava... fugindo de lá? Por quê? E quem é Dr. Alex?"
        },
        choices: [
            {
                text: "Pegar os itens e sair da cabana",
                nextPage: "take_items_leave",
                effects: {
                    addItems: ["mochila", "lanterna", "crachá danificado"],
                    modifyStats: { energy: -5 }
                }
            },
            {
                text: "Continuar procurando por mais pistas na cabana",
                nextPage: "more_cabin_search"
            }
        ]
    },
    
    // Mais busca na cabana
    "more_cabin_search": {
        id: "more_cabin_search",
        title: "Descobertas Inquietantes",
        text: "Você continua vasculhando a cabana e descobre uma tábua solta no chão. Ao removê-la, encontra um compartimento secreto contendo um diário e uma seringa vazia com resíduos de um líquido azul brilhante. O diário tem suas iniciais na capa.",
        image: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Esse diário... parece ser meu. E essa seringa... por que me parece tão familiar? O que era essa substância azul?"
        },
        choices: [
            {
                text: "Ler o diário",
                nextPage: "read_diary"
            },
            {
                text: "Examinar a seringa mais de perto",
                nextPage: "examine_syringe"
            },
            {
                text: "Pegar os itens e sair da cabana",
                nextPage: "take_all_items_leave",
                effects: {
                    addItems: ["mochila", "lanterna", "crachá danificado", "diário", "seringa vazia"],
                    modifyStats: { energy: -10 }
                }
            }
        ]
    },
    
    // Ler o diário
    "read_diary": {
        id: "read_diary",
        title: "Páginas da Memória",
        text: "Você abre o diário e reconhece sua própria letra. As primeiras páginas descrevem seu trabalho como pesquisador assistente no Laboratório Horizon, em um projeto chamado 'Mnemosyne' - um tratamento experimental para doenças da memória. A última entrada é alarmante: 'Descobri a verdade sobre o Projeto Mnemosyne. Não é uma cura, é uma arma. Preciso fugir com as provas antes que seja tarde demais.'",
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Eu era... um pesquisador? E descobri algo perigoso... É por isso que não me lembro de nada? Fizeram algo com minha memória?"
        },
        choices: [
            {
                text: "Continuar lendo o diário em busca de mais informações",
                nextPage: "read_more_diary"
            },
            {
                text: "Pegar todos os itens e sair da cabana",
                nextPage: "take_all_items_leave",
                effects: {
                    addItems: ["mochila", "lanterna", "crachá danificado", "diário", "seringa vazia"],
                    setFlags: { "leu_diario": true },
                    modifyStats: { energy: -15 }
                }
            }
        ]
    },
    
    // Examinar a seringa
    "examine_syringe": {
        id: "examine_syringe",
        title: "Substância Misteriosa",
        text: "Você examina a seringa com cuidado. Há um rótulo parcialmente rasgado com o código 'MNE-7' e o símbolo do Laboratório Horizon. Ao tocar nos resíduos azuis, uma forte dor de cabeça o atinge e você tem um flash de memória: você mesmo injetando essa substância em seu braço enquanto alarmes soam ao fundo.",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Eu... me injetei com isso? Por quê? Para esquecer algo? Ou para proteger alguma informação?"
        },
        choices: [
            {
                text: "Ler o diário para entender melhor",
                nextPage: "read_diary"
            },
            {
                text: "Pegar todos os itens e sair da cabana",
                nextPage: "take_all_items_leave",
                effects: {
                    addItems: ["mochila", "lanterna", "crachá danificado", "diário", "seringa vazia"],
                    setFlags: { "examinou_seringa": true },
                    modifyStats: { energy: -10 }
                }
            }
        ]
    },
    
    // Concentrar-se para recuperar memórias
    "memory_focus": {
        id: "memory_focus",
        title: "Fragmentos Emergentes",
        text: "Você fecha os olhos e se concentra, tentando recuperar suas memórias. Imagens surgem: um laboratório de alta tecnologia, você vestindo um jaleco branco, trabalhando com tubos de ensaio contendo um líquido azul brilhante. Um homem de terno observando seu trabalho com interesse inquietante. Então, alarmes, gritos, você correndo com algo escondido em seu bolso.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Eu era um cientista... estava trabalhando em algo perigoso... e então fugi? Roubei algo importante?"
        },
        choices: [
            {
                text: "Explorar a cabana em busca de pistas físicas",
                nextPage: "explore_cabin"
            },
            {
                text: "Sair da cabana e tentar encontrar o laboratório",
                nextPage: "outside_cabin",
                effects: {
                    setFlags: { "teve_flashback": true }
                }
            },
            {
                text: "Continuar tentando recuperar mais memórias",
                nextPage: "deeper_memory",
                effects: {
                    modifyStats: { energy: -15, health: -5 }
                }
            }
        ]
    },
    
    // Memória mais profunda
    "deeper_memory": {
        id: "deeper_memory",
        title: "A Verdade Emerge",
        text: "Você se esforça mais, ignorando a dor crescente em sua cabeça. Mais memórias surgem: seu nome é Dr. Jamie Morgan, você descobriu que o Projeto Mnemosyne estava sendo secretamente desenvolvido como uma arma para manipular memórias. Você roubou amostras e dados como prova, injetou-se com MNE-7 para proteger temporariamente suas memórias de interrogatórios e fugiu para esta cabana isolada, um local de contingência que você havia preparado.",
        image: "https://images.unsplash.com/photo-1527049979667-990f1d0d8e7f?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Dr. Jamie Morgan",
            text: "Agora me lembro... Sou Jamie Morgan. Preciso levar essas provas para o público antes que eles me encontrem. Mas o efeito do MNE-7 está passando... minhas memórias estão voltando, mas por quanto tempo?"
        },
        choices: [
            {
                text: "Procurar na cabana por mais pistas e as provas que você escondeu",
                nextPage: "search_for_evidence",
                effects: {
                    setFlags: { "recuperou_identidade": true }
                }
            },
            {
                text: "Sair imediatamente - você pode estar em perigo",
                nextPage: "urgent_escape",
                effects: {
                    setFlags: { "recuperou_identidade": true }
                }
            }
        ]
    },
    
    // Sair da cabana
    "outside_cabin": {
        id: "outside_cabin",
        title: "Floresta Desconhecida",
        text: "Você sai da cabana e se vê em uma pequena clareira. A floresta ao redor é densa e parcialmente familiar, como se já tivesse estado aqui antes. Ao norte, você nota marcas de pneus recentes. Ao sul, há uma trilha que desce a montanha.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Você",
            text: "Essas marcas de pneus... alguém esteve aqui recentemente. Estão me procurando? E essa trilha... para onde leva?"
        },
        choices: [
            {
                text: "Seguir as marcas de pneus ao norte",
                nextPage: "follow_tracks"
            },
            {
                text: "Descer pela trilha ao sul",
                nextPage: "south_trail"
            },
            {
                text: "Voltar para dentro da cabana",
                nextPage: "start"
            }
        ]
    },
    
    // Seguir as marcas de pneus
    "follow_tracks": {
        id: "follow_tracks",
        title: "Perseguição Perigosa",
        text: "Você segue as marcas de pneus por cerca de quinze minutos. Elas levam a uma estrada de terra onde você vê um jipe preto estacionado entre as árvores. O veículo tem o logo do Laboratório Horizon na porta. Você ouve vozes se aproximando.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Voz Masculina Distante",
            text: "...deve estar por perto. O rastreador indica que o sinal está vindo desta área. Encontre Morgan e a seringa a qualquer custo."
        },
        choices: [
            {
                text: "Esconder-se e observar os homens",
                nextPage: "hide_and_observe"
            },
            {
                text: "Fugir silenciosamente de volta para a cabana",
                nextPage: "sneak_back",
                effects: {
                    modifyStats: { energy: -10 }
                }
            },
            {
                text: "Tentar roubar o jipe",
                nextPage: "steal_jeep",
                condition: { minStat: { energy: 60 } }
            }
        ]
    },
    
    // Trilha ao sul
    "south_trail": {
        id: "south_trail",
        title: "Descendo a Montanha",
        text: "Você segue a trilha que desce a montanha. Conforme avança, a vegetação muda e a trilha se torna mais definida. Após cerca de meia hora de caminhada, você avista um pequeno vilarejo no vale abaixo. Outro flash de memória: você dirigindo até este vilarejo, comprando suprimentos, preparando-se para um isolamento prolongado.",
        image: "https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Você",
            text: "Esse vilarejo... eu estive aqui antes. Planejei tudo isso? Me esconder na montanha?"
        },
        choices: [
            {
                text: "Continuar descendo em direção ao vilarejo",
                nextPage: "approach_village"
            },
            {
                text: "Voltar para a cabana para procurar mais pistas",
                nextPage: "return_to_cabin",
                effects: {
                    modifyStats: { energy: -15 }
                }
            }
        ]
    },
    
    // Pegar itens e sair
    "take_items_leave": {
        id: "take_items_leave",
        title: "Preparando-se para Partir",
        text: "Você coloca os itens na mochila e a coloca nas costas. O crachá danificado parece importante - talvez seja a chave para descobrir sua identidade. Com a lanterna em mãos, você se sente mais preparado para enfrentar o desconhecido.",
        image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Preciso descobrir quem sou e o que aconteceu no Laboratório Horizon. Essas memórias fragmentadas... há algo importante que estou esquecendo."
        },
        choices: [
            {
                text: "Sair da cabana e explorar os arredores",
                nextPage: "outside_cabin_with_items"
            }
        ]
    },
    
    // Pegar todos os itens e sair
    "take_all_items_leave": {
        id: "take_all_items_leave",
        title: "Evidências Coletadas",
        text: "Você guarda cuidadosamente todos os itens encontrados na mochila. O diário, a seringa vazia, o crachá danificado - todas são peças de um quebra-cabeça que você precisa montar para recuperar sua identidade e entender por que está fugindo.",
        image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Você",
            text: "Cada item conta uma parte da história. Preciso descobrir o resto antes que seja tarde demais... antes que me encontrem."
        },
        choices: [
            {
                text: "Sair da cabana e explorar os arredores",
                nextPage: "outside_cabin_with_items"
            }
        ]
    },
    
    // Sair da cabana com itens
    "outside_cabin_with_items": {
        id: "outside_cabin_with_items",
        title: "Decisões na Floresta",
        text: "Você sai da cabana, agora equipado com os itens que encontrou. A floresta parece menos ameaçadora, mas você sente que não está seguro aqui. Ao norte, você nota marcas recentes de pneus. Ao sul, há uma trilha que desce a montanha.",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Você",
            text: "Alguém esteve aqui recentemente... Estão me procurando? Preciso decidir para onde ir."
        },
        choices: [
            {
                text: "Seguir as marcas de pneus ao norte",
                nextPage: "follow_tracks"
            },
            {
                text: "Descer pela trilha ao sul",
                nextPage: "south_trail"
            },
            {
                text: "Examinar o diário mais detalhadamente",
                nextPage: "examine_diary_outside",
                condition: { hasItem: "diário" }
            }
        ]
    },
    
    // Ler mais do diário
    "read_more_diary": {
        id: "read_more_diary",
        title: "Segredos Revelados",
        text: "Você continua lendo o diário e descobre mais detalhes. Seu nome é Dr. Jamie Morgan, e você era parte de uma equipe desenvolvendo o Projeto Mnemosyne, supostamente uma cura para Alzheimer. Porém, você descobriu que o verdadeiro objetivo era criar uma droga que pudesse apagar ou manipular memórias específicas - uma arma potencial para espionagem e controle mental. Você roubou amostras e dados como prova e fugiu.",
        image: "https://images.unsplash.com/photo-1476370648495-3533f64427a2?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Dr. Jamie Morgan",
            text: "Agora me lembro... Injetei-me com MNE-7 para proteger temporariamente minhas memórias caso fosse capturado. O efeito deve estar passando agora..."
        },
        choices: [
            {
                text: "Procurar na cabana pelas provas que você escondeu",
                nextPage: "search_for_evidence",
                effects: {
                    setFlags: { "recuperou_identidade": true }
                }
            },
            {
                text: "Sair da cabana imediatamente - você pode estar em perigo",
                nextPage: "urgent_escape",
                effects: {
                    setFlags: { "recuperou_identidade": true }
                }
            }
        ]
    },
    
    // Procurar pelas provas
    "search_for_evidence": {
        id: "search_for_evidence",
        title: "A Prova Final",
        text: "Com sua memória parcialmente restaurada, você se lembra de um esconderijo secreto. Você remove uma tábua solta perto da lareira e encontra um drive USB selado em um recipiente à prova d'água. Nele estão todos os dados do Projeto Mnemosyne, incluindo vídeos de experimentos não éticos e memorandos confidenciais sobre seu uso militar planejado.",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1000",
        environment: "cabin",
        dialog: {
            character: "Dr. Jamie Morgan",
            text: "Aqui está! A prova que preciso para expor tudo. Agora preciso chegar a um lugar seguro e tornar isso público."
        },
        choices: [
            {
                text: "Sair pela trilha ao sul em direção ao vilarejo",
                nextPage: "escape_to_village",
                effects: {
                    addItems: ["drive USB"],
                    modifyStats: { energy: -10 }
                }
            },
            {
                text: "Esconder-se na cabana e esperar a noite para fugir",
                nextPage: "hide_until_night",
                effects: {
                    addItems: ["drive USB"]
                }
            }
        ]
    },
    
    // Fuga urgente
    "urgent_escape": {
        id: "urgent_escape",
        title: "Fuga Desesperada",
        text: "Suas memórias continuam voltando, e você se lembra que o Laboratório Horizon tem equipes de busca. Eles provavelmente já estão rastreando você. Sem perder tempo, você pega seus pertences e sai da cabana. No momento em que você chega à clareira, ouve o som distante de um helicóptero se aproximando.",
        image: "https://images.unsplash.com/photo-1495527400402-3a1e68360675?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Dr. Jamie Morgan",
            text: "Eles estão vindo! Preciso encontrar as provas e desaparecer antes que me capturem."
        },
        choices: [
            {
                text: "Correr de volta para a cabana e procurar rapidamente pelas provas",
                nextPage: "quick_search_evidence",
                effects: {
                    modifyStats: { energy: -20, health: -10 }
                }
            },
            {
                text: "Fugir imediatamente pela trilha ao sul",
                nextPage: "desperate_escape_south",
                effects: {
                    modifyStats: { energy: -15 }
                }
            },
            {
                text: "Esconder-se na floresta densa",
                nextPage: "hide_in_forest",
                effects: {
                    modifyStats: { energy: -10 }
                }
            }
        ]
    },
    
    // Exemplo de página final
    "game_over": {
        id: "game_over",
        title: "Memórias Restauradas",
        text: "Você conseguiu escapar com as provas do Projeto Mnemosyne e encontrar um jornalista confiável para expor a verdade. O Laboratório Horizon foi investigado, e os responsáveis enfrentarão a justiça. Suas memórias foram completamente restauradas, embora algumas cicatrizes mentais permaneçam. Agora, com uma nova identidade, você pode finalmente começar uma nova vida, sabendo que fez a coisa certa.",
        image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&q=80&w=1000",
        environment: "forest",
        dialog: {
            character: "Dr. Jamie Morgan",
            text: "Finalmente livre... A verdade veio à tona, e posso seguir em frente. Algumas memórias são melhor deixadas para trás, mas nunca devemos esquecer por que lutamos."
        },
        choices: [
            {
                text: "Jogar novamente",
                nextPage: "start"
            }
        ]
    }
};

// Exportar os dados da história para uso no game.js
const story = {
    data: storyData,
    startPage: "start"
};
