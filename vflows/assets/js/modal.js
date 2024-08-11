function mostrarModalCarregamento() {
    const modalCarregamento = new bootstrap.Modal(document.getElementById('modalCarregamento'))
    modalCarregamento.show()

    setTimeout(function() {
        modalCarregamento.hide()
        limparCamposFormulario()
    }, 2000)
}
