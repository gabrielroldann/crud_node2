var express = require('express');
var mysql = require('mysql2');
var cors = require('cors')
var app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Página Inicial');
});

// retorna lista dos contatos
app.get('/contatos', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao Banco de Dados')

        const query = `SELECT * FROM contatos`;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// retorna todas as categorias
app.get('/categorias', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao Banco de Dados')

        const query = `SELECT * FROM categorias`

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// retorna contato pelo email
app.get('/contato/:email', (req, res) => {

    const email = req.params.email;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        console.log('Conectado ao Banco de Dados')

        const query = `SELECT * FROM contatos WHERE email=${email}`;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// filtrar contatos por categoria
app.get('/contatos/:categoria', (req, res) => {

    const categoria = req.params.categoria;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    const query = `SELECT * FROM contatos WHERE categoria=${categoria}`;

    con.query(query, (err, result) => {
        if (err) throw err;

        console.log(result)
        res.send(result)
    })
});

// adicionar um contato na tabela
app.post('/contato', (req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const categoria = req.body.categoria;

    const contato = {
        nome: nome,
        email: email,
        categoria: categoria
    }

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao Banco de Dados')

        const query = `INSERT INTO contatos (nome, email, categoria) VALUES ('${contato.nome}', '${contato.email}', '${contato.categoria}')`;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
        })
    })

    res.send(contato)
});

// fazer update de contato
app.put('/contato/:email', (req, res) => {

    const emailAntigo = req.params.email;

    const nomeNovo = req.body.nome;
    const emailNovo = req.body.email;
    const categoriaNova = req.body.categoria;

    const contatoUpdate = {
        nome: nomeNovo,
        email: emailNovo,
        categoria: categoriaNova
    }

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao Banco de Dados')

        const query = `UPDATE contatos SET nome='${nomeNovo}', email='${emailNovo}', categoria='${categoriaNova}' WHERE email='${emailAntigo}'`;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// deletar um contato da tabela
app.delete('/contato/:email', (req, res) => {

    const email = req.params.email;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;
        console.log('Conectado ao Banco de Dados')

        const query = `DELETE * FROM contatos WHERE email='${email}'`;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});


app.listen(3000, () => {
    console.log('Rodando na porta 3000');
});
