import classes from './App.module.css';
import { useEffect,useState } from 'react';
import Recipe from './Recipe'
import DropDown from './DropDown'
import axios from 'axios'
import {Helmet} from 'react-helmet'
function App(){
  let healthLabels=[
    {value:'vegan',
    checked:false},
    {value:'alcohol-free',
    checked:false},
    {value:'vegetarian',
    checked:false},
  {
    value:'balanced',
    checked:false},
    {
    value:'high-fiber',
    checked:false},
    {
    value:'high protein',
    checked:false},
    {
    value:'low-carb',
    checked:false},
    {
    value:'low-fat',
    checked:false},
    {
    value:'peanut-free',
    checked:false},
   {value: 'sugar-conscious',
   checked:false},
    {value:'tree-nut-free',
    checked:false}];
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState('');
  const [query,setQuery]=useState('');
  const [healthOptions,sethealthOptions]=useState(healthLabels);
  const [healthParameters,setHealthParameters]=useState([]);
  const [status,setStatus]=useState('ok')
  useEffect(()=>{
    let mounted=true;
    if((query!=='' || healthParameters.length) && mounted)
        getRecipes()
     mounted=false;
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[query,healthParameters]
  );
  const getRecipes=async ()=>{
   let data=JSON.stringify({
    q:query,
    health:healthParameters
   })
   let response=await axios.post('https://recipe---app.herokuapp.com',data,{headers:{"Content-Type" : "application/json"}}
    )
   let hits=await response.data.hits;
   if(typeof hits==='undefined'){
      setStatus('notok')
   }
   else{
      setStatus('ok')
   }
   setRecipes(hits);

};
  const collectHealthOptions=(event)=>{
    healthLabels=[...healthOptions];
      healthLabels.forEach((option)=>{
        if(event.target.value===option.value)
        {
            option.checked=!option.checked;
        }
      });
      let temp=[];
      for(let i=0;i<healthLabels.length;i++)
      {
        if(healthLabels[i].checked)
        {
           temp.push(healthLabels[i].value);
        }
        else
        {
          temp.push(undefined);
        }
      }
      setHealthParameters(temp);
      sethealthOptions(healthLabels);
  };
  return (
    <div className={classes.App}>
      <Helmet>
        <script src="https://developer.edamam.com/attribution/badge.js"></script>
      </Helmet>
      <div style={{display:'flex',flexFlow:"row"}}>
      <DropDown healthLabels={healthOptions} HealthOptions={collectHealthOptions}
      />
      <form onSubmit={(event)=>{
          event.preventDefault();
          setQuery(search);
        }} style={{margin:'auto',marginTop:'0px'}}>
        <div>
        <input type="text" className={classes.Input} value={search} onChange={(event)=>{
          setSearch(event.target.value)
        }}></input>
        </div>
        <div>
        <button type="submit" className={classes.Button}>submit</button>
        </div>
      </form>
      </div>
      <div className={classes.Recipe}>
      {
     status==="ok"?recipes.map((item,index)=>{return (<Recipe key={index} 
     title={item.recipe.label} 
     url={item.recipe.image} 
     cal={item.recipe.calories}
     ingredients={item.recipe.ingredients}
     />)}):<div style={{margin:'auto',width:'fit-content'}}>Sorry! No Results Matched Your Search</div>
          }     </div>
      <div id="edamam-badge" data-color="white" style={{marginTop:"100%"}}></div>
    </div>
  );
}

export default App;
