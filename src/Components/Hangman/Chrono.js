import React, {
    useState,
    useEffect
} from 'react';
import confetti from '../../../confetti';

let interval = null;
const Chrono = ({ setTimerOn }) => {
    const [startTime, setStartTime] = useState(0);
    const [currentTimeMs, setCurrentTimeMs] = useState(0);
    useEffect(() => {
        const until = new Date();
        until.setMinutes(until.getMinutes() + 1);
        setStartTime(until);
       interval = setInterval(() => {
            setCurrentTimeMs(new Date());
        }, 1);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if(startTime < currentTimeMs){
            setTimerOn(false);
            // endIt()
        }
    }, [startTime, currentTimeMs])

    let actualTime = ''
    function convertMS(milliseconds) {
        let m, s, ms;
        ms = '' + milliseconds % 1000;
        s = Math.floor(milliseconds / 1000);
        m = '' + Math.floor(s / 60);
        s = '' + s % 60;
        actualTime = `${ m.padStart(2, '0')}:${s.padStart(2, '0')}:${ms.padStart(3, '0')}`;
        return actualTime;
    }

    return ( 
        currentTimeMs !== 0 && 
        <div className="col-12 col-md-6">
            <div className="row justifyCenter">
                <p> {
                `${convertMS(startTime-currentTimeMs)}`
                } </p>
            </div>
        </div>
    );
};

export default Chrono;
