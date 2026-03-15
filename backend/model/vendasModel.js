const Database = require('../utils/database');
const banco = new Database();

class VendasModel {

    #idVenda;
    #idCliente;
    #tipoVenda;
    #descricaoVenda;
    #valorVenda;
    #dataVenda;
    #statusVenda;
    #createdBy;
    #updatedBy;
    #created_at;
    #updated_at;

    constructor(idVenda, idCliente, tipoVenda, descricaoVenda, valorVenda, dataVenda, statusVenda, createdBy, updatedBy, created_at, updated_at) {
        this.#idVenda = idVenda;
        this.#idCliente = idCliente;
        this.#tipoVenda = tipoVenda;
        this.#descricaoVenda = descricaoVenda;
        this.#valorVenda = valorVenda;
        this.#dataVenda = dataVenda;
        this.#statusVenda = statusVenda;
        this.#createdBy = createdBy;
        this.#updatedBy = updatedBy;
        this.#created_at = created_at;
        this.#updated_at = updated_at;
    }

    get idVenda() { return this.#idVenda } set idVenda(idVenda) { this.#idVenda = idVenda }
    get idCliente() { return this.#idCliente } set idCliente(idCliente) { this.#idCliente = idCliente }
    get tipoVenda() { return this.#tipoVenda } set tipoVenda(tipoVenda) { this.#tipoVenda = tipoVenda }
    get descricaoVenda() { return this.#descricaoVenda } set descricaoVenda(descricaoVenda) { this.#descricaoVenda = descricaoVenda }
    get valorVenda() { return this.#valorVenda } set valorVenda(valorVenda) { this.#valorVenda = valorVenda }
    get dataVenda() { return this.#dataVenda } set dataVenda(dataVenda) { this.#dataVenda = dataVenda }
    get statusVenda() { return this.#statusVenda } set statusVenda(statusVenda) { this.#statusVenda = statusVenda }
    get createdBy() { return this.#createdBy } set createdBy(createdBy) { this.#createdBy = createdBy }
    get updatedBy() { return this.#updatedBy } set updatedBy(updatedBy) { this.#updatedBy = updatedBy }
    get created_at() { return this.#created_at } set created_at(created_at) { this.#created_at = created_at }
    get updated_at() { return this.#updated_at } set updated_at(updated_at) { this.#updated_at = updated_at }

    toJSON() {
        return {
            idVenda: this.#idVenda,
            idCliente: this.#idCliente,
            tipoVenda: this.#tipoVenda,
            descricaoVenda: this.#descricaoVenda,
            valorVenda: this.#valorVenda,
            dataVenda: this.#dataVenda,
            statusVenda: this.#statusVenda,
            createdBy: this.#createdBy,
            updatedBy: this.#updatedBy,
            created_at: this.#created_at,
            updated_at: this.#updated_at
        }
    }

    async listar() {
        let sql = 'select * from vendas';
        let rows = await banco.ExecutaComando(sql);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {

            let venda = new VendasModel(
                rows[i]['idVenda'],
                rows[i]['idCliente'],
                rows[i]['tipoVenda'],
                rows[i]['descricaoVenda'],
                rows[i]['valorVenda'],
                rows[i]['dataVenda'],
                rows[i]['statusVenda'],
                rows[i]['createdBy'],
                rows[i]['updatedBy'],
                rows[i]['created_at'],
                rows[i]['updated_at']
            );

            lista.push(venda);
        }

        return lista;
    }

    async obter(idVenda) {

        let sql = 'select * from vendas where idVenda = ?';
        let valores = [idVenda];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {

            let venda = new VendasModel(
                rows[0]['idVenda'],
                rows[0]['idCliente'],
                rows[0]['tipoVenda'],
                rows[0]['descricaoVenda'],
                rows[0]['valorVenda'],
                rows[0]['dataVenda'],
                rows[0]['statusVenda'],
                rows[0]['createdBy'],
                rows[0]['updatedBy'],
                rows[0]['created_at'],
                rows[0]['updated_at']
            );

            return venda;

        } else {
            return null;
        }
    }

    async obterPorIdCliente(idCliente) {

        let sql = 'select * from vendas where idCliente = ?';
        let valores = [idCliente];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {

            let venda = new VendasModel(
                rows[0]['idVenda'],
                rows[0]['idCliente'],
                rows[0]['tipoVenda'],
                rows[0]['descricaoVenda'],
                rows[0]['valorVenda'],
                rows[0]['dataVenda'],
                rows[0]['statusVenda'],
                rows[0]['createdBy'],
                rows[0]['updatedBy'],
                rows[0]['created_at'],
                rows[0]['updated_at']
            );

            return venda;

        } else {
            return null;
        }
    }

    async gravar() {

        if (this.#idVenda == 0) {

            let sql = `
            insert into vendas
            (idCliente, tipoVenda, descricaoVenda, valorVenda, dataVenda, statusVenda, createdBy, updatedBy, created_at, updated_at)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            let valores = [
                this.#idCliente,
                this.#tipoVenda,
                this.#descricaoVenda,
                this.#valorVenda,
                this.#dataVenda,
                this.#statusVenda,
                this.#createdBy,
                this.#updatedBy,
                this.#created_at,
                this.#updated_at
            ];

            let ok = await banco.ExecutaComando(sql, valores);

            return ok;

        } else {

            let sql = `
            update vendas set
            idCliente = ?,
            tipoVenda = ?,
            descricaoVenda = ?,
            valorVenda = ?,
            dataVenda = ?,
            statusVenda = ?,
            createdBy = ?,
            updatedBy = ?,
            created_at = ?,
            updated_at = ?
            where idVenda = ?`;

            let valores = [
                this.#idCliente,
                this.#tipoVenda,
                this.#descricaoVenda,
                this.#valorVenda,
                this.#dataVenda,
                this.#statusVenda,
                this.#createdBy,
                this.#updatedBy,
                this.#created_at,
                this.#updated_at,
                this.#idVenda
            ];

            let ok = await banco.ExecutaComando(sql, valores);

            return ok;
        }
    }

    async excluir(idVenda) {

        if (idVenda > 0) {

            let sql = 'delete from vendas where idVenda = ?';
            let valores = [idVenda];

            let ok = await banco.ExecutaComando(sql, valores);

            return ok;

        } else {
            return false;
        }
    }

    async attStatus(idVenda, statusVenda, updatedBy ) {

        let sql = 'update vendas set statusVenda = ?, updatedBy = ? where idVenda = ?';
        let valores = [statusVenda, updatedBy, idVenda];

        let ok = await banco.ExecutaComando(sql, valores);

        return ok;
    }

}

module.exports = VendasModel;