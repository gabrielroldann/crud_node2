
fetch(`http://localhost:3000/filmes`, {
    method: 'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(filmes => {

    console.log('response', filmes);

    const lista_filmes = [ ];

    filmes.forEach(linha => {
        const { id_filme, nome_filme, ano_filme, id_distribuidor, nome_distribuidor, id_genero, nome_genero } = linha;

        if (!lista_filmes[id_filme]) {
            lista_filmes[id_filme] = { id_filme, nome_filme, ano_filme, id_distribuidor, nome_distribuidor, generos: [] }
        }
        lista_filmes[id_filme].generos.push({ id_genero, nome_genero })
    })

    console.log('LISTA COMPLETA:', lista_filmes)

    // ordenação por distribuidor 
    const buttonDistribuidor = document.getElementById('ordenarDistribuidor')
    buttonDistribuidor.addEventListener('click', () => {

        lista_filmes.sort((a, b) => {

            const nome1 = a.nome_distribuidor.toUpperCase();
            const nome2 = b.nome_distribuidor.toUpperCase();

            if (nome1 < nome2) {
                return -1;
            }
            
            if (nome1 > nome2) {
                return 1;
            }
            
            return 0;
        })
        
        console.log(lista_filmes)

        const tabela = document.getElementById('tabela')
        let tbody = tabela.querySelector('tbody')
        tbody.innerHTML = ``;

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

    // ordenação por ano
    const buttonOrdemAno = document.getElementById('ordenarAno')
    buttonOrdemAno.addEventListener('click', () => {

        lista_filmes.sort((a, b) => a.ano_filme - b.ano_filme);

        console.log(lista_filmes)

        const tabela = document.getElementById('tabela')
        let tbody = tabela.querySelector('tbody')
        tbody.innerHTML = ``;

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

    // ordenação por nome
    const buttonOrdemAlfabetica = document.getElementById('ordenarString');
    buttonOrdemAlfabetica.addEventListener('click', () => {
        
        lista_filmes.sort((a, b) => {
            let nome1 = a.nome_filme.toUpperCase();
            let nome2 = b.nome_filme.toUpperCase();
    
            if (nome1 < nome2) {
                return -1;
            }
    
            if (nome1 > nome2) {
                return 1;
            }
    
            return 0;
        })

        // console.log(lista_filmes)

        const tabela = document.getElementById('tabela')
        let tbody = tabela.querySelector('tbody')
        tbody.innerHTML = ``;

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
    
        console.log(lista_filmes)
    })

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


fetch(`http://localhost:3000/generos`, {
    method: 'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(generos => {
    console.log('GENEROS: ', generos)

    const dropdown = document.getElementById('filtroGenero');
    generos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero.id_genero;
        option.text = genero.nome_genero;

        dropdown.appendChild(option);
    })

    
});


