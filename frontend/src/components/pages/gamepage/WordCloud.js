
import { TagCloud } from 'react-tagcloud'

export default function WordCloud({gameTags}){
  
  const cloudTags = gameTags.map((tag, index) => {
    return({
        value: tag.name,
        count: tag.games_count,
        key: index
    }
    )
  })

  const options = {
    luminosity: 'dark',
    hue: 'blue',
  }
  
    return (
        <TagCloud
            minSize={18}
            maxSize={42}
            tags={cloudTags}
            colorOptions={options}
            onClick={tag => alert(`'${tag.value}' was selected!`)}/>
    )
}