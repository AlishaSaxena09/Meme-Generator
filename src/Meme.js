import React from "react";
 
function Meme(props){
     const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMeme, setAllMeme] = React.useState([])
    
    React.useEffect(()=>{
        async function getMemes(){
            const res = fetch('https://api.imgflip.com/get_memes')
            const data = await res.json()
            setAllMeme(data.data.memes)
        }
        getMemes()
    }, [])
    
    function handleChange(event){
        setMeme(prevMeme => {
           return { ...prevMeme, 
            [event.target.name]: event.target.value
            }
        })
    }
    
    function getMemeImage() {
        // const memesArray = allMeme.data.memes
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    return (
        <main>
            <div className="form meme">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="meme" className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
 
        </main>
    )
}
export default Meme;