
const galeriaContainer = document.querySelector('.conteudo-galeria');



const jsonURL = './fotos.json'; 

async function carregarFotos() {
    const avisoCarregamento = document.querySelector('.aviso-carregamento');
    if (avisoCarregamento) {
        avisoCarregamento.textContent = "Carregando nosso mural de amor...";
    }

    try {
        const response = await fetch(jsonURL);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar o JSON: Status ${response.status}`);
        }

        const fotos = await response.json(); 
        
        galeriaContainer.innerHTML = ''; 
        
        fotos.forEach(foto => {
            const fotoItem = document.createElement('div');
            fotoItem.classList.add('foto-item');

            const img = document.createElement('img');
            
            img.src = foto.imagem; 
            img.alt = foto.texto;  
            
            fotoItem.appendChild(img);
            galeriaContainer.appendChild(fotoItem);
        });

        if (avisoCarregamento) {
            avisoCarregamento.style.display = 'none';
        }

    } catch (error) {
        console.error('Falha ao carregar as fotos:', error);
        if (avisoCarregamento) {
             avisoCarregamento.textContent = 'Ops! Não consegui carregar nossas fotos. Verifique o console do navegador (F12) para o caminho exato do erro.';
             avisoCarregamento.style.color = '#c2185b'; 
        }
    }
}

carregarFotos();