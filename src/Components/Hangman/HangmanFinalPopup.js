import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Context } from '../../../Context/Provider';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ToolTipConditions from '../ToolTipConditions';




import '../Snake/finalPopup.scss';

const HangmanFinalPopup = (props) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const { state } = React.useContext(Context);
    

    let hits = (props.hits)

    const ranking = () => {
        if (hits >= 10) {
            return '30%'
        } else if (hits >= 4) {
            return '20%'
        } else if (hits >= 1) {
            return '10%'
        } else {
            return '0%'
        }
    }

    const code = () => {
        if (hits >= 10) {
            return 'GANOCONGBH3'            
        } else if (hits >= 4) {
            return 'GANOCONCGH2'
        } else if (hits >= 1) {
            return 'GANOCONGBH1'
        }  else {
            return '0%'
        }
    }

  
   
    

    const close = <FontAwesomeIcon icon = {
      faTimes
    }
    />
  
    return (
      <>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <div className="modalBody" style={{ outline: '4px solid #caec58'}}>
          
          <Modal.Body >
                <span className="bigInstructionsPopUp" style={{ fontSize: "2em"}} onClick={handleClose}>{close}</span>
            <Row xs={1}>
              <Col>
                <p className="modalPopUpTitle">{state.texts[state.language].memoryGame.congrats_msg1}</p>
              </Col>
            </Row>
            <Row xs={1}>
            <Col className="discountText">
              <p>{state.texts[state.language].memoryGame.congrats_msg2} <span> {ranking()} {state.texts[state.language].memoryGame.congrats_msg3}</span> {state.texts[state.language].memoryGame.congrats_msg4}<span style={{ fontWeight: "bold", fontSize: "x-large" }}></span></p>
              <p>{state.texts[state.language].memoryGame.congrats_msg5}</p>
              <p>{code()}</p>

            </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" href="https://reservations.travelclick.com/106660?languageid=2%20#/guestsandrooms" className="popupButtonJuan">
             {state.texts[state.language].snake.button_book}
            </Button>

          </Modal.Footer>
            <div className="termsAndConditions">
               <ToolTipConditions/>
            </div>
          </div>
        </Modal>
        
      </>
    );
  }
  
export default HangmanFinalPopup