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

        // const query = `SELECT * FROM contatos`;
        const query = `
            select * from contatos contato
            join categorias categoria on contato.categoria = categoria.id;
        `;

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

        const query = `
            select * from categorias;
        `;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// retorna todos os filmes
app.get('/filmes', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;

        const query = `
            select * from filmes_completos
            join filmes on filmes_completos.id_filme_completos = filmes.id_filme
            join distribuidores on filmes_completos.id_distribuidor_completos = distribuidores.id_distribuidor
            join generos on filmes_completos.id_genero_completos = generos.id_genero
            order by id_completos;
        `;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// retorna todos os generos
app.get('/generos', (req, res) => {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;

        const query = `
            select * from generos;
        `;

        con.query(query, (err, result) => {
            if (err) throw err;

            console.log(result)
            res.send(result)
        })
    })
});

// filtra por genero
app.get('/filmeGenero/:genero', (req, res) => {

    const genero = req.params.genero;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "i$>E8]>0&zDOG5c",
        database: "node_test"
    });

    con.connect((err) => {
        if (err) throw err;

        const query = `
            select * from filmes_completos
            join filmes on filmes_completos.id_filme_completos = filmes.id_filme
            join distribuidores on filmes_completos.id_distribuidor_completos = distribuidores.id_distribuidor
            join generos on filmes_completos.id_genero_completos = generos.id_genero
            where id_genero = ${genero}
            order by id_completos;
        `;
    })
})

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

        // const query = `SELECT * FROM contatos WHERE email='${email}'`;
        const query = `
            select * from contatos contato
            join categorias categoria on contato.categoria = categoria.id
            where email='${email}';
        `;

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

    const query = `
        select * from contatos where categoria=${categoria};
    `;

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

        const query = `
            insert into contatos (nome, email, categoria) values
            ('${contato.nome}', '${contato.email}', '${contato.categoria}');
        `;

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

        const query = `
            update contatos set nome='${nomeNovo}', email='${emailNovo}', categoria='${categoriaNova}'
            where email='${emailAntigo}';
        `;

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

        const query = `
            delete from contatos
            where email='${email}';
        `;

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
