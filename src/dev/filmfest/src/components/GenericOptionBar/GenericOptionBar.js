export default function GenericOptionBar(props){
    return(
        <div className="level2 adminOptionBar">
            {
                props.content.map(function(btn){
                    return(
                        <div onClick={btn.call} key={btn.text} className='level1 adminOption'>
                            <h2>{btn.text}</h2>
                        </div>
                    )
                })
            }
            
        </div>
    )
}