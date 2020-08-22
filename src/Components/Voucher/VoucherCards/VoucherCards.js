import React from 'react';



    const VoucherCards = ({image, title, text, id, action, imageClass
    }) => {

  
    return(

    <div >
        <section>
           <img width='80vh' height="80vh" className={imageClass}  id={id} onClick={action} src={image}/>
            <h2> {title} </h2>
            <p id={id} onClick={action}> {text} </p>
           
        </section>          
    </div>
)};

export default VoucherCards;