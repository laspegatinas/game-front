import React, { Fragment, useState, useContext } from 'react';
import { MyContext } from '../../../../context/MyProvider';
import './UserProfile.css';
import profile from '../../../../Pictures/user.png'
import texts from '../../../../texts.json';
import Api from '../../../../Api/index';
import { Link } from 'react-router-dom';


const UserPofile = ({ language }) => {

    const { state, logUserIntoContext } = React.useContext(MyContext);

    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [editing, setEdit] = useState(false);
    const [showVouchers, setShowVouchers] = useState(false);
    const [voucherHistory, setVoucherHistory] = useState([]);
    const [updateMessage, setUpdateMessage] = useState();
    const { state: {user}} = React.useContext(MyContext);

    const submitUpdate = (e) => {

        e.preventDefault();
        Api.update({
            'userid': state.user,
            "phone": phone,
            "city": city,
            "state": region,
        })
            .then((resp) => {
                Api.getPoints(resp.data.id)
                    .then((resp2) => {
                        let user = { ...resp['data'], ...resp2['data'] };
                        logUserIntoContext(user);
                        setUpdateMessage('Updated Successfully!');
                    })
            }, (err) => {
                setUpdateMessage('We are sorry, something went wrong... Please log yourself in again.');
            });
    };

    const myHistory = async () => {
       await Api.getHistory(user)
        .then((resp) => {
            let response = resp.data.vouchersMap;
            let userHistory = Object.values(response);
            setVoucherHistory(userHistory);      
        }); 
        setShowVouchers(true);
    }
 

    return (
        <div className="profile-text">
            <MyContext.Consumer>
                {(context) => (
                    <div className='profile-content'>
                        <hr />
                        <div className='myprofile-title'>
                            <img src={context.state.picture || profile} alt="profile icon" className='profile-icon-user' />

                            <h1>{context.state.username}</h1>

                        </div>
                        <button onClick={() => { context.clearUser(); console.log('clicked'); }}>{texts[language].logOutButton}</button>
                        <Link to="/"><button>{texts[language].home}</button></Link>
                        <hr />

                        {editing

                            ?
                            <div>
                                <form onSubmit={submitUpdate}>
                                    {/* <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="mail"
                                    placeholder='email'
                                    type="email"
                                    className="input"
                                    id="user_email"
                                /> */}

                                    {/* <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    name="username"
                                    placeholder='your name'
                                    type="text"
                                    className="input"
                                    id="user_name"
                                /> */}

                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        name="phone"
                                        placeholder={texts[language].phone}
                                        type="text"
                                        className="input"
                                        id="phone_number"
                                    />

                                    <input
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        name="City"
                                        placeholder={texts[language].city}
                                        type="text"
                                        className="input"
                                        id="city"
                                    />

                                    <input
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        name="region"
                                        placeholder={texts[language].state}
                                        type="text"
                                        className="input"
                                        id="region"
                                    />
                                    <button className="safeBtn" type="submit">Submit</button>
                                    <button className="cancelBtn" onClick={() => setEdit(false)}>{texts[language].cancel}</button>
                                     <h4>{updateMessage}</h4>
                                </form>
                            </div>
                        : showVouchers ? 

                             <div>
                                <h6>
                                        Historial de Canjes:
                                           <div>
                                                {voucherHistory.map((historyElement, index)=>                                                                                                   
                                                <div> 
                                                    <p key={index} className="myprofile-h6">{historyElement.name} {historyElement.code}</p>                                                                                                   
                                                 </div>               
                                                )}
                                            </div>
                                </h6>
                                <button onClick={() => setShowVouchers(false)}>Atrás</button>
                             </div>

                             :

                            <div>
                                <h6> {texts[language].mail}:
                                    <p className="myprofile-h6">{context.state.email}</p>
                                </h6>

                                <h6>
                                    {texts[language].username}:
                                    <p className="myprofile-h6">{context.state.username}</p>
                                </h6>

                                <h6>
                                    {texts[language].phone}:
                                        <p className="myprofile-h6">{context.state.phone}</p>
                                </h6>

                                <h6>
                                    {texts[language].city}:
                                        <p className="myprofile-h6">{context.state.city}</p>
                                </h6>

                                <h6>
                                    {texts[language].state}:
                                        <p className="myprofile-h6">{context.state.state}</p>
                                     </h6>

                                     <h6>
                            {texts[language].pointsComplete}:
                            <p className="myprofile-h6">{context.state.total_app_points}</p>
                        </h6>

                        <h4 className="myprofile-h4">
                            {texts[language].profileMessage}
                        </h4>

                        <hr />
                        <div className="bottomButtons">
                             {/* <Link to="/"><button className="myprofile-btn">Leave</button></Link> */}
                            {/* <Link language={language} to="vouchers"> <button className="getVoucher">{texts[language].chooseRedeem}</button></Link>  */}
                            {/* <button className="showVouchers" onClick={() => setShowVouchers(true)}>Ver Canjes</button> */}
                            {/* <button className="showVouchers" onClick={myHistory}>{texts[language].history}</button> */}
                            <button className="myprofile-btn" onClick={() => setEdit(true)}>{texts[language].completeProfile}</button>
                            
                        </div>
                       </div>                      
                        }           

                    
                     
                        
                     
                    </div>
                )}
            </MyContext.Consumer>
        </div>
    );
};

export default UserPofile;
