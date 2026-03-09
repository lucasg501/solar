const Database = require('../utils/database');
const banco = new Database();

class UsuarioModel {
    #idCliente;
    #nomeCliente;
    #telefoneCliente;
    #pode_ligar;
    #enderecoCliente;
    #cidadeCliente;
    #estadoCliente;
    #cepCliente;
    #createdBy;
    #updatedBy;
    #created_at;
    #updated_at;

    get idCliente() { return this.#idCliente } set idCliente(idCliente) { this.#idCliente = idCliente }
    get nomeCliente() { return this.#nomeCliente } set nomeCliente(nomeCliente) { this.#nomeCliente = nomeCliente }
    get telefoneCliente() { return this.#telefoneCliente } set telefoneCliente(telefoneCliente) { this.#telefoneCliente = telefoneCliente }
    get pode_ligar() { return this.#pode_ligar } set pode_ligar(pode_ligar) { this.#pode_ligar = pode_ligar }
    get enderecoCliente() { return this.#enderecoCliente } set enderecoCliente(enderecoCliente) { this.#enderecoCliente = enderecoCliente }
    get cidadeCliente() { return this.#cidadeCliente } set cidadeCliente(cidadeCliente) { this.#cidadeCliente = cidadeCliente }
    get estadoCliente() { return this.#estadoCliente } set estadoCliente(estadoCliente) { this.#estadoCliente = estadoCliente }
    get cepCliente() { return this.#cepCliente } set cepCliente(cepCliente) { this.#cepCliente = cepCliente }
    get createdBy() { return this.#createdBy } set createdBy(createdBy) { this.#createdBy = createdBy }
    get updatedBy() { return this.#updatedBy } set updatedBy(updatedBy) { this.#updatedBy = updatedBy }
    get created_at() { return this.#created_at } set created_at(created_at) { this.#created_at = created_at }
    get updated_at() { return this.#updated_at } set updated_at(updated_at) { this.#updated_at = updated_at }

    constructor(idCliente, nomeCliente, telefoneCliente, pode_ligar, enderecoCliente, cidadeCliente, estadoCliente, cepCliente, createdBy, updatedBy, created_at, updated_at) {
        this.#idCliente = idCliente;
        this.#nomeCliente = nomeCliente;
        this.#telefoneCliente = telefoneCliente;
        this.#pode_ligar = pode_ligar;
        this.#enderecoCliente = enderecoCliente;
        this.#cidadeCliente = cidadeCliente;
        this.#estadoCliente = estadoCliente;
        this.#cepCliente = cepCliente;
        this.#createdBy = createdBy;
        this.#updatedBy = updatedBy;
        this.#created_at = created_at;
        this.#updated_at = updated_at;
    }

    toJSON() {
        return {
            'idCliente': this.#idCliente,
            'nomeCliente': this.#nomeCliente,
            'telefoneCliente': this.#telefoneCliente,
            'pode_ligar': this.#pode_ligar,
            'enderecoCliente': this.#enderecoCliente,
            'cidadeCliente': this.#cidadeCliente,
            'estadoCliente': this.#estadoCliente,
            'cepCliente': this.#cepCliente,
            'createdBy': this.#createdBy,
            'updatedBy': this.#updatedBy,
            'created_at': this.#created_at,
            'updated_at': this.#updated_at
        }
    }

    async listar() {
        let sql = 'select * from clientes';
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new ClientesModel(rows[i]['idCliente'], rows[i]['nomeCliente'], rows[i]['telefoneCliente'], rows[i]['pode_ligar'], rows[i]['enderecoCliente'], rows[i]['cidadeCliente'], rows[i]['estadoCliente'], rows[i]['cepCliente'], rows[i]['createdBy'], rows[i]['updatedBy'], rows[i]['created_at'], rows[i]['updated_at']));
        }
        return lista;
    }

    async obter(idCliente) {
        let sql = 'select * from clientes where idCliente = ?';
        let valores = [idCliente];
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            let cliente = new ClientesModel(rows[0]['idCliente'], rows[0]['nomeCliente'], rows[0]['telefoneCliente'], rows[0]['pode_ligar'], rows[0]['enderecoCliente'], rows[0]['cidadeCliente'], rows[0]['estadoCliente'], rows[0]['cepCliente'], rows[0]['createdBy'], rows[0]['updatedBy'], rows[0]['created_at'], rows[0]['updated_at']);
            return cliente;
        } else {
            return false;
        }
    }

    async gravar() {
        if (this.#idCliente == 0) {
            let sql = 'insert into clientes (nomeCliente, telefoneCliente, pode_ligar, enderecoCliente, cidadeCliente, estadoCliente, cepCliente, createdBy) values (?, ?, ?, ?, ?, ?, ?, ?)';
            let valores = [this.#nomeCliente, this.#telefoneCliente, this.#pode_ligar, this.#enderecoCliente, this.#cidadeCliente, this.#estadoCliente, this.#cepCliente, this.#createdBy];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        } else {
            let sql = 'update clientes set nomeCliente = ?, telefoneCliente = ?, pode_ligar = ?, enderecoCliente = ?, cidadeCliente = ?, estadoCliente = ?, cepCliente = ?, updatedBy = ? where idCliente = ?';
            let valores = [this.#nomeCliente, this.#telefoneCliente, this.#pode_ligar, this.#enderecoCliente, this.#cidadeCliente, this.#estadoCliente, this.#cepCliente, this.#updatedBy, this.#idCliente];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async excluir(idCliente) {
        if (idCliente != 0) {
            let sql = 'delete from clientes where idCliente = ?';
            let valores = [this.#idCliente];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        } else {
            return false;
        }
    }

}

module.exports = UsuarioModel;