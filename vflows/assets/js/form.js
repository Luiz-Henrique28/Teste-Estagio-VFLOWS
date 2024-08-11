document.getElementById('btnSalvar').addEventListener('click', () => {
    
    const razaoSocial = document.getElementById('razaoSocial').value.trim()
    const nomeFantasia = document.getElementById('nomeFantasia').value.trim()
    const cnpj = document.getElementById('cnpj').value.trim()
    const inscricaoEstadual = document.getElementById('inscricaoEstadual').value.trim()
    const inscricaoMunicipal = document.getElementById('inscricaoMunicipal').value.trim()
    const nomeContato = document.getElementById('nomeDaPessoaDeContato').value.trim()
    const telefoneContato = document.getElementById('telefone').value.trim()
    const emailContato = document.getElementById('email').value.trim()

    if (!razaoSocial || !nomeFantasia || !cnpj || !nomeContato || !telefoneContato || !emailContato) {
        alert('Por favor, preencha todos os campos obrigatórios.')
        return
    }

    // Valida produtos
    const produtos = []
    let produtosValidos = false
    document.querySelectorAll('.produto').forEach((produtoElement, index) => {
        const descricao = produtoElement.querySelector('#produto').value.trim()
        const unidadeMedida = produtoElement.querySelector('.undMedida').value.trim()
        const quantidadeEstoque = produtoElement.querySelector('#qtdEstoque').value.trim()
        const valorUnitario = produtoElement.querySelector('#valorUnitario').value.trim()
        const valorTotal = produtoElement.querySelector('#valorTotal').value.trim()

        if (descricao && unidadeMedida && quantidadeEstoque && valorUnitario) {
            produtos.push({
                indice: index + 1,
                descricaoProduto: descricao,
                unidadeMedida: unidadeMedida,
                qtdeEstoque: quantidadeEstoque,
                valorUnitario: valorUnitario,
                valorTotal: valorTotal
            })
            produtosValidos = true
        }
    })

    if (!produtosValidos) {
        alert('Por favor, adicione pelo menos um produto válido.')
        return
    }

    // Valida anexos
    const anexos = JSON.parse(sessionStorage.getItem('anexos') || '[]')
    if (anexos.length === 0) {
        alert('Por favor, adicione pelo menos um anexo.')
        return
    }

    const dados = {
        razaoSocial,
        nomeFantasia,
        cnpj,
        inscricaoEstadual,
        inscricaoMunicipal,
        nomeContato,
        telefoneContato,
        emailContato,
        anexos,
        produtos
    }

    // Exibe o modal de carregamento
    mostrarModalCarregamento()

    // Exibe o JSON no console
    console.log(JSON.stringify(dados, null, 2))
})

function limparCamposFormulario() {
    document.getElementById('razaoSocial').value = ''
    document.getElementById('nomeFantasia').value = ''
    document.getElementById('cnpj').value = ''
    document.getElementById('inscricaoEstadual').value = ''
    document.getElementById('inscricaoMunicipal').value = ''
    document.getElementById('nomeDaPessoaDeContato').value = ''
    document.getElementById('telefone').value = ''
    document.getElementById('email').value = ''

    // Limpar produtos
    const listaDeProdutos = document.getElementById('listaDeProdutos')
    while (listaDeProdutos.firstChild) {
        listaDeProdutos.removeChild(listaDeProdutos.firstChild)
    }

    // Limpar anexos
    sessionStorage.removeItem('anexos')

    // Limpar dados de sessionStorage
    sessionStorage.clear()
}
