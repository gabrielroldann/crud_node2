
fetch(`http://localhost:3000/filmes`, {
    method: 'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(filmes => {

    console.log('response', filmes);

    const cabecalho = document.getElementById('cabecalho-tabela')
    const buttonOrdem = document.createElement('a')
    buttonOrdem.href = `tabela_filmes.html`
    cabecalho.appendChild(buttonOrdem)

    const lista_filmes = [ ];

    filmes.forEach(linha => {
        const { id_filme, nome_filme, ano_filme, id_distribuidor, nome_distribuidor, id_genero, nome_genero } = linha;

        if (!lista_filmes[id_filme]) {
            lista_filmes[id_filme] = { id_filme, nome_filme, ano_filme, id_distribuidor, nome_distribuidor, generos: [] }
        }
        lista_filmes[id_filme].generos.push({ id_genero, nome_genero })
    })

    console.log('LISTA COMPLETA GENEROS:', lista_filmes)

    const tabela = document.getElementById('tabela')
    const tbody = tabela.querySelector('tbody')

    lista_filmes.forEach(filme => {
        const arrayAllGeneros = filme.generos
        // console.log(arrayAllGeneros)
        
        const teste_generos = [ ]
        arrayAllGeneros.forEach(genero => {
            const generoAtual = genero.nome_genero;
            teste_generos.push(generoAtual)
            // console.log(genero.nome_genero)
        })

        // console.log(teste_generos)

        const linha = document.createElement('tr')
        
        linha.innerHTML = `
            <td>${filme.nome_filme}</td>
            <td>${filme.ano_filme}</td>
            <td>${filme.nome_distribuidor}</td>
            <td>${colocar_generos(teste_generos)}</td>
        `;
        tbody.appendChild(linha)
    });
})
.catch(err => console.log(err))

function colocar_generos(lista) {
    
    let teste_string = '';
    for (let i = 0; i < lista.length; i++) {
        if (i == lista.length-1) {
            teste_string += `${lista[i]}`
        } else {
            teste_string += `${lista[i]}, `
        }
    }

    return teste_string;
}
