//Variáveis globais
const pokemonName = document.querySelector('.pokemon_name'); //variável que se conecta a classe
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('form'); //variável que pega o que foi digitado no formulário/barra de pesquisa
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Função que faz a busca dos pokémons na API
// async torna a função assíncrona (funções que retornam uma promise/promessa)
const fetchPokemon = async (pokemon) => {

    /* await serve para que as linhas seguintes só sejam executadas
     após a busca ser feita na api, é usada somente em funções
     assíncronas */
    const APIResponse = await fetch( //procura o pokémon digitado
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    
    if(APIResponse.status === 200){ //condição para caso o usuário digite um valor inexistente
        // Capta o json contido na API das informações sobre o pokémon
        const data = APIResponse.json();
        return data;
    }
     
    
}

// Função que renderiza os dados para aparecerem na tela
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    //busca os dados do pokémon
    const data = await fetchPokemon(pokemon);

    if (data) {
        /*name é uma chave que está dentro da API
        Nessa linha ele identifica a string digitada pelo usuário no HTML
        que então recebe o nome que a variável data recebeu ao localizar
        o pokémon. Mesma coisa acontece com o id*/
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
    
        /*src equivale ao innerHTML, é usado por ser imagem
        os colchetes significam todo o caminho feito dentro do código
        da API até encontrar a imagem d esejada*/
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none'; //esconde a imagem, não exclui
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
    
}

form.addEventListener('submit', (event) => { //submit é quando o usuário digita e dá enter
    event.preventDefault(); //bloqueia o comportamento padrão
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => { //click é para quando o usuário clica no botão
    
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

buttonNext.addEventListener('click', (event) => { //click é para quando o usuário clica no botão
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);