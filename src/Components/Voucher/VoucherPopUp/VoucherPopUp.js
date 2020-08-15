import React from 'react';



    const VoucherPopUp = ({image, triggerButton, title, text, id, action, imagePop, titlePop, textPop
    }) => {

  
    return(

    <div >
        <section>
            <a href="https://placeholder.com"><img src={image}/></a>
            <h2> {title} </h2>
            <p> {text} </p>
            <button               
                  id={id}
                  onClick={action}
              >
                  Click me 
              </button>
        </section>          
    </div>
)};

export default VoucherPopUp;