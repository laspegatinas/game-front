/* eslint-disable max-len */
import React, { Component } from 'react';
import './Concerts.css'
import arenal16 from '../Concerts/Pictures/arenal2016.png';
import arenal19 from '../Concerts/Pictures/arenal2019.png';
import bilbao18 from '../Concerts/Pictures/bilbao2018.png';
//import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import PopUp from '../../Rounds/PopUp';
import texts from '../../../texts.json';


class Concerts extends Component {

    state = {

        popUpHidden: true,
        concertList: [
            {
               
                id: "QDHlpJogBwc", 
                videoId: "QDHlpJogBwc",
                who: 'La Gran Pegatina',
                place: 'Arenal Sound',
                year: '2016',
                videoURL: 'https://www.youtube.com/watch?v=QDHlpJogBwc',
                frame: arenal16
            },
            {
                id: 4,
                videoId: '',
                who: 'La Pegatina',
                place: 'Arenal Sound',
                year: '2019',
                videoURL: 'https://www.youtube.com/watch?v=QDHlpJogBwc',
                frame: arenal19
            },
            {
                id: "wFC_Ot6m_Qk",
                videoId: 'wFC_Ot6m_Qk',
                who: 'La Pegatina',
                place: 'Bilbao',
                year: '2018',
                videoURL: 'https://www.youtube.com/watch?v=wFC_Ot6m_Qk',
                frame: bilbao18
            },
         
        ]
    }

    setSelectedConcertId = (id) => {
        localStorage.setItem('ConcertId', id);
        //console.log(localStorage.ConcertId)
    }

    popIt = () =>  {

        this.setState({
            popUpHidden: false
        })
    }

    render() {

        return (
            <div className={this.state.popUpHidden ? 'concerts-pictures' : "cover"}>
                {this.state.concertList.map((concert) => (
                    
                    <div className="concert-picture">
                         <DelayLink delay={5000} clickAction={this.popIt} to={{ pathname: '/youtuberoundtwo' }}> 
                        {/* <button
                            type="button"
                            className="buttonConcert"
                            onClick={(event) => this.setSelectedConcertId(event.target.id)}
                        > */}
                        <PopUp src={concert.frame}
                                id={concert.id}
                                videoId={concert.videoId}
                                className="concert-picture-detail" place={concert.place} year={concert.year}
                                 todo={texts['spanish'].popUp} instruct={texts['spanish'].popUpSpotify} popButton={'buttonConcert'}>
                             {/* <h6>place={concert.place}</h6>
                             <h6>{concert.year}</h6> */}
                            <button 
                             
                            type="button"
                            className={'buttonConcert'}
                            onClick={(event) => this.setSelectedConcertId(event.target.id)}
                        ></button>  
                            
                            
                        {/* </button> */}
                        </PopUp>
                        </DelayLink > 
                    </div>
                ))}
            </div>
        )
    }
}

export default Concerts;
