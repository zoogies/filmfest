import './TagBox.css';
import '../../resources/Shared.css';

export default function TagBox(props){
    return(
        <div className="TagBox">
            {
                props.content.map((tag) =>{
                    return(
                        <div onClick={()=>{

                            window.location.href = "http://localhost:3000/"+tag['type']+"/"+tag['id'];

                        }} key={tag['id']} className='level1 TagBoxTag'>
                            <h2 className='TagBoxTagText'>{tag['name']}</h2>
                        </div>   
                    )
                })
            }
        </div>
    )
}