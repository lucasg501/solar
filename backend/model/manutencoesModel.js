const Database = require('../utils/database');
const banco = new Database();

class ManutencoesModel {
    #idManutencao;
    #idContrato;
    #anoManutencao;
    #ligacaoRealizada;
    #servicoRealizado;
    #observacoes;
    #finalizado;
    #dataServico;
    #createdBy;
    #updatedBy;
    #created_at;
    #updated_at;

    get idManutencao() { return this.#idManutencao; } set idManutencao(idManutencao) { this.#idManutencao = idManutencao; }
    get idContrato() { return this.#idContrato; } set idContrato(idContrato) { this.#idContrato = idContrato; }
    get anoManutencao() { return this.#anoManutencao; } set anoManutencao(anoManutencao) { this.#anoManutencao = anoManutencao; }
    get ligacaoRealizada() { return this.#ligacaoRealizada; } set ligacaoRealizada(ligacaoRealizada) { this.#ligacaoRealizada = ligacaoRealizada; }
    get servicoRealizado() { return this.#servicoRealizado; } set servicoRealizado(servicoRealizado) { this.#servicoRealizado = servicoRealizado; }
    get observacoes() { return this.#observacoes; } set observacoes(observacoes) { this.#observacoes = observacoes; }
    get finalizado() { return this.#finalizado; } set finalizado(finalizado) { this.#finalizado = finalizado; }
    get dataServico() { return this.#dataServico; } set dataServico(dataServico) { this.#dataServico = dataServico; }
    get createdBy() { return this.#createdBy; } set createdBy(createdBy) { this.#createdBy = createdBy; }
    get updatedBy() { return this.#updatedBy; } set updatedBy(updatedBy) { this.#updatedBy = updatedBy; }
    get created_at() { return this.#created_at; } set created_at(created_at) { this.#created_at = created_at; }
    get updated_at() { return this.#updated_at; } set updated_at(updated_at) { this.#updated_at = updated_at; }

    constructor(idManutencao, idContrato, anoManutencao, ligacaoRealizada, servicoRealizado, observacoes, finalizado, dataServico, createdBy, updatedBy, created_at, updated_at) {
        this.#idManutencao = idManutencao;
        this.#idContrato = idContrato;
        this.#anoManutencao = anoManutencao;
        this.#ligacaoRealizada = ligacaoRealizada;
        this.#servicoRealizado = servicoRealizado;
        this.#observacoes = observacoes;
        this.#finalizado = finalizado;
        this.#dataServico = dataServico;
        this.#createdBy = createdBy;
        this.#updatedBy = updatedBy;
        this.#created_at = created_at;
        this.#updated_at = updated_at;
    };

    toJSON() {
        return {
            'idManutencao': this.#idManutencao,
            'idContrato': this.#idContrato,
            'anoManutencao': this.#anoManutencao,
            'ligacaoRealizada': this.#ligacaoRealizada,
            'servicoRealizado': this.#servicoRealizado,
            'observacoes': this.#observacoes,
            'finalizado': this.#finalizado,
            'dataServico': this.#dataServico,
            'createdBy': this.#createdBy,
            'updatedBy': this.#updatedBy,
            'created_at': this.#created_at,
            'updated_at': this.#updated_at
        }
    }

    async listar() {
        let sql = "SELECT * FROM manutencoes";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let manutencao = new ManutencoesModel(rows[i]['idManutencao'], rows[i]['idContrato'], rows[i]['anoManutencao'], rows[i]['ligacaoRealizada'], rows[i]['servicoRealizado'], rows[i]['observacoes'], rows[i]['finalizado'], rows[i]['dataServico'], rows[i]['createdBy'], rows[i]['updatedBy'], rows[i]['created_at'], rows[i]['updated_at']);
            lista.push(manutencao);
        }
        return lista;
    }

    async listarPag(pagina, limite, ano, ligacaoRealizada, servicoRealizado, finalizado) {

        let offset = (pagina - 1) * limite;

        let sql = `
        SELECT *
        FROM manutencoes
        WHERE 
            (? = '' OR YEAR(dataServico) = ?)
        AND (? = '' OR ligacaoRealizada = ?)
        AND (? = '' OR servicoRealizado = ?)
        AND (? = '' OR finalizado = ?)
        ORDER BY idManutencao DESC
        LIMIT ? OFFSET ?
    `;

        let valores = [
            ano, ano,
            ligacaoRealizada, ligacaoRealizada,
            servicoRealizado, servicoRealizado,
            finalizado, finalizado,
            limite,
            offset
        ];

        let rows = await banco.ExecutaComando(sql, valores);

        let lista = [];

        for (let i = 0; i < rows.length; i++) {

            let manutencao = new ManutencoesModel(
                rows[i]['idManutencao'],
                rows[i]['idContrato'],
                rows[i]['anoManutencao'],
                rows[i]['ligacaoRealizada'],
                rows[i]['servicoRealizado'],
                rows[i]['observacoes'],
                rows[i]['finalizado'],
                rows[i]['dataServico'],
                rows[i]['createdBy'],
                rows[i]['updatedBy'],
                rows[i]['created_at'],
                rows[i]['updated_at']
            );

            lista.push(manutencao);
        }

        return lista;
    }

    async obter(idManutencao) {
        let sql = "SELECT * FROM manutencoes WHERE idManutencao = ?";
        let valores = [idManutencao];
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            return new ManutencoesModel(rows[0]['idManutencao'], rows[0]['idContrato'], rows[0]['anoManutencao'], rows[0]['ligacaoRealizada'], rows[0]['servicoRealizado'], rows[0]['observacoes'], rows[0]['finalizado'], rows[0]['dataServico'], rows[0]['createdBy'], rows[0]['updatedBy'], rows[0]['created_at'], rows[0]['updated_at']);
        }
        return null;
    }

    async gravar() {
        if (this.#idManutencao == 0) {
            let sql = "INSERT INTO manutencoes (idContrato, anoManutencao, ligacaoRealizada, servicoRealizado, observacoes, finalizado, dataServico, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            let valores = [this.#idContrato, this.#anoManutencao, this.#ligacaoRealizada, this.#servicoRealizado, this.#observacoes, this.#finalizado, this.#dataServico, this.#createdBy, this.#updatedBy];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        } else {
            let sql = "UPDATE manutencoes SET idContrato = ?, anoManutencao = ?, ligacaoRealizada = ?, servicoRealizado = ?, observacoes = ?, finalizado = ?, dataServico = ?, createdBy = ?, updatedBy = ? WHERE idManutencao = ?";
            let valores = [this.#idContrato, this.#anoManutencao, this.#ligacaoRealizada, this.#servicoRealizado, this.#observacoes, this.#finalizado, this.#dataServico, this.#createdBy, this.#updatedBy, this.#idManutencao];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async excluir(idManutencao) {
        let sql = "DELETE FROM manutencoes WHERE idManutencao = ?";
        let valores = [idManutencao];
        let ok = await banco.ExecutaComando(sql, valores);
        return ok;
    }

}

module.exports = ManutencoesModel;