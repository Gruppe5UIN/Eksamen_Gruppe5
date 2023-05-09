
import { TagCloud } from 'react-tagcloud'

export default function WordCloud({gameTags}){

  const cloudTags = gameTags?.map((tag, index) => {
    return({
        value: tag.name,
        count: tag.games_count,
        key: index
    }
    )
  })
  
    return (
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={cloudTags}
            onClick={tag => alert(`'${tag.value}' was selected!`)}/>
    )
}