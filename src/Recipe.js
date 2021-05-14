import React from 'react'
import classes from './App.module.css'
const Recipe=(props)=>{
    return(
        <div className={classes.item}>
            <h3 style={{textAlign:'center'}}>{props.title}</h3>
            <img src={props.url} alt="not available" style={{borderRadius:'10px',width:'100%',margin:'auto',maxHeight:'35%'}}></img>
            <h4 style={{marginTop:'10px',textAlign:'center',color:'black'}}>calories:{props.cal.toFixed(2)}</h4>
            <h4 style={{color:"black",textAlign:"center"}}>Ingredients</h4>
            <ul>
                {props.ingredients.map(ingredient=>{return(<li>{ingredient.text}</li>)})}
            </ul>
        </div>
    )
}
export default Recipe;