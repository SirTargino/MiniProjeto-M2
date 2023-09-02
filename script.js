const cadastrar = document.getElementById("cadastrar")
var visualizar = document.getElementById("ver")
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
	let codigo = produtos.length + 1

	if (nome.value == "" | valor.value == "" | codigo.value == "") {
		alert("Um dos valores está vazio. Por favor, preencha corretamente.")

	} else {
		var novoProduto = new Produto(nome.value, valor.value, codigo)
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
			tdCodigo.id = "codigoproduto" + (i + 1)
			corpoTabela.appendChild(tr);
		}

		nome.value = ""
		valor.value = ""
		codigo.value = ""
		localStorage.setItem("produtos", JSON.stringify(produtos))
		alert("Produto cadastrado com sucesso!")
	}
})

visualizar.addEventListener("click", () => {
	var tabela = document.querySelector("table")
	if (tabelaVisivel === false) {
		tabela.style.display = "block"
		tabelaVisivel = true
		visualizar.textContent = "Ocultar"
	} else {
		tabela.style.display = "none"
		tabelaVisivel = false
		visualizar.textContent = "Visualizar"
	}
})

const editar = document.getElementById("editar")

editar.addEventListener("click", () => {
	var escolherProduto = document.getElementById("escolhedita").value
	if (produtos.length == 0 || produtos.length < escolherProduto || escolherProduto < 0) {
		alert("Código inválido!")
	}else if(document.getElementById("novonome").value == "" || document.getElementById("novovalor").value == ""){
		alert("Um dos valores está vazio! Preencha corretamente.")
	}else {
		var novoProduto = new Produto(document.getElementById("novonome").value, document.getElementById("novovalor").value, escolherProduto)
		produtos[escolherProduto - 1] = novoProduto

		var produtoRemovido = document.getElementById("linha" + (escolherProduto - 1))
		var tdNome = document.createElement('td');
		var tdValor = document.createElement('td');
		var tdCodigo = document.createElement("td");

		tdNome.textContent = novoProduto.nome
		tdValor.textContent = novoProduto.valor
		tdCodigo.textContent = novoProduto.codigo

		produtoRemovido.innerHTML = null

		produtoRemovido.appendChild(tdNome)
		produtoRemovido.appendChild(tdValor)
		produtoRemovido.appendChild(tdCodigo)
		localStorage.setItem("produtos", JSON.stringify(produtos))
		alert("Produto "+escolherProduto+" editado com sucesso!")
	}
})

const botaoApagar = document.getElementById("apagar")

botaoApagar.addEventListener("click", () => {
	var selecionar = document.getElementById("escolheapaga")
	if (selecionar.value < 0 || produtos.length == 0 || produtos.length < selecionar.value) {
		alert("Valor inválido!")
	}else {
		var corpoTabela = document.querySelector('tbody');
		var produtoRemovido = document.getElementById("linha" + (selecionar.value - 1))
		produtos.splice(selecionar.value - 1, 1)
		corpoTabela.removeChild(produtoRemovido)
		localStorage.setItem("produtos", JSON.stringify(produtos))
		alert("Produto " + selecionar.value + " removido com sucesso!")
		var corpoTabela = document.querySelector('tbody');
		corpoTabela.innerHTML = ""
		for (let i = 0; i < produtos.length; i++) {
			produtos[i].codigo = i + 1
			var corpoTabela = document.querySelector('tbody');

			var tr = document.createElement('tr');
			var tdNome = document.createElement('td');
			var tdValor = document.createElement('td');
			var tdCodigo = document.createElement('td');
			tdNome.textContent = produtos[i].nome;
			tdValor.textContent = produtos[i].valor;
			tdCodigo.textContent = produtos[i].codigo;

			tr.id = "linha" + i

			tr.appendChild(tdNome)
			tr.appendChild(tdValor)
			tr.appendChild(tdCodigo);
			tdCodigo.id = "codigoproduto" + (i + 1)
			corpoTabela.appendChild(tr);
		}
		selecionar.value = ''
	}
})

const mudaEditar = document.getElementById("mudapraeditar")

const mudaCadastrar = document.getElementById("mudapracadastrar")

const divCadastro = document.getElementById("cadastro")
const divEdita = document.getElementById("edititems")

mudaEditar.addEventListener("click", () => {
	divCadastro.style.display = "none"
	divEdita.style.display = "flex"
	mudaCadastrar.style.textDecoration = "none"
	mudaEditar.style.textDecoration = "underline"
})

mudaCadastrar.addEventListener("click", () => {
	divCadastro.style.display = "flex"
	divEdita.style.display = "none"
	mudaCadastrar.style.textDecoration = "underline"
	mudaEditar.style.textDecoration = "none"
})

function salvaDados(){
	const itens = JSON.parse(localStorage.getItem('produtos'))
	console.log(itens)

	produtos = itens

	for (let i = 0; i < itens.length; i++) {
		itens[i].codigo = i + 1
		var corpoTabela = document.querySelector('tbody');

		var tr = document.createElement('tr');
		var tdNome = document.createElement('td');
		var tdValor = document.createElement('td');
		var tdCodigo = document.createElement('td');
		tdNome.textContent = itens[i].nome;
		tdValor.textContent = itens[i].valor;
		tdCodigo.textContent = itens[i].codigo;

		tr.id = "linha" + i

		tr.appendChild(tdNome)
		tr.appendChild(tdValor)
		tr.appendChild(tdCodigo);
		tdCodigo.id = "codigoproduto" + (i + 1)
		corpoTabela.appendChild(tr);
	}
}

window.onload = salvaDados()