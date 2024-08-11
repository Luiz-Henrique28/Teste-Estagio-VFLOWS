document.getElementById('btnAddAnexo').addEventListener('click', () => {
    const listaDeItens = document.getElementById('listaDeItens')
    const anexo = document.createElement('div')
    anexo.className = 'form-row align-items-center p-3 anexo'
    anexo.innerHTML = `
        <input type="file" class="inputFile" style="display:none;">
        <button class="mr-3 p-1 rounded bg-danger btnDeleteAnexo">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
        <button class="mr-3 p-1 rounded bg-primary btnViewAnexo">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
            </svg>
        </button>
        <span class="filename">Nome do anexo</span>
    `

    listaDeItens.appendChild(anexo)

    const btnDelete = anexo.querySelector('.btnDeleteAnexo')
    btnDelete.addEventListener('click', () => {
        listaDeItens.removeChild(anexo)
        removerAnexoDoSessionStorage(anexo.querySelector('.filename').textContent)
    })

    const btnView = anexo.querySelector('.btnViewAnexo')
    const inputFile = anexo.querySelector('.inputFile')
    inputFile.addEventListener('change', event => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const fileContent = reader.result
                const filename = file.name
                const blob = new Blob([fileContent], { type: file.type })
                const index = document.querySelectorAll('.anexo').length 

                armazenarAnexoNoSessionStorage(index, filename, blob)

                anexo.querySelector('.filename').textContent = filename

                btnView.addEventListener('click', () => {
                    const downloadLink = document.createElement('a')
                    downloadLink.href = URL.createObjectURL(blob)
                    downloadLink.download = filename
                    downloadLink.click()
                })
            }
            reader.readAsArrayBuffer(file)
        }
    })

    inputFile.click()
})

function armazenarAnexoNoSessionStorage(indice, nome, blob) {
    const anexos = JSON.parse(sessionStorage.getItem('anexos') || '[]')
    anexos.push({ indice, nomeArquivo: nome, blobArquivo: URL.createObjectURL(blob) })
    sessionStorage.setItem('anexos', JSON.stringify(anexos))
}

function removerAnexoDoSessionStorage(nome) {
    const anexos = JSON.parse(sessionStorage.getItem('anexos') || '[]')
    const anexosAtualizados = anexos.filter(anexo => anexo.nomeArquivo !== nome)
    sessionStorage.setItem('anexos', JSON.stringify(anexosAtualizados))
}

document.addEventListener('DOMContentLoaded', () => {
    const listaDeItens = document.getElementById('listaDeItens')
    const anexos = JSON.parse(sessionStorage.getItem('anexos') || '[]')
    anexos.forEach(anexo => {
        const divAnexo = document.createElement('div')
        divAnexo.className = 'form-row align-items-center p-3 anexo'
        divAnexo.innerHTML = `
            <button class="mr-3 p-1 rounded bg-danger btnDeleteAnexo">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
            <button class="mr-3 p-1 rounded bg-primary btnViewAnexo">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>
            </button>
            <span class="filename">${anexo.nomeArquivo}</span>
        `
        listaDeItens.appendChild(divAnexo)

        const btnView = divAnexo.querySelector('.btnViewAnexo')
        const downloadLink = document.createElement('a')
        downloadLink.href = anexo.blobArquivo
        downloadLink.download = anexo.nomeArquivo

        btnView.addEventListener('click', () => {
            downloadLink.click()
        })

        divAnexo.querySelector('.btnDeleteAnexo').addEventListener('click', () => {
            listaDeItens.removeChild(divAnexo)
            removerAnexoDoSessionStorage(anexo.nomeArquivo)
        })
    })
})
