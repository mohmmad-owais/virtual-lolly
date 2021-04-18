import React, { useRef, useState } from 'react';
import Lolly from '../components/lolly'
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import "./style.css";
import { Link } from 'gatsby';

const GET_ALL = gql`
  {
    getVCard {
      c1
      c2
      c3
      rec
      sender
      msg
    }
  }
`;

const ADD_VCARD = gql`
  mutation addVCard(
    $c1: String!
    $c2: String!
    $c3: String!
    $rec: String!
    $sender: String!
    $msg: String!
  ) {
    addVCard(c1: $c1, c2: $c2, c3: $c3, rec: $rec, sender: $sender, msg: $msg) {
      link
    }
  }
`;
export default function Home() {

    const [c1, setC1] = useState("#deaa43");
    const [c2, setC2] = useState("#e95946");
    const [c3, setC3] = useState("#d52358");

    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");

    const [addVCard] = useMutation(ADD_VCARD);
    const { loading, data, error } = useQuery(GET_ALL);

    const handleSubmit =  () => {
        

        addVCard({
            
            variables: {
                c1, c2, c3,
                rec: receiver,
                sender:sender,
                msg: message
            },
        });
    }

    const senderField = useRef();
    const recField = useRef();
    const msgField = useRef();

    
 
    return (
    <div className="container">
        <h1>virtual lollipop</h1>
        <div className="main-container">

            <div className="">
                <Lolly top={c1} middle={c2} bottom={c3} />
                </div>
                <div className="flavours">
                  <label className="pickerLabel">
                <input className="colourpicker" type="color" value={c1} onChange={(e) => { setC1(e.target.value) }} />
                </label>
                <label className="pickerLabel">
                <input className="colourpicker" type="color" value={c2} onChange={(e) => { setC2(e.target.value) }} />
                </label>
                <label className="pickerLabel">
                <input className="colourpicker" type="color" value={c3} onChange={(e) => { setC3(e.target.value) }} />
                </label>

                </div>
                
            
            <div className="form-container">
                <input  type="text" value={receiver} placeholder="To"  onChange={(e) => setReceiver(e.target.value)} required />
                <textarea value={message}  placeholder="Enter your message!" onChange={(e) => setMessage(e.target.value)} required></textarea>
                <input value={sender} type="text"  placeholder="From" onChange={(e) => setSender(e.target.value)} required />

        <Link
          style={{textDecoration:"none"}}
            to="/getLolly"
            state={{
              c1: c1,
              c2: c2,
              c3: c3,
              rec: receiver,
              sender: sender,
              msg: message,
            }}
            onClick={handleSubmit}
          >
            Send
          </Link>
            </div>
        </div>
    </div>
    )
}