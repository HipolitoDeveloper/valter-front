[![LinkedIn][linkedin-shield]][linkedin-url]
<!-- It's a project focused in help people on their time at market, creating the possibility of make a shopping list as complete as  any other form that the people use in the daily life. This project will give the facility to discover which product they should buy, because this products is running out or reaching in their validity date. To resume, in every buy that you do, the app will keep the information and compare them with the stock of your house and inform you what you have to do at the market, which thing you should buy and which of them should be priority.  -->


<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/HipolitoDeveloper/react-native-shopping-liste">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">O que eu tenho na minha geladeira?</h3>

  <p align="center">
    Toda informação que você precisar saber sobre os itens da sua sua geladeira, agora estão no seu bolso.
    <br />
    <a href="https://github.com/HipolitoDeveloper/react-native-shopping-list"><strong>Dê uma olhada nos arquivos»</strong></a>
    <br />
    <br />
   <!-- <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>-->  
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Você encontrará</summary>
  <ol>
    <li>
      <a href="sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#funcionalidades">Funcionalidades</a></li>
        <li><a href="#tecnologias">Tecnologias</a></li>
      </ul>
    </li>
    <li>
      <a href="#iniciando-o-projeto">Iniciando o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <!-- <li><a href="#usage">Usabilidade</a></li> -->
    <li><a href="#telas">Telas</a></li>
    <li><a href="#atualizações-futuras">Futuras atualizações</a></li> 
    <li><a href="#contatos">Contatos</a></li>   
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre o Projeto

![Product Name Screen Shot][product-screenshot]

Quanto eu tenho de leite na geladeira ainda? 
Será que eu tenho leite condensado pra fazer meu bolo? 
Quais as receitas eu consigo fazer com o que eu tenho em casa?

São essas as perguntas que todos fazem quando já estão no mercado e acabam não comprando tudo que deveriam comprar, frustrante né?

Mas existem algumas soluções para resolver esse problema, algumas delas são:
* Escrever os itens que você precisar comprar em um pedaço de papel velho na sua mesa.
* Decorar todos os itens da sua despensa ou geladeira. 
* Ligar para alguém que está em casa ao mesmo tempo que você faz as compras, para garantir que você não esqueça de nada.

Problemas resolvidos, certo?

Acho que não, todos esses pontos que eu te apresentei, além de muitos outros que você pode acabar usando no seu dia-a-dia não são eficazes, nada deles te garante agilidade e rapidez na hora de decidir o que você deve comprar no mercado.
Mas agora eu tenho algo que pode garantir isso.

O que eu tenho na minha geladeira?

É um aplicativo prático, onde você conseguirá carregar toda a sua despensa no seu bolso para onde você quiser e eu te garanto que os jeitos para você controlar sua despensa será o mais intuitivo possível.

## Funcionalidades

* Lista de compras

Primeiro de tudo, você administrará as suas listas de compra pelo aplicativo, tudo que você quiser comprar você poderá adicionar, manualmente, por voz, você escolhe o melhor jeito.
Sua lista de compras será organizada de forma personalizada. Você irá informar no aplicativo qual é o mercado que você vai, caso o mercado tenha compatibilidade com o aplicativo, sua lista de compras será organizada de forma que você consiga encontrar os itens no mercado de forma fácil e rápida.
Já resolvi um dos seus problemas não resolvi?

* Despensa

Após terminar suas compras do dia, você informará no aplicativo quais dos itens adicionados na lista, foram de fato comprados. Com essa confirmação, o aplicativo entenderá que todos esses itens já podem ser automaticamente adicionados na sua despensa e a partir daí que a brincadeira começa.

Cada item possui um tempo útil, sendo assim, quando o tempo útil do item estiver se aproximando, o aplicativo te perguntará se determinado item pode ser excluido, se você confirmar a exclusão (ou seja, seu item foi consumido), você poderá informar ao aplicativo quando que esse item foi consumido, ensinando o aplicativo de que determinado item deveria ser excluido antes do tempo estabelecido por padrão ou que o aplicativo acertou na data de exclusão do item.
Caso você não confirme a exclusão(ou seja, seu item não foi consumido ainda), o item não participará mais do processo de exclusão automática, aguardando então sua exclusão manual. Ao ser excluido manualmente, o aplicativo guardará essa informação e da próxima vez que esse item entrar na despensa, ele te mostrará uma nova data de exclusão, com base na que você desmontrou anteriormente.

* Receitas

Você acha que os itens que você coloca no aplicativo só vão servir para organização? Errado.
O aplicativo possui algumas receitas recomendadas que podem ser consultadas por todos os usuários, porém elas possuem um filtro personalizável. Levando em consideração os itens que você possui na sua despensa, assim mostrando se você conseguirá fazer essa receita com os itens da sua casa ou não. Caso não consiga, você saberá o que falta, podendo adicionar na lista de compras.

Essas receitas são padrões do sistema, mas caso você prefira, você poderá adicionar suas próprias receitas no aplicativo, deixando ao seu critério mostra-lás para outras pessoas ou não.

Ambas as receitas, recomendadas ou suas próprias, participaram do filtro de "possui todos os itens para a receitaou não"

Claro, isso é tudo até agora, o projeto está em desenvolvimento e até agora arrisco afirmar que tenho 40% de tudo pronto. Se você se interessou pela ideia e gostaria de apoiar, fique a vontade para entrar em contato, mostrando ideias, elogios ou até mesmo críticas.


### Tecnologias

* [React Native](https://reactnative.dev)
* [Parse](https://parseplatform.org)

<!-- GETTING STARTED -->
## Iniciando o Projeto

Você conseguirá acessar o front-end sem problemas. Mas para fazer a conexão com o Parse, posteriormente criarei uma conexão de testes com o Back4App, assim clones/forks poderão ser feitos sem muitos problemas.

### Pré-requisitos

* npm
  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Banco de testes ainda não está pronto no Back4App
2. Clone the repo
   ```sh
   git clone https://github.com/HipolitoDeveloper/react-native-shopping-list
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Caso deseje conectar o front-end com outro Back4App Application, mude as informações no arquivo config/server-connection.js

<!-- USAGE EXAMPLES -->
## Telas

![N|Solid][telas_login]      ![N|Solid][telas_cadastro]

![N|Solid][telas_lista_compra]      ![N|Solid][telas_adicionar_item] 

![N|Solid][telas_despensa]    ![N|Solid][telas_notificacoes]

![N|Solid][telas_receitas]      ![N|Solid][telas_receitas_recomendadas]

![N|Solid][telas_receita_listagem]      ![N|Solid][telas_criador_receita_um] 

![N|Solid][telas_criador_receita_dois] ![N|Solid][telas_criador_receita_tres] 


## Atualizações Futuras

* Implementação do Machine Learning controlando a despensa
* Criação do módulo de criação de receitas
* Criação do módulo de Notificações
* Implementação de Push Notifications



<!-- CONTACT -->
## Contatos

Gabriel Hipólito - hipolitodeveloper@gmail.com

LinkedIn: [Linkedin](linkedin-url)

Project Link: [https://github.com/HipolitoDeveloper/react-native-shopping-list](https://github.com/HipolitoDeveloper/react-native-shopping-list)



[linkedin-url]: https://www.linkedin.com/in/gabriel-hipolito-b26ba215a/

[product-screenshot]: images/pagina_principal.png
[telas_login]: images/telas_login.png
[telas_cadastro]: images/telas_cadastro.png
[telas_lista_compra]: images/telas_lista_compra.png
[telas_despensa]: images/telas_despensa.png
[telas_notificacoes]: images/telas_notificacoes.png
[telas_adicionar_item]: images/telas_adicionar_item.png

[telas_receitas]: images/telas_receitas.png
[telas_receitas_recomendadas]: images/telas_receitas_recomendadas.png
[telas_receita_listagem]: images/telas_receita_listagem.png
[telas_criador_receita_um]: images/telas_criador_receita_um.png
[telas_criador_receita_dois]: images/telas_criador_receita_dois.png
[telas_criador_receita_tres]: images/telas_criador_receita_tres.png

