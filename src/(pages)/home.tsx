import axios from "axios";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  
  const token = localStorage.getItem('token');
  const [fetchedColors, setFetchedColors] = useState([]);
  const [myColorPallette, setMyColorPalette] = useState<string[]>([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is logged in by verifying if the token exists in the localStorage
    if(!token) {
      navigate('/login');
      return;
    }

    // Load the color palette from localStorage on initial render
    const storedPalette = localStorage.getItem('myColorPalette');
    if(storedPalette) {
      setMyColorPalette(JSON.parse(storedPalette));
    }
  }, [token, navigate]);



  const getColors = async () => {
    try {
      // Generate a random limit between 1 and 10, fetch that many colors and store them in fetchedColors state
      const colorsLimit = Math.floor(Math.random() * 10) + 1;

      const res = await axios.get(`https://bootcamp2025.depster.me/api/colors?limit=${colorsLimit}`, {headers: {'Authorization': `Bearer ${token}`}});
      
      if(res.data) {
        setFetchedColors(res.data.data);
      }
    } catch (error) { 
      console.error("Error fetching tasks:", error);
    }
  }

  const saveColor = async (color: string) => {

    if(myColorPallette.includes(color)) {

      // If the color is already in the palette, remove it
      const updatedColorPalette = myColorPallette.filter((colorItem) => colorItem !== color);
      setMyColorPalette(updatedColorPalette);
      console.log("Color already added, removing it from palette.");
      localStorage.setItem('myColorPalette', JSON.stringify(updatedColorPalette));
    } else {
      
      // If the color is not in the palette, add it
      const updatedColorPalette = [...myColorPallette, color];
      setMyColorPalette(updatedColorPalette);
      console.log("New color added to palette:", color);
      localStorage.setItem('myColorPalette', JSON.stringify(updatedColorPalette));
    }
  }


  return (

    <div className='w-full h-full flex flex-col'>

      <h1 className="text-4xl py-8 text-center">DEPT Assignment 1</h1>
      <button className="px-8 py-2 rounded-lg bg-blue-700 w-fit mx-auto cursor-pointer" onClick={() => getColors()}>Fetch colors</button>

      {fetchedColors.length > 0 && (
        <div className="text-center my-4 pt-24">
          <p className="text-lg">Fetched {fetchedColors.length} colors</p>
        </div>
      )}
      <div className="grid grid-cols-5 w-fit mx-auto gap-4">
        {fetchedColors.map((color, index) => (
          <div key={index} style={{backgroundColor: color}} className={`relative w-[200px] h-[200px] rounded-md`}>
            <button className="absolute top-2 right-2 cursor-pointer" onClick={() => saveColor(color)}>{myColorPallette.includes(color) ? (<BookmarkCheck size={24} />) : <Bookmark size={24}/>}</button>
            <p className="absolute bottom-2 right-2 text-white">{color}</p>
          </div>
        ))}
      </div>

      {myColorPallette.length > 0 && (
        <div className="text-center my-4 pt-16">
          <h2 className="text-2xl">My Color Palette</h2>
          <p className="text-lg">You have {myColorPallette.length} colors in your palette</p>
        </div>
      )}
      <div className="grid grid-cols-5 w-fit mx-auto gap-4 py-4">
        {myColorPallette.map((color, index) => (
          <div key={index} style={{backgroundColor: color}} className={`relative w-[200px] h-[200px] rounded-md`}>
            <button className="absolute top-2 right-2 cursor-pointer" onClick={() => saveColor(color)}>{myColorPallette.includes(color) ? (<BookmarkCheck size={24} />) : <Bookmark size={24}/>}</button>
            <p className="absolute bottom-2 right-2 text-white">{color}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;