import React,{useState} from 'react'
import classes from './DropDown.module.css'
const DropDown=(props)=>{
    const [visibilityHealthLabels,setVisibilityHealthLabels]=useState("none");
    const [opacityDropDown,setOpacityDropDown]=useState('0');
    const [pointer,setPointer]=useState('none');
  
   
    let healthLabels=props.healthLabels.map(x=>x.value);
    return(
           <div className={classes.container}>
            <button className={classes.header} onClick={
                    ()=>{
                        if(opacityDropDown==='1')
                        {
                            setOpacityDropDown('0');
                            setPointer('none');
                        }
                        else
                        {
                            setOpacityDropDown('1');
                            setPointer('all');
                        }
                    }
                }>Filters</button>
                <ul 
                style={{opacity:opacityDropDown,marginTop: '10%',
                padding:'0px',
                listStyle: 'none',
                flexDirection: 'column',
                width: '100%',
                backgroundColor:'white',
                borderRadius: '5px',
                pointerEvents:pointer   
                }}
                >
                    <li onClick={()=>{
                        if(visibilityHealthLabels==="none" && opacityDropDown==="1")
                        {
                            setVisibilityHealthLabels("flex");
                        }
                        else
                        {
                            setVisibilityHealthLabels("none");
                        }
                    }}>
                        Health Labels
                    </li>
                    <form className={classes.listform} style={{display:visibilityHealthLabels,
    flexDirection: 'column',
    alignItems: 'flex-start',height:'120px',overflowY:'scroll'}} >
                           {healthLabels.map((item)=>{
                               return(
                                   <div>
                                   <input type="checkbox" name={item} value={item} onClick={props.HealthOptions}/>
                                   <label>{item}</label>
                                   </div>
                               )    
                           })}
                        </form>
                </ul>
        </div>
    )
}
export default DropDown;