const vm = new Vue({
  el: "#app",

  data: {
    produtos: [],
    produto: false,
    carrinhoTotal: 0,
    carrinho: [],
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
      this.produto.estoque--;
    },
  },

  created() {
    this.fetchProdutos();
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
});
