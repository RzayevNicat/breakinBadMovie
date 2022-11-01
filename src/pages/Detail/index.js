import React from "react";
import '../Home/styles.css'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

import axios from "axios";
function Detail() {
    const [loading,setLoading] = useState((true))
  const [char, setChar] = useState(null);
  const { char_id } = useParams();
  useEffect(() => {
    axios(
      `https://breakingbadapi.com/api/characters/${char_id}`).then(
        (res) => res.data
      ).then((data)=>setChar(data[0])).finally(()=> setLoading(false))
    
  }, [char_id]);
  return <div className="about-characters">
    {loading && <Loading></Loading>}
    {
        char && (<div>
            <h1>{char.name}</h1>
            <img alt={char.name} src={char.img} style={{width:"300px",height:"400px",alignItems:"center"}}></img>
            <p>Birthday: {char.birthday}</p>
            <p>Occupation: {char.occupation}</p>
            <p>Appearance: {char.appearance}</p>
        </div>)
    }
  </div>;
}

export default Detail;
