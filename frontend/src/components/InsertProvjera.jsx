import { faClose, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';

const InsertProvjera = ({open,setOpen,imePredmeta,imeSmjera,imeFakulteta}) => {

    const [sviTipovi,setSviTipovi] = useState([]);
    const [odabran,setOdabran] = useState();

    const [dateTime, setDateTime] = useState('');

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
        console.log(e.target.value);
    };

    const addProvjera = async () => {
        const ime = odabran;
        const datum = new Date(dateTime).toLocaleString();

        console.log(ime,datum);

        try {
            const response = await axios.post(`/provjera/${imePredmeta}/${imeSmjera}/${imeFakulteta}`,{imeProvjere:ime,datumOdrzavanja:datum});
            alert("Uspjesno dodata provjera");
            setOpen(false);

        }
        catch(err) {
            console.log(err);
        }
    }


    const fetchProvjere = async () => {
        try {
            const response = await axios.get('/provjera/imenaProvjera');
            setSviTipovi(response.data);
            setOdabran(response.data[0].ime_provjere)
        }   
        catch(err) {

        }
    }

    const changeOdabran = (e) => {
        setOdabran(e.target.value);
    }

    useEffect(() => {
        fetchProvjere();
    },[])


  return (
    <div className="add-material-modal">
                

            <div className = "selectDiv" style = {{
                position:'relative'
            }}>

            <button style = {{
                    position:'absolute',
                    top:'5px',
                    right:'5px',
                    borderRadius:'2px',
                    backgroundColor:'transparent',
                    border:'none',
                    color:'#0f75bd'
                    
                }} onClick={(e) => {setOpen(false)}}><FontAwesomeIcon icon = {faClose}/></button>

                <div className="add-material-content" style = {{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    gap:'20px',
                    flexDirection:'column'
                }}>
                    <h2 style = {{
                        color:'#0f75bd'
                    }}>Dodajte provjeru</h2>
                <select onChange={changeOdabran}>
                    {sviTipovi.map(tip => <option value = {tip.ime_provjere}>{tip.ime_provjere}</option>)}
                </select>

                <div> Datum odrzavanja: <input type="datetime-local" onChange={handleDateTimeChange} value={dateTime}/></div>

                <button className = "btn-add-material" onClick={addProvjera}><FontAwesomeIcon icon={faPlus}/></button>
                </div>
            </div>
        </div>
  )
}



export default InsertProvjera