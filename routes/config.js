const Pool = require('pg').Pool;
const js2xmlparser = require('js2xmlparser');
const fs = require('fs');
const pool = new Pool({
    host: 'localhost',
    database: 'process',
    password: 'admin',
    user : 'postgres',
    port: 5432
});

const getMethods = (request, response) => {
    pool.query('SELECT * FROM public.methods', (error, results) => {
        if (error){
            throw error
        }
        var obj = js2xmlparser.parse("methods",results.rows);
        response.status(200).header('Content-Type', 'text/xml').send(obj)
        fs.writeFileSync('data.xml', obj);
    })
};

const getMethodById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM public.methods WHERE id = $1', [id], (error, results) =>{
        if (error){
            throw error
        }
        var obj = js2xmlparser.parse("methods", results.rows);
        response.status(200).header('Content-Type', 'text/xml').send(obj)
    })
};

const addMethod = (request, response) => {
    const {name, method, formula, type, isReady} = request.body;
    pool.query('INSERT INTO public.methods (name, method, formula, type, isready) VALUES ($1, $2, $3, $4, $5)',
        [name, method, formula, type, isReady], (error, results) =>{
            if(error){
                throw error
            }
            js2xmlparser.parse("methods", results);
            response.status(201).send(`Method add with ID: ${results}`)
        })
};

const updateMethod = (request, response) => {
    const id = parseInt(request.params.id);
    const {name, method, formula, type, isReady} = request.body;
    pool.query('UPDATE public.methods SET name = $1, method = $2, formula = $3, type = $4, isready = $5 WHERE id = $6',
        [name, method, formula, type, isReady, id], (error, results) =>{
            if (error){
                throw error
            }
            js2xmlparser.parse("methods", results);
            response.status(200).send(`Method modified with ID: ${id}`)
        })
};

const deleteMethod = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM public.methods WHERE id = $1', [id], (error, results) =>{
        if (error){
            throw error
        }
        js2xmlparser.parse("methods", results);
        response.status(200).send(`Method deleted with ID: ${id}`)
    })
};

const readPoll = (request, responce) => {
    fs.readFile("data.xml", "utf8", function (error, results) {
        if (error){
            throw error;
        }
        responce.send(results)
    })
};

module.exports = {
    getMethods,
    getMethodById,
    addMethod,
    updateMethod,
    deleteMethod,
    readPoll,
};