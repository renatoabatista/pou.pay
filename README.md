## Projeto Controle Financeiro - Pou.Pay

## Sobre o projeto
Aplicação web responsiva desenvolvida para consolidar os conhecimentos adqueridos atráves do consumo de documentação e curso JavaScript na UDEMY.

## Funcionalidades

Box informativo do saldo atual, considerando o total de despesas subritraido pelo limite de gasto esperado.
Box registro recente, retornando o último valor registrado pelo usuário.
Box despesas informa o valor total de despesas registradas.
Box cartão de crédito retorna o valor apenas de registros relacionados ao cartão de crédito.

Os registros são realizados atráves de um página especifica de cadastro de despesas, onde os dados são armazenados localmente em localStorage do navegador.

Campo gerêncial para adicionar o limite esperado de gastos (receita) no mês.

A cada nova solicitação de registro de uma despesas é solicitado dados relevantes ao usuário, sendo eles: ano, mês, dia, tipo de despesas, descrição da despesa e valor. Caso usuário não preencha umas dessas informações é retomado um modal, sinalizando em que existem campos a serem preenchidos, caso os valores de Ano, mes e dia não forem informados, será considerado a data atual.

Consulta de despesas demonstrando os valores lançados até a data com possibilidade de filtro em cada campo, ação disponível para deletar registros.

Barra de progresso condicional sinalizando graficamente e em percentual gasto.

## Tecnologias



