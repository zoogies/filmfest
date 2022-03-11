import Contentpanel from "../Contentpanel/Contentpanel";
import Navbar from "../Navbar/Navbar";
import TitleBar from "../TitleBar/TitleBar";

export default function Home(){
    return(
        <>
        <TitleBar/>
        <Navbar/>
        <Contentpanel content={"one"}/>
        </>
    );
}