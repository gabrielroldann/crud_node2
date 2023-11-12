
async function carregarDados() {
    const carregar = await fetch(`http://localhost:3000/contatos`, {
        method: 'GET', 
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    const contatos = await carregar.json();
    console.log(contatos);

    const table = document.querySelector('table')
    const tbody = table.querySelector('tbody')

    const criarTabela = await contatos.forEach(contato => {
        const linha = document.createElement('tr')
        linha.innerHTML = `<td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.categoria}</td>
            <td> <a id="verContato" href="ver_contato.html?email=${contato.email}"> <ion-icon name="eye"></ion-icon> </a>
            <td> <a id="editarContato"> <ion-icon name="pencil"></ion-icon> </a>
            <td> <a id="deletarContato" href="tabela_contatos.html" onclick="deletarContato('${contato.email}')"> <ion-icon name="trash"></ion-icon> </a>`
        tbody.appendChild(linha);
    });
}

carregarDados();

function deletarContato(email) {
    fetch(`http://localhost:3000/contato/${email}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

    alert('Item deletado!')
}
