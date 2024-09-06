interface Tarefa{
    TITULO:string;
    DESCRIÇÃO: string;
    VENCIMENTO: string;
    PRIORIDADE: 'BAIXA'|'MÉDIA'|'ALTA';
    CRIAÇÃO: string
} 

const listaConcluido: Tarefa[] = []
const listaPendente: Tarefa[] = []

export function AdicionarNovaTarefa(){
    console.clear
    console.log('>>>> ADICIONAR NOVA TAREFA')

    function datavenc(){
        let dataVencimentoStr: string = ''
        let dataValida: boolean = false
        let dataVencimento: Date | undefined = undefined

    while (!dataValida){
        dataVencimentoStr = prompt('Insira a data de VENCIMENTO da tarefa no formato dd/mm/aaaa: ') || ''
        const [dia, mes, ano]  = dataVencimentoStr.split('/').map(Number)

        if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 2023){
            console.log('Data inválida. Certifique-se de inserir a data no formato dd/mm/aaaa.')
        } else{
            dataVencimento = new Date(ano, mes-1, dia)
            dataValida = true
        }
    }

    const diaFormatado = String(dataVencimento?.getDate()).padStart(2, '0')
    const mesFormatado = String(dataVencimento?.getMonth()! + 1).padStart(2, '0');
    const anoFormatado = dataVencimento?.getFullYear();

    return `${diaFormatado}/${mesFormatado}/${anoFormatado}`
    }  

    const novaTarefa: Tarefa = {
        TITULO: prompt('Insira o título da tarefa: ')||'',
        DESCRIÇÃO: prompt('Insira a descrição da tarefa: ') || '',
        VENCIMENTO: datavenc(),
        PRIORIDADE: (() => {
            const prioridadeNumero = prompt('Insira a prioridade da tarefa (1 = BAIXA, 2 = MÉDIA, 3 = ALTA): ') || '1';
            let prioridadeTexto: 'BAIXA' | 'MÉDIA' | 'ALTA';

            switch (prioridadeNumero) {
                case '1':
                    prioridadeTexto = 'BAIXA';
                    break;
                case '2':
                    prioridadeTexto = 'MÉDIA';
                    break;
                case '3':
                    prioridadeTexto = 'ALTA';
                    break;
                default:
                    console.log('Opção inválida. Usando padrão BAIXA.');
                    prioridadeTexto = 'BAIXA';
                    break;
            }
            return prioridadeTexto;
        })(),
        CRIAÇÃO: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    listaPendente.push(novaTarefa);
    console.log('Tarefa adicionada com sucesso!');
    console.table(listaPendente);
}

export function ListarTarefas(){
    console.clear()

    let escolha: number
    let filtro: number
    let filtroPor: number
    let prioridade: string
    let dataVencimento: string
    let criterio: number
    let listaFiltrada: Tarefa[]

    while (true) {
        console.log('>>>> LISTAR TAREFAS');
        escolha = parseInt(prompt(`1- Lista de pendentes
2- Lista de concluídas
3- Listar pendentes e concluídas separadamente
            
Qual você deseja ver?`)!)

        if (escolha === 1 || escolha === 2 || escolha === 3) {
            break
        } else {
            console.clear()
            console.log('Escolha inválida! Digite uma opção válida')
        }
    }

    if (escolha === 1 || escolha === 2) {
        let lista = escolha === 1 ? listaPendente : listaConcluido
        listaFiltrada = [...lista]

        // Loop para garantir que o usuário escolha se deseja filtrar ou não
        while (true) {
            console.clear()
            filtro = parseInt(prompt(`1- Sim
                2- Não
                Deseja filtrar as tarefas?
                `)!);

            if (filtro === 1 || filtro === 2) {
                break
            } else {
                console.clear()
                console.log('Escolha inválida! Digite uma opção válida')
            }
        }

        // Se o usuário optar por filtrar as tarefas
        if (filtro === 1) {
            console.clear()
            filtroPor = parseInt(prompt(`1- Filtrar por prioridade
                2- Filtrar por data de vencimento
                Escolha o filtro desejado: `)!)

            switch (filtroPor) {
                case 1:
                    console.clear();
                    prioridade = prompt('Digite a prioridade desejada (por exemplo, 1 para alta, 2 para média, 3 para baixa): ')!
                    listaFiltrada = listaFiltrada.filter(tarefa => {
                        switch (prioridade) {
                            case '1': return tarefa.PRIORIDADE === 'ALTA'
                            case '2': return tarefa.PRIORIDADE === 'MÉDIA'
                            case '3': return tarefa.PRIORIDADE === 'BAIXA'
                            default: return false
                        }
                    })
                    break

                case 2:
                    console.clear()
                    dataVencimento = prompt('Digite a data de vencimento desejada no formato AAAA-MM-DD:')!
                    listaFiltrada = listaFiltrada.filter(tarefa => tarefa.VENCIMENTO === dataVencimento)
                    break

                default:
                    console.clear()
                    console.log('Escolha inválida!')
            }
        }

        // Loop para garantir que o usuário escolha um critério de ordenação válido
        while (true) {
            console.clear()
            criterio = parseInt(prompt(`1- Data de VENCIMENTO
                2- PRIORIDADE
                3- Data de criação
                Como você quer ordenar a lista?`)!)

            if (criterio === 1 || criterio === 2 || criterio === 3) {
                break
            } else {
                console.clear()
                console.log('Escolha inválida! Digite uma opção válida')
            }
        }

        // Aplica a ordenação escolhida pelo usuário
        switch (criterio) {
            case 1:
                console.clear();
                listaFiltrada.sort((a, b) => new Date(a.VENCIMENTO).getTime() - new Date(b.VENCIMENTO).getTime())
                break

            case 2:
                console.clear()
                listaFiltrada.sort((a, b) => {
                    const prioridades = { 'ALTA': 1, 'MÉDIA': 2, 'BAIXA': 3 }
                    return prioridades[a.PRIORIDADE] - prioridades[b.PRIORIDADE]
                })
                break

            case 3:
                console.clear()
                listaFiltrada.sort((a, b) => {
                    const dataA = a.CRIAÇÃO.split('/').reverse().join('')
                    const dataB = b.CRIAÇÃO.split('/').reverse().join('')
                    return dataA.localeCompare(dataB)
                })
                break
        }

        console.clear()

        // Definindo cores para exibir as tarefas no console
        const corTexto = escolha === 1 ? '\x1b[31m' : '\x1b[32m'
        const corReset = '\x1b[0m'

        // Função para formatar a tabela com cor
        function formatarTabelaComCor(lista: Tarefa[]): Tarefa[] {
            return lista.map(tarefa => ({
                ...tarefa,
                TITULO: `${corTexto}${tarefa.TITULO}${corReset}`
            }))
        }

        console.log(`
            Lista de Tarefas:`)
        console.table(formatarTabelaComCor(listaFiltrada))

    } else if (escolha === 3) { // Se o usuário escolheu ver as listas separadamente
        console.clear()
        console.log('>>>> LISTA DE TAREFAS PENDENTES');
        console.log('\x1b[31m')
        listaFiltrada = [...listaPendente]
        console.table(listaFiltrada)
        console.log('\x1b[0m')

        console.log('>>>> LISTA DE TAREFAS CONCLUÍDAS')
        console.log('\x1b[32m')
        listaFiltrada = [...listaConcluido]
        console.table(listaFiltrada)
        console.log('\x1b[0m')
    }
}

export function RemoverTarefaConcluida(){
    console.clear()
    console.log('>>>> REMOVER TAREFA CONCLUIDA')
    console.table(listaConcluido)
    const RemoverTarefa = prompt('Digite o título da tarefa que deseja remover: ') ||''
    const indice = listaConcluido.findIndex(f => f.TITULO === RemoverTarefa)
    const confirme = parseInt(prompt(`Tem certeza que deseja remover ${RemoverTarefa}? 1 - SIM 2 - NÃO`) ||'2')

    if (confirme === 1 ){
        if (indice !== -1){
            const TarefaRemovida = listaConcluido.splice(indice, 1)
            console.log('Tarefa removida', TarefaRemovida[0])
            console.log('Lista atualizada:')
            console.table(listaConcluido)
        } else {
            console.log('Tarefa não encontrada!')
        }
    } else if (confirme === 2 ){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else{
        console.log('Não conseguimos identificar a sua escolha :(')
    }
    console.clear()
}

export function RemoverTarefaPendente(){
    console.clear()
    console.log('>>>> REMOVER TAREFA PENDENTE')
    console.table(listaPendente)
    const RemoverTarefa = prompt('Digite o título da tarefa que deseja remover: ') || ''
    const indice = listaPendente.findIndex(f => f.TITULO === RemoverTarefa)
    const confirme = parseInt(prompt(`Tem certeza que deseja remover ${RemoverTarefa}? 1 - SIM 2 - NÃO`) || '2')

    if (confirme === 1){
        if (indice!== -1){
            const TarefaRemovida = listaPendente.splice(indice, 1)
            console.log('Tarefa removida:', TarefaRemovida[0])
            console.log('Lista atualizada: ')
            console.table(listaPendente)
        } else{
            console.log('Tarefa não encontrada')
        }
    } else if (confirme === 2){
        console.log('Operação de REMOÇÃO CANCELADA')
    } else {
        console.log('Não conseguimos identificar a sua escolha :(')
    }
    console.clear()
}

export function PesquisarTarefa(){
    console.clear()
    console.log('>>>> PESQUISAR TAREFA')
    const tarefaPesquisada = prompt('Digite o TITULO ou a DESCRIÇÃO da tarefa que está procurando: ') || ''
    let presenteConcluido = false
    let presentePendente = false

    presenteConcluido = listaConcluido.some(tarefa => tarefa.TITULO.includes(tarefaPesquisada) || tarefa.DESCRIÇÃO.includes(tarefaPesquisada))
    presentePendente = listaPendente.some(tarefa => tarefa.TITULO.includes(tarefaPesquisada) || tarefa.DESCRIÇÃO.includes(tarefaPesquisada))

    if (presenteConcluido){
        console.log('A tarefa foi encontrada na lista de concluídas!')
        console.table(listaConcluido)
    } else if (presentePendente){
        console.log('A tarefa foi encontrada na lista de pendentes!')
        console.table(listaPendente)
    } else{
        console.log('NÃO HÁ TAREFAS COM ESSAS CARACTERÍSTICAS! Verifique a ortografia e tente novamente.')
    }
}

export function MarcarComoConcluido(){
    console.clear()
    console.log('>>>> MARCAR TAREFA COMO CONCLUÍDA')
    console.table(listaPendente)
    const id = parseInt(prompt('Digite o id da tarefa que você quer marcar como concluída: ') || '0')

    const [tarefa] = listaPendente.splice(id, 1)
    listaConcluido.push(tarefa)
    console.log('tarefa marcada como concluída!')
    console.clear()
}

export function ResumoDasTarefas() {
    console.clear()
    console.log('>>>> RESUMO DAS TAREFAS');

    const TotalDeTarefas: number = listaConcluido.length + listaPendente.length
    const TotalDePendentes: number = listaPendente.length
    const TotalDeConcluidos: number = listaConcluido.length

    function TarefaMaisProximaDeVencer(): Tarefa | null {
        const agora: Date = new Date()
        let tarefaMaisProxima: Tarefa | null = null
        let menorDiferenca: number = Infinity

        for (const tarefa of listaPendente) {
            const [dia, mes, ano] = tarefa.VENCIMENTO.split('/').map(Number)
            const dataVencimento: Date = new Date(ano, mes - 1, dia)
            const diferenca: number = dataVencimento.getTime() - agora.getTime()

            if (diferenca >= 0 && diferenca < menorDiferenca) {
                menorDiferenca = diferenca
                tarefaMaisProxima = tarefa
            }
        }
        return tarefaMaisProxima
    }

    const tarefaProxima: Tarefa | null = TarefaMaisProximaDeVencer()

    console.log(`Existem ${TotalDeTarefas} registradas no gerenciador
        ${TotalDePendentes} são tarefas pendentes
        ${TotalDeConcluidos} são tarefas concluídas`);

    if (tarefaProxima) {
        const dataFormatada: string = new Date(tarefaProxima.VENCIMENTO.split('/').reverse().join('-')).toLocaleDateString('pt-BR')
        console.log(`A tarefa mais próxima de vencer é: ${tarefaProxima.TITULO}, com vencimento em ${dataFormatada}`)
    } else {
        console.log('Não há tarefas pendentes.')
    }
}
export function EditarTarefas(){
    console.clear()
    console.log('>>>> EDITAR TAREFA')
    console.table(listaPendente)

    let IDTarefaEditar: number | undefined = undefined

    while (true){
        IDTarefaEditar = parseInt(prompt('Qual o ID da tarefa que você quer editar? ') || '')
        if (!isNaN(IDTarefaEditar) && IDTarefaEditar >= 0 && IDTarefaEditar <= listaPendente.length - 1){
            break
        } else{
            console.log('ID DE TAREFA NÃO ENCONTRADADO\nTENTE NOVAMENTE!')
        }
    }

    let ContinuarEditando = true
    
    while(ContinuarEditando){
        const propriedade = prompt(`1- Título
2- Descrição
3- Data de vencimento
4- Prioridade
Qual propriedade você deseja editar?`)

switch (propriedade) {
    case '1':
        listaPendente[IDTarefaEditar].TITULO = prompt('Digite o novo título: ') || listaPendente[IDTarefaEditar].TITULO;
        break;
    case '2':
        listaPendente[IDTarefaEditar].DESCRIÇÃO = prompt('Digite a nova descrição: ') || listaPendente[IDTarefaEditar].DESCRIÇÃO;
        break;
    case '3':
        let dataVencimentoStr = prompt('Insira a data de VENCIMENTO da tarefa no formato dd/mm/aaaa: ');
        if (dataVencimentoStr) {
            let [dia, mes, ano] = dataVencimentoStr.split('/').map(Number);
            if (!isNaN(dia) && !isNaN(mes) && !isNaN(ano) && dia > 0 && dia <= 31 && mes > 0 && mes <= 12 && ano >= 1900) {
                listaPendente[IDTarefaEditar].VENCIMENTO = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
            } else {
                console.log('Data inválida. Certifique-se de inserir a data no formato dd/mm/aaaa.');
            }
        }
        break;
    case '4':
        let prioridade = parseInt(prompt('Defina o grau de PRIORIDADE da tarefa (1 = Baixa, 2 = Média, 3 = Alta): ') || '');
        switch (prioridade) {
            case 1:
                listaPendente[IDTarefaEditar].PRIORIDADE = 'BAIXA';
                break;
            case 2:
                listaPendente[IDTarefaEditar].PRIORIDADE = 'MÉDIA';
                break;
            case 3:
                listaPendente[IDTarefaEditar].PRIORIDADE = 'ALTA';
                break;
            default:
                console.log('Prioridade inválida. Por favor, escolha entre 1, 2 ou 3.');
                continue;
        }
        break;
    default:
        console.log('Escolha inválida!');
        continue;
}

    while (true){
        let opcao = parseInt(prompt(`1- SIM
2- NÃO
Você deseja continuar editando?`) || '')
        if (opcao === 2){
            ContinuarEditando = false
            break
        } else if (opcao === 1){
            break
        } else {
            console.log('Opção inválida')
        }

    }
}
console.clear()
}