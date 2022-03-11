import Contentpanel from "../Contentpanel/Contentpanel";
import Navbar from "../Navbar/Navbar";
import TitleBar from "../TitleBar/TitleBar";

//temp testing data for creating video panels
const data = [
    {"id":"69","title":"schnozzie","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
    {"id":"420","title":"me fr","thumbnail":"https://media.discordapp.net/attachments/682005199132688450/949365838870376538/IMG_7505.png"},
]

export default function Home(){
    return(
        <>
        <TitleBar/>
        <Navbar/>
        <Contentpanel content={data}/>
        </>
    );
}