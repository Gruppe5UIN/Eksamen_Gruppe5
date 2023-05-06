//Api url for games
const GAME_API_URL =
  'https://api.rawg.io/api/games?key=d2d5f79e22a6464d852e6cd6b671c8d7&page_size=20'

//gjøre om til ndjson
const toNdJson = (s) => {
  if (s.startsWith('[{') && s.endsWith('}]')) {
    s = s.substring(1, s.length - 1).replaceAll('},{', '}\n{')
  }
  return s
}

//async get function
const getGame = async () => {
  const url = GAME_API_URL
  const response = await fetch(url)

  const data = await response.json()
  return data.results
}

//lagrer resultat i res
const res = await getGame()

const selectedData = res.map((item) => {
  return {
    _type: 'game',
    apiId: item.id,
    title: item.name,
    playtime: item.playtime,
    slug: {
      _type: 'slug',
      current: item.slug,
    },

    //leser inn string liste kun for hjelp til å registrere ref til sjanger
    genres: item.genres.map((genre) => {
      return genre.name.toLowerCase()
    }),

    imageUrl: item.short_screenshots.map((image) => {
      return image.image
    }),
  }
})

//console.log(toNdJson(JSON.stringify(selectedData)))
