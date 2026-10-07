
    // Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const musicos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
      if (rota === "contribuientes") mostrarNossosContribuintes();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Sistema de Cadastro de Músicos</h1>
        <p>
          Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
          A navegação acontece sem recarregar a página.
        </p>

        <p>
          Os músicos cadastrados ficam temporariamente guardados em um array JavaScript.
        </p>

        <div class="contador">
          Musicos cadastrados nesta sessão: <strong>${musicos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar Artista</button>
          <button class="botao secundario" id="btnVerMusicos">Ver musicos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerMusicos")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Musico</h1>

        <form id="formMusico">
          <div class="campo">
            <label for="nome">Nome</label>
            <input id="nome" type="text" placeholder="Digite o nome do Musico" required />
          </div>

          <div class="campo">
            <label for="instrumento">Intrumento</label>
            <input id="instrumento" type="text" placeholder="Digite o seu instrumento" required />
          </div>

          <div class="campo">
            <label for="cidade">Cidade</label>
            <input id="cidade" type="text" placeholder="Digite a sua cidade" required />
          </div>

          <button class="botao" type="submit">Salvar artista</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formMusico").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const instrumento = document.querySelector("#instrumento").value.trim();
        const cidade = document.querySelector("#cidade").value.trim();

        musicos.push({
          nome,
          instrumento,
          cidade
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Musico foi cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Musicos</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de alunos.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (musicos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum musico nessa seção ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      musicos.forEach((musico, indice) => {
        linhas += `
          <tr>
            <td>${musico.nome}</td>
            <td>${musico.instrumento}</td>
            <td>${musico.cidade}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Instrumento</th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          musicos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Este exemplo foi criado para demonstrar uma Single Page Application simples.
        </p>
        <p>
          Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
          o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
          O projeto também demonstra cadastro em array, manipulação do DOM,
          eventos de clique, envio de formulário, listagem e exclusão.
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();