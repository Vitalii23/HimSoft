module.exports = (sequelize, Sequelize) => {
    const Methods = sequelize.define("methods", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        method: {
            type: Sequelize.STRING,
            allowNull: false
        },
        formula: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isReady: {
            type: Sequelize.BOOLEAN,
        },
    });
    return Methods;
};