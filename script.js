const cadastrar = document.getElementById("cadastrar")
var visualizar = document.getElementById("ver")
// botoesApaga = document.getElementsByClassName("apagar")
// botoesApaga.addEventListener("click", apagarLinha())
var tabelaVisivel = false

class Produto {
	constructor(nome, valor, codigo) {
		this.nome = nome;
		this.valor = valor;
		this.codigo = codigo
	}
}

let produtos = []

cadastrar.addEventListener("click", () => {
	let nome = document.getElementById("nome")
	let valor = document.getElementById("valor")
	let codigo = document.getElementById("codigo")

	if(nome.value == "" | valor.value == "" | codigo.value == ""){
		alert("Um dos valores está vazio. Por favor, preencha corretamente.")
		
	}

	var novoProduto = new Produto(nome.value, valor.value, codigo.value)
	produtos.push(novoProduto)

	var corpoTabela = document.querySelector('tbody');

	var tr = document.createElement('tr');
	var tdNome = document.createElement('td');
	var tdValor = document.createElement('td');
	var tdCodigo = document.createElement('td');

	for (let i = 0; i < produtos.length; i++) {
		tdNome.textContent = produtos[i].nome;
		tdValor.textContent = produtos[i].valor;
		tdCodigo.textContent = produtos[i].codigo;

		tr.id = "linha" + i

		tr.appendChild(tdNome)
		tr.appendChild(tdValor)
		tr.appendChild(tdCodigo);
		corpoTabela.appendChild(tr);
	}

	nome.value = ""
	valor.value = ""
	codigo.value = ""

	alert("Produto cadastrado com sucesso!")
})

visualizar.addEventListener("click", () => {
	var tabela = document.querySelector("table")
	if (tabelaVisivel === false) {
		tabela.style.display = "block"
		tabelaVisivel = true
		visualizar.textContent = "ocultar"
	} else {
		tabela.style.display = "none"
		tabelaVisivel = false
		visualizar.textContent = "visualizar"
	}
})

const editar = document.getElementById("editar")

editar.addEventListener("click", () => {
	console.log(produtos)
	var escolherProduto = document.getElementById("escolhedita").value
	var novoProduto = new Produto(document.getElementById("novonome").value, document.getElementById("novovalor").value, document.getElementById("novocodigo").value)
	produtos[escolherProduto - 1] = novoProduto

	var produtoRemovido = document.getElementById("linha" + (escolherProduto - 1))
	var tdNome = document.createElement('td');
	var tdValor = document.createElement('td');
	var tdCodigo = document.createElement("td");

	tdNome.textContent = novoProduto.nome
	tdValor.textContent = novoProduto.valor
	tdCodigo.textContent = novoProduto.codigo


	produtoRemovido.innerHTML = ""

	produtoRemovido.appendChild(tdNome)
	produtoRemovido.appendChild(tdValor)
	produtoRemovido.appendChild(tdCodigo)
})

const botaoApagar = document.getElementById("apagar")

botaoApagar.addEventListener("click", () => {
	var selecionar = document.getElementById("escolheapaga").value
	var corpoTabela = document.querySelector('tbody');
	var produtoRemovido = document.getElementById("linha" + (selecionar - 1))
	console.log(produtoRemovido)
	produtos.splice(selecionar - 1, 1)
	corpoTabela.removeChild(produtoRemovido)
})