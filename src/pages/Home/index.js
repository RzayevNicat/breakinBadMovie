import React from "react";
import './styles.css';
import {
  Link
  
} from "react-router-dom";
import Masonry from "react-masonry-css";
import { useEffect } from "react";
import { fetchCharacters } from "../../redux/charactersSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading";
function Home() {
  const characters = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const nextPage = useSelector((state) => state.characters.page);
  const haspage = useSelector((state) => state.characters.haspage)
//   const error = useSelector((state) => state.characters.error);
//   const err = useSelector((state) => state.characters.items);
  const dispatch = useDispatch();
  useEffect(() => {
    if(status==='idle'){
      dispatch(fetchCharacters());
    }
    
  }, [dispatch,status]);


  return (
    <div>
      {/* <h1>characters</h1> */}
      {status==='loading' && <Loading></Loading>}
      <Masonry
        breakpointCols={4}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {characters.map((character) => (
          <div key={character.char_id}>
            <Link to={`/char/${character.char_id}`}>
            <img alt={character.name} src={character.img} className='character' />
            <h5>{character.name}</h5>
            </Link>
          </div>
        ))}
      </Masonry>

            <div style={{padding: "30px" ,textAlign: "center"}}>
                
                {
                    haspage && status!=='loading' && (<button style={{padding: "10px 20px",borderRadius:"6px"}} onClick={()=>dispatch(fetchCharacters(nextPage))}>Load More {nextPage}</button>
                )}
                {
                    !haspage && (<div>There is nothing to be shown</div>)
                }
                
            </div>
        

      
    </div>
  );
}

export default Home;
