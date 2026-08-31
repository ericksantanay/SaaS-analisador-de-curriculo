// 2. Controller (O Garçom / Atendente)
// O Controller é o intermediário entre o cliente (seu frontend) e as regras do seu negócio. Pense nele como um garçom em um restaurante.

// O que ele faz:

// Recebe o pedido: Pega os dados que o usuário enviou na requisição (como ID do usuário, plano escolhido ou e-mail).

// Faz validações básicas: Checa se as informações necessárias realmente vieram na requisição (ex: "O e-mail foi enviado?").

// Passa a ordem adiante: Chama o Service correto para fazer o trabalho pesado.

// Devolve a resposta: Quando o Service termina, o Controller pega o resultado e responde ao cliente com um código de status (como 200 Sucesso ou 400 Erro).