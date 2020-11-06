## Projeto Controle Financeiro - Pou.Pay

## O que aprendi? 

Conceitos básicos em JavaScript com paradgma da orientação a objetos
Trabalhar com class, localStorage, filter, forEach, reduce, manipulação de elementos DOM e API JSON.

## Sobre o projeto
Aplicação web responsiva desenvolvida para consolidar os conhecimentos adqueridos atráves do consumo de documentação e curso JavaScript na UDEMY.

## Funcionalidades

<p>Box informativo do saldo atual, considerando o total de despesas subritraido pelo limite de gasto esperado.</p>
<p>Box registro recente, retornando o último valor registrado pelo usuário.</p>
<p>Box despesas informa o valor total de despesas registradas.</p>
<p>Box cartão de crédito retorna o valor apenas de registros relacionados ao cartão de crédito.</p>

Os registros são realizados atráves de um página especifica de cadastro de despesas, onde os dados são armazenados localmente em localStorage do navegador.

Campo gerêncial para adicionar o limite esperado de gastos (receita) no mês.

A cada nova solicitação de registro de uma despesas é solicitado dados relevantes ao usuário, sendo eles: ano, mês, dia, tipo de despesas, descrição da despesa e valor. Caso usuário não preencha umas dessas informações é retomado um modal, sinalizando em que existem campos a serem preenchidos, caso os valores de Ano, mes e dia não forem informados, será considerado a data atual.

Consulta de despesas demonstrando os valores lançados até a data com possibilidade de filtro em cada campo, ação disponível para deletar registros.

Barra de progresso condicional sinalizando graficamente e em percentual gasto.

## Tecnologias
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

## Framework
BootStrap 4

## Telas
<img src="https://raw.githubusercontent.com/renatoabatista/pou.pay/master/screen/01.png">
