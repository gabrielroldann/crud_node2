
fetch(`http://localhost:3000/filmes`, {
    method: 'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(filmes => {
    const tabela = document.getElementById('tabela_filmes')
    const tbody = document.querySelector('tbody')

    filmes.forEach(filme => {
        const linha = tabela.createElement('tr')
        linha.innerHTML = `
            <td>${filme.nome_filme}</td>
            <td>${filme.ano_filme}</td>
            <td>${filme.distribuidor_filme}</td>
            <td>${filme.categoria_filme}</td>
        `
        tbody.appendChild(linha)
    });
})
.catch(err => console.log(err))
