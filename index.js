const handleClickChooseMovie = async () => {
  try {
    setLoading()
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?language=pt-BR&page=${parseInt((Math.random() * 10) + 1)}&query=${randomWords()}&api_key=4227e6de25d38d75fffe9086cac8c78c`)
    const choosen = data.results[parseInt((Math.random() * data.results.length) + 1)]

    if (!choosen || !choosen.overview) {
      handleClickChooseMovie()
      return
    }

    const resultBoxExisits = document.querySelector('.result--Box')
    if (resultBoxExisits) {
      document.querySelector('.movie-chooser').removeChild(resultBoxExisits)
    }

    const resultBox = document.createElement('div')
    resultBox.classList.add('result--Box');
    const h2Element = document.createElement('h2')
    h2Element.innerText = 'O filme escolhido é:'
    resultBox.appendChild(h2Element)
    const columnsElement = document.createElement('div')
    columnsElement.classList.add('columns')
    resultBox.appendChild(columnsElement)
    const imgElement = document.createElement('img')
    imgElement.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${choosen.poster_path}`
    imgElement.alt = choosen.title
    columnsElement.appendChild(imgElement)

    const descriptionElement = document.createElement('div')
    descriptionElement.classList.add('description')
    columnsElement.appendChild(descriptionElement)
    const h3Element = document.createElement('h3')
    h3Element.innerText = choosen.title
    descriptionElement.appendChild(h3Element)
    const pElement = document.createElement('p')
    pElement.innerText = choosen.overview
    descriptionElement.appendChild(pElement)

    document.querySelector('.movie-chooser').appendChild(resultBox)

    document.querySelector('#buttonMovie').innerText = 'Escolher novamente'
    setLoading(false)
  } catch (error) {
    setLoading(false)
    console.error(error.message)
  }
}

const setLoading = (action = true) => {
  const loadingElement = document.querySelector('#loading')
  if (action) {
    if (loadingElement) {
      return
    }
    const loading = document.createElement('div')
    loading.id = 'loading'
    const gif = document.createElement('img')
    gif.src = './images/loading.gif'
    gif.alt = 'Carregando filmes'
    const text =document.createElement('strong')
    text.innerText = 'Carregando...'

    loading.appendChild(gif)
    loading.appendChild(text)

    document.querySelector('body').prepend(loading)
    return
  }

  if (!loadingElement) {
    return
  }

  document.querySelector('body').removeChild(loadingElement)
}