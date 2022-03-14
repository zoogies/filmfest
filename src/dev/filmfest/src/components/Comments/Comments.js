import '../../resources/Shared.css';
import './Comments.css'
import Comment from "../Comment/Comment";

export default function Comments(){
    //initialize comment list and modify the list after request async 
    //this can be used to update content easily after page scroll
    const comments = [
        {"name":"commentor","content":"i am making a comment rn","pfp":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
        {"name":"ryan","content":"wow this website is so awesome i might just write a whole paragraph about how awesome it is im not crazy there are no bugs under my skin i am perfectly sane","pfp":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
        {"name":"van","content":"balls i am van i love to say balls hahahah balls","pfp":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
        {"name":"sabby","content":"wow i am an absolute debby downer as always this sucks so much i hate everything waaaah waaaaah waaaah","pfp":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
        {"name":"zach","content":"i am zach and i am concerningly optimistic about the","pfp":"https://media.discordapp.net/attachments/682005199132688450/950756784174403624/IMG_7551.png"},
    ]

    return(
        <div className="level2 comments">
            <h1 className='commentstext'>Comments:</h1>
            <div className='commentbox'>
                {
                comments.map(function(comment){
                    return <Comment key={comment["content"]} comment={comment}/>
                })
            }
            </div>
        </div>
    )
}