import React from 'react'

const Alertt = (props) => {
    const capitalize=(word)=>{
      if(word==="danger"){
        word="error"
      }
      else{
        word="success";
      }
let small=word.toLowerCase()
return small.charAt(0).toUpperCase() + small.slice(1);
    }
  return (
    <div style={{height:'50px'}}>
          {props.alert &&<div><div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
<strong>{capitalize(props.alert.type)}</strong>:{props.alert.msg}
  </div></div>}
    </div>
  
  )
}

export default Alertt