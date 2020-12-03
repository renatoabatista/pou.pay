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

class Saldo {
    constructor(saldoDisponivel,limiteA){
        this.saldoDisponivel = saldoDisponivel
        this.limiteA = limiteA
    }

    limiteGastos(){
        let limiteA = 500


       /*  /// verificar se foi cadastrado um limite de gast mês

        if(limiteA == 0 || limiteA === undefined){
            alert('Favor cadastre o limite')
            window.location.href="login.html"
        } */
        return limiteA
    }

    saldoDisponivel(){
      
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

            despesa.id = i
            
            despesas.push(despesa)
            bancoDados.RelatorioDespesasGeral(despesas)
        }
        return despesas

    }
    pesquisar(despesas){
        let filtroDespesa = new Array

        filtroDespesa = this.recuperarListagemCompletaDepesas()
        
        if(despesas.ano != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.ano == despesas.ano)) 
        } 

        if(despesas.mes != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.mes == despesas.mes)) 
        } 

        if(despesas.dia != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.dia == despesas.dia)) 
        }

        if(despesas.tipo != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.tipo == despesas.tipo)) 
        } 

        if(despesas.descricao != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.descricao == despesas.descricao)) 
        }

        if(despesas.valor != ''){
            filtroDespesa = (filtroDespesa.filter(dado => dado.valor == despesas.valor)) 
        }
       
        return filtroDespesa
    }

    excluirDespesa(id){
        localStorage.removeItem(id)
    }

    relatorioDespesas(despesas){
        let percentualTotal = 0

        saldo.limiteGastos()

        let somaDespesasTotal = despesas.reduce((incremento, acumulador) =>{
            return parseFloat(incremento) + parseFloat(acumulador.valor)
        },0)

        if (somaDespesasTotal){
            document.getElementById('progressoGastoTotal').className = 'bg-danger progress-bar'

            percentualTotal = (somaDespesasTotal * 100) / (saldo.limiteGastos()) 
            document.getElementById('progressoGastoTotal').style.width = `${percentualTotal}%`
            
            
            document.getElementById('progressoGastoTotal').innerHTML = `${percentualTotal.toFixed(0)}%`
            document.getElementById('saldoDisponivel').innerHTML = `R$${saldo.limiteGastos()}`

            if(percentualTotal < 30){
                document.getElementById('progressoGastoTotal').className = 'bg-success progress-bar'
            }

            if(percentualTotal > 30 && percentualTotal < 60 ){
                document.getElementById('progressoGastoTotal').className = 'bg-warning progress-bar'
            }

            if(percentualTotal > 60 && percentualTotal <= 100 ){
                document.getElementById('progressoGastoTotal').className = 'bg-danger progress-bar'
            }
        }
    }

    registroRecente(despesas){
        despesas.forEach(function(A){
            document.getElementById('MostrarDespesaRecente').innerHTML = `R$ ${A.valor}`
            document.getElementById('MostrarDespesaRecenteM').innerHTML = `R$ ${A.valor}`
        })
    }
    RelatorioDespesasGeral(despesas){

        let percentualTotal = 0

        saldo.limiteGastos()

        

        let somaDespesasTotal = despesas.reduce((incremento, acumulador) =>{
            return parseFloat(incremento) + parseFloat(acumulador.valor)
        },0)

        let saldoDisponivel = saldo.limiteGastos() - somaDespesasTotal

        document.getElementById('MostrarDespesas').innerHTML = `R$ ${somaDespesasTotal.toFixed(2)}`
        document.getElementById('saldoDisponivelTela').innerHTML = `R$ ${saldoDisponivel}`
    }
}
let bancoDados = new BancoDeDadosLocal()
let infoData = new Date()
let saldo = new Saldo()


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

function CarregaListagemDespesas(despesas = [], filtroSistema = false){
   
    if (despesas.length == 0 && filtroSistema == false){
        despesas = bancoDados.recuperarListagemCompletaDepesas()
    }

    let listaDespesas = document.getElementById('listagemDespesas')
    listaDespesas.innerHTML = ''
     //percorrer arrayDespesas

     despesas.forEach(function(despesaForEach){

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

        //exclusão do registros
        let botaoExcluir = document.createElement('button') 
        
        botaoExcluir.className = 'btn btn-outline-danger'
        botaoExcluir.innerHTML = '<i class="fas fa-trash"></i>'
        botaoExcluir.id = `ID_DESPESA_${despesaForEach.id}` 

        botaoExcluir.onclick= function(){
           
            let id = this.id.replace('ID_DESPESA_', '')
           
            bancoDados.excluirDespesa(id)
            window.location.reload()
        }
        tr.insertCell(4).append(botaoExcluir)
     })

     bancoDados.registroRecente(despesas)
     bancoDados.relatorioDespesas(despesas)

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
   let despesas =  bancoDados.pesquisar(despesaPesquisa)    
   CarregaListagemDespesas(despesas, true)
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
    constructor(idUsuario, usuario, senha, Rsenha){
        this.idUsuario = idUsuario
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
        idUsuario.value,
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
