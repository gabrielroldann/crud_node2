
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const email = urlParams.get('email');
console.log(email);


fetch(`http://localhost:3000/contato/${email}`, {
    method: 'GET',
    headers: {"Content-type": "application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(contatos => {
    const table = document.querySelector('table')
    const tbody = table.querySelector('tbody')
    contatos.forEach(contato => {
        const linha = document.createElement('tr')
        linha.innerHTML = `
            <td>${contato.nome}</td>
            <td>${contato.email}</td>
            <td>${contato.categoria}</td>`
        tbody.append(linha)
    });
})