import type { TutorialSlide } from "@/types/tutorial-type";

export const tutorialSlides: TutorialSlide[] = [
  {
    id: 1,
    title: "Visão Geral do Tabuleiro",
    image: "/assets/images/img-board.jpg",
    description:
      "O tabuleiro é composto por casas de propriedade, casas de Sorte ou Revés e casas especiais nos cantos. Cada jogador percorre o tabuleiro respondendo perguntas sobre IHC para adquirir propriedades e acumular dinheiro.",
  },
  {
    id: 2,
    title: "As Cores dos Cards",
    image: "/assets/images/img-color-cards.jpg",
    description:
      "Cada card possui uma barra colorida no topo que indica o nível de dificuldade da pergunta: Verde = Fácil, Laranja = Fácil-Médio, Azul = Médio e Vermelho = Difícil. Quanto mais difícil, maior o aluguel da propriedade.",
  },
  {
    id: 3,
    title: "Entendendo o Card de Propriedade",
    image: "/assets/images/img-card.jpg",
    description:
      "O título do card indica o tópico de IHC da pergunta (ex: Usabilidade, Acessibilidade, Design de Interface). O valor exibido com o ícone '$' representa o aluguel que outros jogadores pagarão ao dono quando caírem nessa casa.",
  },
  {
    id: 4,
    title: "Casinha do Proprietário",
    image: "/assets/images/img-property.jpg",
    description:
      "Quando um jogador conquista uma propriedade, uma casinha na cor do jogador aparece sobre o card. Isso indica que aquela propriedade já tem dono e outros jogadores terão que pagar aluguel ao cair nela.",
  },
  {
    id: 5,
    title: "Adquirindo Propriedades",
    image: "/assets/images/img-choice.jpg",
    description:
      "Ao cair em uma propriedade sem dono, você pode escolher 'Responder' ou 'Ignorar'. Responder tem um custo em dinheiro que varia pela dificuldade (Fácil: $15, Fácil-Médio: $25, Médio: $35, Difícil: $50). Se acertar, a propriedade é sua!",
  },
  {
    id: 6,
    title: "Respondendo Perguntas",
    image: "/assets/images/img-question.jpg",
    description:
      "As perguntas são de múltipla escolha sobre temas de IHC. Você tem 60 segundos para responder. As estrelas indicam a dificuldade (1 a 4 estrelas). Se o tempo acabar, a resposta é considerada incorreta.",
  },
  {
    id: 7,
    title: "Pagando Aluguel",
    image: "/assets/images/img-pay.jpg",
    description:
      "Se você cair em uma propriedade que pertence a outro jogador, terá que pagar o aluguel automaticamente. O valor do aluguel varia pela dificuldade: Verde $30, Laranja $50, Azul $70 e Vermelho $100.",
  },
  {
    id: 8,
    title: "Sorte ou Revés",
    image: "/assets/images/img-random-question.jpg",
    description:
      "As casas com '?' são casas de Sorte ou Revés. Ao cair nelas, uma pergunta surpresa aparece. Se acertar, você ganha pontos! Se errar, perde pontos. Essas casas não podem ser compradas.",
  },
  {
    id: 9,
    title: "HUD - Painel do Jogador",
    image: "/assets/images/img-hud.jpg",
    description:
      "O painel lateral mostra os jogadores da partida. Cada card exibe: o avatar com a cor do jogador, o nome, e o dinheiro atual. O jogador da vez é destacado com uma borda azul brilhante.",
  },
  {
    id: 10,
    title: "HUD - Rodada e Controles",
    image: "/assets/images/img-menu.jpg",
    description:
      "No canto inferior esquerdo, você encontra o contador de rodadas e o nome do jogador da vez. Os botões de Menu e Som também ficam nessa área para acessar as opções do jogo.",
  },
  {
    id: 11,
    title: "Casas Especiais (Cantos)",
    image: "/assets/images/img-game.jpg",
    description:
      "Os cantos do tabuleiro são especiais: Início (ganhe $200 ao passar), Prisão (fique preso por 2 rodadas), Parada Livre (nada acontece) e Vá para a Prisão (vá direto para a prisão).",
  },
  {
    id: 12,
    title: "Prisão",
    image: "/assets/images/img-jail.jpg",
    description:
      "Ao ser preso, seu card na HUD ganha uma borda vermelha e um ícone de cadeado. Você ficará preso por 2 rodadas sem poder jogar. O contador de turnos restantes aparece no seu card.",
  },
  {
    id: 13,
    title: "Dados e Movimentação",
    image: "/assets/images/img-roll-dice.jpg",
    description:
      "No seu turno, clique no botão 'Jogar' para rolar os dados. O resultado determina quantas casas você avança no tabuleiro. Seu peão é exibido na cor que você escolheu na configuração.",
  },
  {
    id: 14,
    title: "Objetivo do Jogo",
    image: "/assets/images/img-end-game.jpg",
    description:
      "O objetivo é se manter financeiramente saudável! Compre propriedades, cobre aluguel dos adversários e responda perguntas corretamente para ganhar dinheiro. O jogador que falir (dinheiro chegar a zero ou negativo) perde a partida.",
  },
];
