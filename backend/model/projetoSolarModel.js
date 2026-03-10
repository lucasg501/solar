const Database = require('../utils/database');
const banco = new Database();

class ProjetoSolarModel {
    #idProjeto;
    #idContrato;
    #kwp;
    #idKit;
    #dataInstalacao;
    #createdAt;
    #updatedAt;
    #createdBy;
    #updatedBy;

    get idProjeto() { return this.#idProjeto; } set idProjeto(idProjeto) { this.#idProjeto = idProjeto; }
    get idContrato() { return this.#idContrato; } set idContrato(idContrato) { this.#idContrato = idContrato; }
    get kwp() { return this.#kwp; } set kwp(kwp) { this.#kwp = kwp; }
    get idKit() { return this.#idKit; } set idKit(idKit) { this.#idKit = idKit; }
    get dataInstalacao() { return this.#dataInstalacao; } set dataInstalacao(dataInstalacao) { this.#dataInstalacao = dataInstalacao; }
    get createdAt() { return this.#createdAt; } set createdAt(createdAt) { this.#createdAt = createdAt; }
    get updatedAt() { return this.#updatedAt; } set updatedAt(updatedAt) { this.#updatedAt = updatedAt; }
    get createdBy() { return this.#createdBy; } set createdBy(createdBy) { this.#createdBy = createdBy; }
    get updatedBy() { return this.#updatedBy; } set updatedBy(updatedBy) { this.#updatedBy = updatedBy; }

    constructor(idProjeto, idContrato, kwp, idKit, dataInstalacao, createdAt, updatedAt, createdBy, updatedBy) {
        this.#idProjeto = idProjeto;
        this.#idContrato = idContrato;
        this.#kwp = kwp;
        this.#idKit = idKit;
        this.#dataInstalacao = dataInstalacao;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#createdBy = createdBy;
        this.#updatedBy = updatedBy;
    };

    toJSON() {
        return {
            'idProjeto': this.#idProjeto,
            'idContrato': this.#idContrato,
            'kwp': this.#kwp,
            'idKit': this.#idKit,
            'dataInstalacao': this.#dataInstalacao,
            'createdAt': this.#createdAt,
            'updatedAt': this.#updatedAt,
            'createdBy': this.#createdBy,
            'updatedBy': this.#updatedBy
        };
    }

    async listar() {
        let sql = "SELECT * FROM projetoSolar";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let projeto = new ProjetoSolarModel(rpws[i]['idProjeto'], rows[i]['idContrato'], rows[i]['kwp'], rows[i]['idKit'], rows[i]['dataInstalacao'], rows[i]['createdAt'], rows[i]['updatedAt'], rows[i]['createdBy'], rows[i]['updatedBy']);
            lista.push(projeto);
        }
        return lista;
    }

    async obter(idProjeto) {
        let sql = "SELECT * FROM projetoSolar WHERE idProjeto = ?";
        let valores = [idProjeto];
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            let projeto = new ProjetoSolarModel(rows[0]['idProjeto'], rows[0]['idContrato'], rows[0]['kwp'], rows[0]['idKit'], rows[0]['dataInstalacao'], rows[0]['createdAt'], rows[0]['updatedAt'], rows[0]['createdBy'], rows[0]['updatedBy']);
            return projeto;
        } else {
            return false;
        }
    }

    async gravar() {
        if (this.#idProjeto == 0) {
            let sql = "INSERT INTO projetoSolar (idContrato, kwp, idKit, dataInstalacao, createdAt, updatedAt, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            let valores = [this.#idContrato, this.#kwp, this.#idKit, this.#dataInstalacao, this.#createdAt, this.#updatedAt, this.#createdBy, this.#updatedBy];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        } else {
            let sql = "UPDATE projetoSolar SET idContrato = ?, kwp = ?, idKit = ?, dataInstalacao = ?, createdAt = ?, updatedAt = ?, createdBy = ?, updatedBy = ? WHERE idProjeto = ?";
            let valores = [this.#idContrato, this.#kwp, this.#idKit, this.#dataInstalacao, this.#createdAt, this.#updatedAt, this.#createdBy, this.#updatedBy, this.#idProjeto];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async excluir(idProjeto) {
        let sql = "DELETE FROM projetoSolar WHERE idProjeto = ?";
        let valores = [idProjeto];
        let ok = await banco.ExecutaComando(sql, valores);
        return ok;
    }

}

module.exports = ProjetoSolarModel;