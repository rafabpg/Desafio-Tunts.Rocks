# Desafio Tunts.Rocks 2024

Repositorio referente ao desáfio técnico da Tunts.rocks 2024.

# Sobre

Calcular a situação de cada aluno baseado na média das 3 provas (P1, P2 e P3), conforme a tabela:

Média (m) Situação:

- m<5 - Reprovado por Nota

- 5<=m<7 - Exame Final

- m>=7 - Aprovado

Caso o número de faltas ultrapasse 25% do número total de aulas o aluno terá a situação "Reprovado por Falta", independente da média. Caso a situação seja "Exame Final" é necessário calcular a "Nota para Aprovação Final"(naf) de cada aluno de acordo com seguinte fórmula:

5 <= (m + naf)/2

Caso a situação do aluno seja diferente de "Exame Final", preencha o campo "Nota para Aprovação Final" com 0.

# Formas de executar o script

## Primeira Forma

  1. Abra o Google Sheets vinculado à sua cópia da planilha.
  2. No menu superior, vá para "Extensions" -> "Apps Script".
  3. Cole o código fornecido no Editor de Scripts.
  4. Salve o projeto.
  5. Execute manualmente a função `init()` clicando no ícone de "play" na barra de ferramentas.

## Segunda Forma

  1. Entrar em minha [planilha](https://docs.google.com/spreadsheets/d/15pCs_HLp92XSlz0K6XVfrb70G3USwcnyAX-OeHvPUL4/edit?usp=sharing).
  2. Clicar no botão `Rodar` para executar o Script.

Note: Certifique-se de conceder as permissões necessárias quando solicitado.

Documentação utilizada: 
- https://developers.google.com/sheets/api/guides/concepts
