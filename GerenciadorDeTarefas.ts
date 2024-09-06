import * as extras from './Function'

while (true) {
    console.log(`||| GERENCIADOR DE TAREFAS |||
        MENU:
        0 - Encerrar
        1 - Adicionar Nova Tarefa
        2 - Listar Tarefas
        3 - Editar Tarefa
        4 - Remover Tarefa
        5 - Marcar Tarefa como concluída
        6 - Pesquisar Tarefas
        7 - Resumo das Tarefas`)

    const menu: number = parseInt(prompt('Ir:') || 'NaN')
    if (isNaN(menu)) {
        console.log('Entrada Inválida. Tente novamente.')
        continue
    }

    switch (menu) {
        case 0:
            console.log('ENCERRANDO...')
            break
        case 1:
            console.clear()
            extras.AdicionarNovaTarefa()
            break
        case 2:
            console.clear()
            extras.ListarTarefas()
            break
        case 3:
            console.clear()
            extras.EditarTarefas()
            break
        case 4:
            console.clear()
            const opcao: number = parseInt(prompt('Digite (1) para excluir uma tarefa pendente e (2) para excluir uma tarefa concluída') || 'NaN')
            if (isNaN(opcao)) {
                console.clear()
                console.log('Entrada Inválida. Tente Novamente.')
            } else if (opcao === 1) {
                extras.RemoverTarefaPendente()
            } else {
                extras.RemoverTarefaConcluida()
            }
            break
        case 5:
            console.clear()
            extras.MarcarComoConcluido()
            break
        case 6:
            console.clear()
            extras.PesquisarTarefa()
            break
        case 7:
            console.clear()
            extras.ResumoDasTarefas()
            break;
        default:
            console.log('Opção inválida.')
    }

    if (menu === 0) break
}
