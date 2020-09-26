class Despesa{
    constructor(ano,mes, dia,tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarCampo(){
        for(let campos in this){
            if (this[campos] == undefined || this[campos] == '' || this[campos] == null){
                
               return false
            }
        }
        return true
    }
}

class BancoDeDadosLocal{
    constructor(){
        let id = localStorage.getItem('ID')
        if(id === null){
            localStorage.setItem('ID', 0)
        }
    }
    getProximoId (){
        let pxId = localStorage.getItem('ID')
        return parseInt(++pxId) 
    }
    GravarInformacoes(dadosDespesa){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(dadosDespesa))
        localStorage.setItem('ID', id)
    }

    recuperarListagemCompletaDepesas(){
        let despesas = []

        let id = localStorage.getItem('ID')

        for (let i = 1; i <= id;i++){

            let despesa = JSON.parse(localStorage.getItem(i))

            //indices em sequencia // se encontrar array null, continue

            if(despesa === null){
                continue
            }

            despesas.push(despesa)

        }
        return despesas
    }
    pesquisar(despesas){
        let filtroDespesa = new Array
        filtroDespesa = this.recuperarListagemCompletaDepesas()
        console.log(filtroDespesa)
    }
}

let bancoDados = new BancoDeDadosLocal()
let infoData = new Date()

function cadastrarDespesa(){
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    if(dia.value == ""){
        dia.value = infoData.getDate()
    }
    if(ano.value == 0){
        ano.value = infoData.getFullYear()
    }
    if(mes.value == 0){
        mes.value = infoData.getMonth()
    } 
    
   
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        )
        
        if(despesa.validarCampo()){ //Sucesso na gravação
            bancoDados.GravarInformacoes(despesa)
            $('#modalRegistroDepesa').modal('show')

            document.getElementById('modal-titulo').innerHTML = 'Sucesso!'
            document.getElementById('modal_titulo_header').className = 'modal-header bg-success  text-light'
            document.getElementById('modal-corpo').innerHTML = 'Dados gravados com sucesso!'
            document.getElementById('modal-corpo').innerHTML = `<strong>${descricao.value}</strong>, Valor: <strong>R$ ${valor.value} </strong> foi adicionado.`
            document.getElementById('modal-btn').className = 'btn btn-success'
            document.getElementById('modal-btn').innerHTML = 'Ok'

            document.getElementById('statusInfo').innerHTML = `<strong>Dados salvos:</strong> <br> Mês:${mes.value} <br> Dia: ${dia.value} <br> 
            Descrição: ${descricao.value} <br> Valor: R$ ${valor.value} <br> `

            document.getElementById('saldoPrint').innerHTML = `R$ ${valor.value}`
            document.getElementById('despesaPrint').innerHTML = `R$ ${valor.value}`

            ano.value = ''
            mes.value = ''
            dia.value = ''
            tipo.value = ''
            descricao.value = ''
            valor.value = ''


        }else{ // Erro na gravação
            $('#modalRegistroDepesa').modal('show')
            document.getElementById('modal-titulo').innerHTML = 'Erro'
            document.getElementById('modal_titulo_header').className = 'modal-header bg-warning text-light'
            document.getElementById('modal-corpo').innerHTML = 'Existem dados que não foram preenchidos!'
            document.getElementById('modal-btn').className = 'btn btn-danger'
            document.getElementById('modal-btn').innerHTML = 'Voltar e corrigir!'
        }
}

function CarregaListagemDespesas(){
    let despesas = []

    despesas = bancoDados.recuperarListagemCompletaDepesas()
   
    // selecimento elemento TBODY
    let listaDespesas = document.getElementById('listagemDespesas')

     //percorrer arrayDespesas

     despesas.forEach(function(despesaForEach){
        
        // linha - TR

        let tr = listaDespesas.insertRow()

        // coluna TD

        tr.insertCell(0).innerHTML = `${despesaForEach.dia}/${despesaForEach.mes}/${despesaForEach.ano}`
        
        
        switch(despesaForEach.tipo){
            case '1': despesaForEach.tipo = 'Alimentação'
            break;

            case '2': despesaForEach.tipo = 'Educação'
            break;

            case '3': despesaForEach.tipo = 'Lazer'
            break;

            case '4': despesaForEach.tipo = 'Saúde'
            break;

            case '5': despesaForEach.tipo = 'Transporte'
            break;
        }

        tr.insertCell(1).innerHTML = despesaForEach.tipo    
        tr.insertCell(2).innerHTML = despesaForEach.descricao
        tr.insertCell(3).innerHTML = despesaForEach.valor


     })
}
 

function validarDia(){
    if(dia.value > 31){
        $('#modalRegistroDepesa').modal('show')
            document.getElementById('modal-titulo').innerHTML = 'Erro - dia digitado é inválido'
            document.getElementById('modal_titulo_header').className = 'modal-header bg-warning text-light'
            document.getElementById('modal-corpo').innerHTML = `Você digitou um valor: <strong>${dia.value}</strong> para dia. <strong>Volte e faça o ajuste ou
            será considerado o dia atual do sistema.</strong>`
            document.getElementById('modal-btn').className = 'btn btn-danger'
            document.getElementById('modal-btn').innerHTML = 'Voltar e corrigir!'
            dia.value = infoData.getDate()
    }
}

function pesquisarDespesasCadastradas(){
   let ano = document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
   let tipo = document.getElementById('tipo')
   let descricao = document.getElementById('descricao')
   let valor =  document.getElementById('valor')

   let despesaPesquisa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

   bancoDados.pesquisar(despesaPesquisa)

}





















function limparCampos(){
    ano.value = ""
    mes.value = ""
    dia.value = ""
    tipo.value = ""
    descricao.value = ""
    valor.value = ""
    localStorage.clear()
}

class Usuario{
    constructor(usuario, senha, Rsenha){
        this.usuario = usuario
        this.senha = senha
        this.Rsenha = Rsenha
    }
}

function registrarUsuario () {
    let usuario = document.getElementById('usuario')
    let senha = document.getElementById('senha')
    let Rsenha = document.getElementById('Rsenha')
    
    let novoCadastro = new Usuario(
        usuario.value,
        senha.value,
        Rsenha.value
    )

/*    if(usuario.value == "" || senha.value == "" || Rsenha.value == ""){
        document.getElementById('usuario').style.borderBottomColor = 'red'
        document.getElementById('senha').style.borderBottomColor = 'red'
        document.getElementById('Rsenha').style.borderBottomColor = 'red'

    }
    if (senha.value != Rsenha.value){
        alert('As senhas devem ser iguais')
    }
    else{

    }  */
    cadUsuario(novoCadastro)
}
function cadUsuario(dadosUsuario){
    localStorage.setItem('Usuario', JSON.stringify(dadosUsuario))
}
class BDUsuario{
    
    
}
