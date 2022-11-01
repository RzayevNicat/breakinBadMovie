import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchAllQuotes,quotesSelector,statusSelector } from '../../redux/quotesSlice';
import Items from '../../components/Items';
import Loading from '../../components/Loading';
function Quotes() {
    const dispatch = useDispatch();
    const data = useSelector(quotesSelector);
    const status = useSelector(statusSelector);

    useEffect(() => {
      if(status==='idle'){
        dispatch(fetchAllQuotes());
      }
      
    }, [dispatch,status]);
  return (
    <div style={{padding:'30px'}}>
      
        {status==='loading' && <Loading/>}
        <h1>Quotes</h1>
        {status=== 'succeeded' && data.map((item)=> <Items key={item.quote_id} item={item}/>)}
        {status === 'succeeded' && <div style={{textAlign:'center',fontSize:'24px'}}>{data.length} quotes.</div>}
    </div>
  )
}

export default Quotes
