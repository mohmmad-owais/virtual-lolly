import * as React from 'react';
import Lolly from "../components/lolly";




const GetLolly= ({ location }) => {
    let lolly
    if(location.state.c1){
        lolly = {
            c1: location.state.c1,
            c2: location.state.c2,
            c3: location.state.c3
        }
    }
    return (
        <div>
        <div className="container">
        <h1>virtual lollipop</h1>
        <div className="main-container">

            <div className="">
                <Lolly top={lolly.c1} middle={lolly.c2} bottom={lolly.c3} />
                </div>
                <div className="flavours">
                  <label className="pickerLabel">
                <input className="colourpicker" disabled type="color" value={lolly.c1}  />
                </label>
                <label className="pickerLabel">
                <input className="colourpicker" disabled type="color" value={lolly.c2}  />
                </label>
                <label className="pickerLabel">
                <input className="colourpicker" disabled type="color" value={lolly.c3}  />
                </label>

                </div>
                
            
            <div className="form-container">
            <h2><b style={{color: lolly.c1}}>From: </b>{location.state.sender || 'please enter sender name'}</h2>
                <p style={{fontSize: '25px'}}><b style={{color: location.state.c2 || 'red'}}> Message: </b>{location.state.msg || 'please enter a message'}</p>
                <h2><b style={{color: lolly.c2}}>Gift: </b>{location.state.rec || 'please enter a reciever name'}</h2>
            </div>
        </div>
        </div>


        </div>
    );
}

export default GetLolly;