let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById("amigo");
    const nome = inputAmigo.value.trim();

    if (nome === "") {
        alert("Por favor, insira um nome válido.");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    inputAmigo.value = "";
    atualizarListaAmigos();
}

// Função para atualizar a lista exibida na interface
function atualizarListaAmigos() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.className = "name-item";

        const buttonRemover = document.createElement("button");
        buttonRemover.textContent = "Remover";
        buttonRemover.className = "button-remove";
        buttonRemover.onclick = () => removerAmigo(index);

        li.appendChild(buttonRemover);
        lista.appendChild(li);
    });
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarListaAmigos();
}

// Função para realizar o sorteio
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("É necessário pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    const sorteio = {}; // Objeto para armazenar os pares
    const participantes = [...amigos]; // Cópia da lista original

    amigos.forEach((amigo) => {
        let possiveis = participantes.filter((p) => p !== amigo); // Garantir que não se sorteie a si mesmo

        if (possiveis.length === 0) {
            alert("O sorteio não foi possível. Tente novamente.");
            return;
        }

        const sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
        sorteio[amigo] = sorteado;
        participantes.splice(participantes.indexOf(sorteado), 1);
    });

    exibirResultado(sorteio);
}

// Função para exibir o resultado do sorteio
function exibirResultado(sorteio) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    for (const [amigo, sorteado] of Object.entries(sorteio)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} tirou ${sorteado}`;
        resultado.appendChild(li);
    }

    animarResultado();
}

// Função para adicionar uma animação ao resultado
function animarResultado() {
    const resultado = document.getElementById("resultado");
    resultado.style.transition = "transform 0.5s ease-in-out, opacity 0.5s";
    resultado.style.transform = "scale(1.2)";
    resultado.style.opacity = "0.8";

    setTimeout(() => {
        resultado.style.transform = "scale(1)";
        resultado.style.opacity = "1";
    }, 500);
}
