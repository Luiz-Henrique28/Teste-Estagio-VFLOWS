 // Adiciona um produto
const btnAdicionarProduto = document.getElementById('btnAdicionarProduto')
btnAdicionarProduto.addEventListener('click', () => {
    const produto = document.createElement('div')
    const listaDeProdutos = document.getElementById('listaDeProdutos')
    produto.className = 'd-flex align-items-center produto'
    produto.innerHTML = `
        <button class="mr-3 p-1 rounded bg-danger btnDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
        </button>
        <fieldset class="d-flex flex-column flex-md-row align-items-center">
            <legend></legend>
            <div class="d-flex justify-content-center align-items-center rounded-circle mr-0 mb-3 mr-md-3 mb-md-0" style="width: 130px height: 100px; background: rgba(130,144,205,255);">
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="white" class="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                </svg>
            </div>
            <div class="w-100">
                <div class="form-group">
                    <label for="produto">Produto</label>
                    <input type="text" id="produto" class="form-control">
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label for="undMedida">UND. medida</label>
                        <div class="input-group">
                            <input type="text" class="form-control undMedida" aria-label="Text input with dropdown button" placeholder="">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary dropdown-toggle bg-dark text-white" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" onclick="selecionarOpcao(this, 'Test 1')">Test 1</a>
                                    <a class="dropdown-item" onclick="selecionarOpcao(this, 'Test 2')">Test 2</a>
                                    <a class="dropdown-item" onclick="selecionarOpcao(this, 'Test 3')">Test 3</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-3">
                        <label for="qtdEstoque">QTDE. em Estoque</label>
                        <input oninput="calculaValorTotal(this)" type="text" id="qtdEstoque" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="valorUnitario">Valor Unitário</label>
                        <input oninput="calculaValorTotal(this)" type="text" id="valorUnitario" class="form-control">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="valorTotal">Valor Total</label>
                        <input type="text" id="valorTotal" class="form-control" readonly>
                    </div>
                </div>
            </div>
        </fieldset>
    `

    listaDeProdutos.appendChild(produto)
    atualizarTituloProduto()

    // Adiciona evento de exclusão
    const btnDelete = produto.querySelector('.btnDelete');
    btnDelete.addEventListener('click', () => {
        listaDeProdutos.removeChild(produto)
        atualizarTituloProduto()
    })
})

// Reordena numeração dos produtos
function atualizarTituloProduto() {
    let tituloProdutos = document.querySelectorAll('.produto legend')
    tituloProdutos.forEach((elemento, index) => {
        elemento.textContent = `Produto - ${index + 1}`
    })
}

// Selecionar uma opção do dropdown e preencher o input
function selecionarOpcao(element, value) {
    const undMedidaInput = element.closest('.input-group').querySelector('.undMedida')
    undMedidaInput.value = value
}

// Calcula valor total do produto
function calculaValorTotal(element){
    const qtdEstoque = element.closest('.form-row').querySelector('#qtdEstoque').value
    const valorUnitario = element.closest('.form-row').querySelector('#valorUnitario').value
    let valorTotalInput = element.closest('.form-row').querySelector('#valorTotal')
    
    valorTotalInput.value = (qtdEstoque * valorUnitario)
}