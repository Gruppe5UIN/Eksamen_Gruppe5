
import { TagCloud } from 'react-tagcloud'

export default function WordCloud({ gameTags }) {

  // Lager et array med tags som skal brukes i wordcloud
  const cloudTags = gameTags.map((tag, index) => {
    // Returnerer et objekt med tag navn, antall spill med taggen og en key
    return ({
      value: tag.name,
      count: tag.games_count,
      key: index
    }
    )
  })

  // Lager et objekt med options for wordcloud
  const options = {
    // Setter farge på taggen
    luminosity: 'dark',
    hue: 'blue',
  }

  return (
    <TagCloud
      minSize={18}
      maxSize={42}
      tags={cloudTags}
      colorOptions={options}
    />
  )
}