
const table = document.querySelector('table');
const tbody = table.querySelector('tbody')

async () => {

    const pegar_contato = await fetch(`http:localhost:3000/contatos`, {
        method: 'GET', 
        headers: {"Content-type": "application/json; charset=UTF-8"}
    });

    console.log(pegar_contato.json())
}

