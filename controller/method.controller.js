const db = require("../model");
const Methods = db.methods;
const xml = require('xml');

exports.addMethod = (require, result) => {
    const method = {
        name: require.body.name,
        method: require.body.method,
        formula: require.body.formula,
        type: require.body.type,
        isready: require.body.isready,
    };
   // var obj = js2xmlparser.parse("methods", method);

    Methods.create(method).then(data => {
        result.send(data);
    }).catch(error => {
        result.status(500).send({
            message: error.message || "Error creating method."
        });
    });
};

exports.getMethods = (require, result) => {
    //const {name, method, formula, type, isready} = require.query;
    Methods.findAll().then(data => {
        result.header('Content-Type', 'text/xml').send(xml(data));
    }).catch(error => {
        result.status(500).send({
            message: error.message || "Error occured while retrieving method"
        });
    });
};

exports.getMethodById = (require, result) => {
    const id = require.params.id;
    Methods.findByPk(id).then(data => {
        result.header('Content-Type', 'text/xml').send(data);
    }).catch(error =>{
        result.status(500).send({
            message: "Error retrieving Methods with id=" + id
        });
    });
};

exports.updateMethod = (require, result) => {
    const id = require.params.id;
    Methods.update(require.body, {
        where: { id: id}
    }).then(number => {
        if (number == 1){
            result.send({
                message: "Method updated"
            });
        } else {
            result.send({
                message: `Cannot update with id=${id}`
            });
        }
    }).catch(error => {
        result.status(500).send({
            message: "Error update witn id=" + id
        });
    });
};

exports.deleteMethod = (require, result) => {
    const id = require.params.id;
    Methods.destroy({
        where: { id: id}
    }).then(number => {
        if (number == 1){
            result.send({
                message: "Method delete"
            });
        } else {
            result.send({
                message: `Cannot delete with id=${id}`
            });
        }
    }).catch(error => {
        result.status(500).send({
            message: "Error delete witn id=" + id
        });
    });
};

