const Database = require('../utils/database');
const banco = new Database();

class UsuarioModel {

    #idUsuario;
    #nomeUsuario;
    #emailUsuario;
    #senhaUsuario;
    #nivelUsuario;
    #usuarioAtivo;
    #created_at;

    get idUsuario() { return this.#idUsuario } set idUsuario(idUsuario) { this.#idUsuario = idUsuario }
    get nomeUsuario() { return this.#nomeUsuario } set nomeUsuario(nomeUsuario) { this.#nomeUsuario = nomeUsuario }
    get emailUsuario() { return this.#emailUsuario } set emailUsuario(emailUsuario) { this.#emailUsuario = emailUsuario }
    get senhaUsuario() { return this.#senhaUsuario } set senhaUsuario(senhaUsuario) { this.#senhaUsuario = senhaUsuario }
    get nivelUsuario() { return this.#nivelUsuario } set nivelUsuario(nivelUsuario) { this.#nivelUsuario = nivelUsuario }
    get usuarioAtivo() { return this.#usuarioAtivo } set usuarioAtivo(usuarioAtivo) { this.#usuarioAtivo = usuarioAtivo }
    get created_at() { return this.#created_at } set created_at(created_at) { this.#created_at = created_at }

    contructor(idUsuario, nomeUsuario, emailUsuario, senhaUsuario, nivelUsuario, usuarioAtivo, created_at) {
        this.#idUsuario = idUsuario;
        this.#nomeUsuario = nomeUsuario;
        this.#emailUsuario = emailUsuario;
        this.#senhaUsuario = senhaUsuario;
        this.#nivelUsuario = nivelUsuario;
        this.#usuarioAtivo = usuarioAtivo;
        this.#created_at = created_at;
    }

    toJSON() {
        return {
            'idUsuario': this.#idUsuario,
            'nomeUsuario': this.#nomeUsuario,
            'emailUsuario': this.#emailUsuario,
            'senhaUsuario': this.#senhaUsuario,
            'nivelUsuario': this.#nivelUsuario,
            'usuarioAtivo': this.#usuarioAtivo,
            'created_at': this.#created_at
        }
    }

    async listar() {
        let sql = "select * from usuarios";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];
        for (let i = 0; i < rows.length; i++) {
            lista.push(new UsuarioModel(rows[i].idUsuario, rows[i].nomeUsuario, rows[i].emailUsuario, rows[i].senhaUsuario, rows[i].nivelUsuario, rows[i].usuarioAtivo, rows[i].created_at));
        }
        return lista;
    }

    async obter(idUsuario) {
        let sql = "select * from usuarios where idUsuario = ?";
        let valores = [idUsuario]
        let rows = await banco.ExecutaComando(sql, valores);
        if (rows.length > 0) {
            return new UsuarioModel(rows[0].idUsuario, rows[0].nomeUsuario, rows[0].emailUsuario, rows[0].senhaUsuario, rows[0].nivelUsuario, rows[0].usuarioAtivo, rows[0].created_at);
        }
    }

    async gravar() {
        if (this.#idUsuario == 0) {
            let sql = 'insert into usuarios (nomeUsuario, emailUsuario, senhaUsuario, nivelUsuario, usuarioAtivo, created_at) values (?,?,?,?,?,?)';
            let valores = [this.#nomeUsuario, this.#emailUsuario, this.#senhaUsuario, this.#nivelUsuario, this.#usuarioAtivo, this.#created_at];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        } else {
            let sql = 'update usuarios set nomeUsuario = ?, emailUsuario = ?, senhaUsuario = ?, nivelUsuario = ?, usuarioAtivo = ?, created_at = ? where idUsuario = ?';
            let valores = [this.#nomeUsuario, this.#emailUsuario, this.#senhaUsuario, this.#nivelUsuario, this.#usuarioAtivo, this.#created_at, this.#idUsuario];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }
    }

    async excluir(idUsuario) {
        if(idUsuario > 0){
            let sql = 'delete from usuarios where idUsuario = ?';
            let valores = [idUsuario];
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
            return ok;
        }else{
            return false;
        }
    }

}

module.exports = UsuarioModel;