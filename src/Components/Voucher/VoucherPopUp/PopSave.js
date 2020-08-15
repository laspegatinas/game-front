import React from 'react';



    const VoucherPopUp = ({image, triggerButton, title, text, id, action, imagePop, titlePop, textPop
    }) => {

  
    return(

    <div >
        <section>
            <a href="https://placeholder.com"><img src={image}/></a>
            <h2> {title} </h2>
            <p> {text} </p>
        </section>
            <div>
                <button
                    type="button"
                    className={triggerButton}
                    data-toggle="modal"
                    data-target="#register"
                    id={id}
                    onClick={action}
                >
                    Click me 
                </button>

            <div
                    className="modal fade"
                    id="register"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered " 
                        role="document"
                    >
                        <div className="modal-content bg-transparent" style={{height: '40em', width: '40em'}}>
                          
                            <div className="modal-header" style={{ width: '40em' }}>                             
                                <button
                                    type="button"
                                    className="close modalClosingButton"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <section>
                                <a href="https://placeholder.com"><img src={image}/></a>
                                 <h2> {title} </h2>
                                 <p> {text} </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
    </div>
)};

export default VoucherPopUp;