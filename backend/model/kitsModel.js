const Database = require("../utils/database");
const banco = new Database();

class KitsModel {
    #idKit;
    #nomeKit;
    #descKit;
    #kitAtivo;

    get idKit() { return this.#idKit; } set idKit(idKit) { this.#idKit = idKit; }
    get nomeKit() { return this.#nomeKit; } set nomeKit(nomeKit) { this.#nomeKit = nomeKit; }
    get descKit() { return this.#descKit; } set descKit(descKit) { this.#descKit = descKit; }
    get kitAtivo() { return this.#kitAtivo; } set kitAtivo(kitAtivo) { this.#kitAtivo = kitAtivo; }

    constructor(idKit, nomeKit, descKit, kitAtivo) {
        this.#idKit = idKit;
        this.#nomeKit = nomeKit;
        this.#descKit = descKit;
        this.#kitAtivo = kitAtivo;
    }

    toJSON() {
        return {
            'idKit': this.#idKit,
            'nomeKit': this.#nomeKit,
            'descKit': this.#descKit,
            'kitAtivo': this.#kitAtivo
        }
    }

    async listar() {
        let sql = "SELECT * FROM kits";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            let kit = new KitsModel(rows[i].idKit, rows[i].nomeKit, rows[i].descKit, rows[i].kitAtivo);
            lista.push(kit);
        }
        return lista;
    }

    async obter(idKit) {
        let sql = "select * from kits where idKit = ?";
        let valores = [idKit];
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            let kit = new KitsModel(rows[0].idKit, rows[0].nomeKit, rows[0].descKit, rows[0].kitAtivo);
            return kit;
        } else {
            return false;
        }
    }

    async gravar() {
        if (this.#idKit == 0) {
            let sql = "insert into kits (nomeKit, descKit, kitAtivo) values (?, ?, ?)";
            let valores = [this.#nomeKit, this.#descKit, this.#kitAtivo];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        } else {
            let sql = "update kits set nomeKit = ?, descKit = ?, kitAtivo = ? where idKit = ?";
            let valores = [this.#nomeKit, this.#descKit, this.#kitAtivo, this.#idKit];
            let ok = await banco.ExecutaComando(sql, valores);
            return ok;
        }
    }

    async excluir(idKit) {
        if (idKit != 0) {
            try {
                let sql = "delete from kits where idKit = ?";
                let valores = [idKit];
                let ok = await banco.ExecutaComando(sql, valores);
                return ok;
            } catch (error) {
                return false;
            }
        }
    }


    static async obterPorNome(nomeKit) {
        let sql = "SELECT * FROM kits WHERE nomeKit = ? LIMIT 1";
        let valores = [nomeKit];
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            return new KitsModel(rows[0].idKit, rows[0].nomeKit, rows[0].descKit, rows[0].kitAtivo);
        } else {
            return null;
        }
    }
}

module.exports = KitsModel;