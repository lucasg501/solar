const Database = require('../utils/database');
const banco = new Database();

class ContratoModel {
    #idContrato;
    #idCliente;
    #numeroContrato;
    #dataContrato;
    #statusContrato;
    #obsContrato;
    #createdBy;
    #updatedBy;
    #createdAt;
    #updatedAt;

    get idContrato() { return this.#idContrato; } set idContrato(idContrato) { this.#idContrato = idContrato; }
    get idCliente() { return this.#idCliente; } set idCliente(idCliente) { this.#idCliente = idCliente; }
    get numeroContrato() { return this.#numeroContrato; } set numeroContrato(numeroContrato) { this.#numeroContrato = numeroContrato; }
    get dataContrato() { return this.#dataContrato; } set dataContrato(dataContrato) { this.#dataContrato = dataContrato; }
    get statusContrato() { return this.#statusContrato; } set statusContrato(statusContrato) { this.#statusContrato = statusContrato; }
    get obsContrato() { return this.#obsContrato; } set obsContrato(obsContrato) { this.#obsContrato = obsContrato; }
    get createdBy() { return this.#createdBy; } set createdBy(createdBy) { this.#createdBy = createdBy; }
    get updatedBy() { return this.#updatedBy; } set updatedBy(updatedBy) { this.#updatedBy = updatedBy; }
    get createdAt() { return this.#createdAt; } set createdAt(createdAt) { this.#createdAt = createdAt; }
    get updatedAt() { return this.#updatedAt; } set updatedAt(updatedAt) { this.#updatedAt = updatedAt; }

    constructor(idContrato, idCliente, numeroContrato, dataContrato, statusContrato, obsContrato, createdBy, updatedBy, createdAt, updatedAt) {
        this.#idContrato = idContrato;
        this.#idCliente = idCliente;
        this.#numeroContrato = numeroContrato;
        this.#dataContrato = dataContrato;
        this.#statusContrato = statusContrato;
        this.#obsContrato = obsContrato;
        this.#createdBy = createdBy;
        this.#updatedBy = updatedBy;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    toJSON() {
        return {
            'idContrato': this.#idContrato,
            'idCliente': this.#idCliente,
            'numeroContrato': this.#numeroContrato,
            'dataContrato': this.#dataContrato,
            'statusContrato': this.#statusContrato,
            'obsContrato': this.#obsContrato,
            'createdBy': this.#createdBy,
            'updatedBy': this.#updatedBy,
            'createdAt': this.#createdAt,
            'updatedAt': this.#updatedAt
        }
    }

    async listar() {
        let sql = "select * from contratos";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let contrato = new ContratoModel(rows[i]['idContrato'], rows[i]['idCliente'], rows[i]['numeroContrato'], rows[i]['dataContrato'], rows[i]['statusContrato'], rows[i]['obsContrato'], rows[i]['createdBy'], rows[i]['updatedBy'], rows[i]['created_at'], rows[i]['updated_at']);
            lista.push(contrato);
        }
        return lista;
    }

    async obter(idContrato) {
        if (idContrato != 0) {
            let sql = "select * from contratos where idContrato = ?";
            let valores = [idContrato];
            let rows = await banco.ExecutaComando(sql, valores);
            if (rows.length > 0) {
                let contrato = new ContratoModel(rows[0]['idContrato'], rows[0]['idCliente'], rows[0]['numeroContrato'], rows[0]['dataContrato'], rows[0]['statusContrato'], rows[0]['obsContrato'], rows[0]['createdBy'], rows[0]['updatedBy'], rows[0]['created_at'], rows[0]['updated_at']);
                return contrato;
            } else {
                return null;
            }
        }
    }

    async gravar(){
        if(this.#idContrato == 0){
            let sql = "insert into contratos (idCliente, numeroContrato, dataContrato, statusContrato, obsContrato, createdBy) values (?, ?, ?, ?, ?, ?)";
            let valores = [this.#idCliente, this.#numeroContrato, this.#dataContrato, this.#statusContrato, this.#obsContrato, this.#createdBy];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }else{
            let sql = "update contratos set idCliente = ?, numeroContrato = ?, dataContrato = ?, statusContrato = ?, obsContrato = ?, updatedBy = ? where idContrato = ?";
            let valores = [this.#idCliente, this.#numeroContrato, this.#dataContrato, this.#statusContrato, this.#obsContrato, this.#updatedBy, this.#idContrato];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async excluir(idContrato){
        if(idContrato != 0){
            let sql = "delete from contratos where idContrato = ?";
            let valores = [idContrato];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }else{
            return false;
        }
    }

};

module.exports = ContratoModel;