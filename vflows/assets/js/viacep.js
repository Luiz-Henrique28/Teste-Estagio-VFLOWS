function limpa_formulario() {
    document.getElementById('endereco').value = ("")
    document.getElementById('numero').value = ("")
    document.getElementById('complemento').value = ("")
    document.getElementById('bairro').value = ("")
    document.getElementById('municipio').value = ("")
    document.getElementById('estado').value = ("")
}

function preenche_campo(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById('endereco').value = (conteudo.logradouro)
        document.getElementById('complemento').value = (conteudo.complemento)
        document.getElementById('bairro').value = (conteudo.bairro)
        document.getElementById('municipio').value = (conteudo.localidade)
        document.getElementById('estado').value = (conteudo.uf)
    }
    else {
        limpa_formulario()
        alert("CEP não encontrado.")
    }
}

async function pesquisacep(valor) {
    let cep = valor.replace(/\D/g, '')
    if (cep != "") {
        let validacep = /^[0-9]{8}$/

        if (validacep.test(cep)) {
            await fetch('https://viacep.com.br/ws/' + cep + '/json')
                .then(response => response.json())
                .then(data => preenche_campo(data))
                .catch(Error => console.log(Error))
        }
        else {
            limpa_formulario()
            alert("Formato de CEP inválido.")
        }
    } else {
        limpa_formulario()
    }
}