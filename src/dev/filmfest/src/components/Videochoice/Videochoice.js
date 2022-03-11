export default function Videochoice(props){
    const id=props.info["id"];
    const title=props.info["title"];
    const thumbnail=props.info["thumbnail"];
    return(
        <>
        <p>{id}</p>
        <p>{title}</p>
        <img src={thumbnail}/>
        </>
    );
}