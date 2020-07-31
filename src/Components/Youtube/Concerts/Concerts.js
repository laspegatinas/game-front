/* eslint-disable max-len */
import React, { Component } from 'react';
import './Concerts.css'
import arenal16 from '../Concerts/Pictures/arenal2016.png';
import arenal19 from '../Concerts/Pictures/arenal2019.png';
import merce19 from '../Concerts/Pictures/merce2019.png';
import vinarock14 from '../Concerts/Pictures/viña_rock_2014.png';
import bilbao18 from '../Concerts/Pictures/bilbao2018.png';
import sanfermin13 from '../Concerts/Pictures/sanfermin2013.png';
import { Link } from 'react-router-dom';


class Concerts extends Component {

    state = {
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
        console.log(localStorage.ConcertId)

    }

    render() {

        return (
            <div className="concerts-pictures">
                {this.state.concertList.map((concert) => (
                    
                    <div className="concert-picture">
                         <Link to={{ pathname: '/youtuberoundtwo' }}> 
                        <button
                            type="button"
                            className="buttonConcert"
                            onClick={(event) => this.setSelectedConcertId(event.target.id)}
                        >
                            <img
                                src={concert.frame}
                                id={concert.id}
                                videoId={concert.videoId}
                                className="concert-picture-detail"
                            />
                            <h6>{concert.place}</h6>
                            <h6>{concert.year}</h6>
                        </button>
                        </Link> 
                    </div>
                ))}
            </div>
        )
    }
}

export default Concerts;
