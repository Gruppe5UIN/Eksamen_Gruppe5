//Api url for games
const GAME_API_URL =
  'https://api.rawg.io/api/games?key=d2d5f79e22a6464d852e6cd6b671c8d7&page_size=20'

const LEGO_API_URL = 'https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&search=lego*&page_size=5'
const CAT_API_URL = 'https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&search=cat*&page_size=10' 
const DOG_API_URL = 'https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&search=dog*&page_size=10'
const TINTIN_API_URL = 'https://api.rawg.io/api/games?key=6ccebb406ca942cd8ddc8584b1da9a4f&search=tintin'
//gjøre om til ndjson
const toNdJson = (s) => {
  if (s.startsWith('[{') && s.endsWith('}]')) {
    s = s.substring(1, s.length - 1).replaceAll('},{', '}\n{')
  }
  return s
}

//async get function
const getGame = async () => {
  //const url = GAME_API_URL
  const url = TINTIN_API_URL
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
    avgPlaytime: item.playtime,
    slug: {
      _type: 'slug',
      current: item.slug,
    },

    //leser inn string liste kun for hjelp til å registrere ref til sjanger
    genresArr: item.genres.map((genre) => {
      return genre.name
    }),

    imageUrl: item.short_screenshots.map((image) => {
      return image.image
    }),
  }
})

console.log(toNdJson(JSON.stringify(selectedData)))
