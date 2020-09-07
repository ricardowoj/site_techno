const vm = new Vue({
  el: "#app",

  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: "Item adicionado",
    acionarAlerta: false,
  },

  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco * item.quantidadeComprada;
          console.log(item);
        });
      }
      return total;
    },
  },

  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },

    fetchProduto(nome) {
      fetch(`./api/produtos/${nome}/dados.json`)
        .then((r) => r.json())
        .then((r) => {
          this.produto = r;
        });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    adicionarItem() {
      const contagemProduto = this.carrinho.find(
        (item) => item.nome == this.produto.nome
      );
      if (contagemProduto) {
        this.produto.quantidadeComprada++;
        this.carrinho.splice(this.carrinho.indexOf(this.produto.nome));
      } else {
        this.produto.quantidadeComprada = 1;
      }

      this.produto.estoque--;
      const { id, nome, preco, quantidadeComprada } = this.produto;
      this.carrinho.push({ id, nome, preco, quantidadeComprada });
      this.alerta(`${nome} adionado ao carrinho`);
    },

    removerItem(index) {
      this.carrinho.splice(index, 1);
    },

    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },

    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.acionarAlerta = true;
      setTimeout(() => {
        this.acionarAlerta = false;
      }, 2000);
    },
  },

  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    maiusculo(valor) {
      return valor.toUpperCase();
    },
  },

  watch: {
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
  },

  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
  },
});
