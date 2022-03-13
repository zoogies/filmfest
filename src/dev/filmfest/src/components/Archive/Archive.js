import Contentpanel from "../Contentpanel/Contentpanel";

const data = [
    {"id":"69","author":"zoogs","title":"nose guy","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
    {"id":"420","author":"zoogs","title":"me fr","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/949365838870376538/IMG_7505.png"},
]

export default function(){
    return(
        <Contentpanel content={data}/>
    )
}