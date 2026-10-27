
 // 1. Buscar endereço automaticamente ao sair do campo CEP
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value.replace(/\D/g, "");

    // 2. Validar CEP
    if (cepInformado.length !== 8) {
        return;
    }

    // 3. Buscar endereço na API ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById("logradouro").value = data.logradouro;
                document.getElementById("bairro").value = data.bairro;
                document.getElementById("cidade").value = data.localidade;
                document.getElementById("estado").value = data.uf;
            } else {
                alert("CEP não encontrado.");
            }
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
        });
});

// 4. Web Storage API: salvar endereço no localStorage
const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const endereco = {
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        numero: document.getElementById("numero").value
    };

    // Converter o objeto em JSON e salvar no navegador
    localStorage.setItem("enderecoCadastrado", JSON.stringify(endereco));

    alert("Endereço cadastrado e salvo com sucesso!");
});

// 5. Recuperar os dados salvos ao abrir a página
const enderecoSalvo = localStorage.getItem("enderecoCadastrado");

if (enderecoSalvo) {
    const endereco = JSON.parse(enderecoSalvo);

    document.getElementById("cep").value = endereco.cep;
    document.getElementById("logradouro").value = endereco.logradouro;
    document.getElementById("bairro").value = endereco.bairro;
    document.getElementById("cidade").value = endereco.cidade;
    document.getElementById("estado").value = endereco.estado;
    document.getElementById("numero").value = endereco.numero;
}
