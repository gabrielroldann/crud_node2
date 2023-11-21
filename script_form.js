
function abrirModal() {
    const modal = document.getElementById('modal');
    modal.showModal();

    fetch('http://localhost:3000/categorias', {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(categorias => {
        console.log(categorias)
        
        const dropdown = document.getElementById('dropdownCategorias');
        categorias.forEach(categoria => {
            const option = document.createElement('option')
            option.value = categoria.id
            option.text = categoria.categoria
            
            console.log("CATEGORIA ", categoria.id);
            dropdown.appendChild(option)
        });
    })
    .catch(err => console.log(err))
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.close();
}

const buttonAdd = document.getElementById('addContato');

buttonAdd.addEventListener('click', () => {
    const nome = document.getElementById('nome')
    const email = document.getElementById('email')
    const dropdown = document.querySelector('#dropdownCategorias')

    if (nome.value != '' || email.value != '') {

        const contato = {
            nome: nome.value,
            email: email.value,
            categoria: dropdown.value
        }
    
        console.log(dropdown.value)
        
        fetch(`http://localhost:3000/contato`, {
            method: 'POST',
            body: JSON.stringify(contato),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(contato => console.log(contato))
        .catch(err => console.log(err))
    }
})