// src/Calendar.js
import React, { useState,useEffect} from 'react';
import '../styles/kalendar.css';
import { useContext } from 'react';
import PredmetContext from '../context/PredmetContext';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

    const { predmeti, fetchPredmeti } = useContext(PredmetContext);
    const { user } = useContext(AuthContext);
    const [sveProvjere, setSveProvjere] = useState([]);
    const [shownCell,setShownCell] = useState();
    const [filtered,setFiltered] = useState([]);
    const [open,setOpen] = useState(false);


    const fetchProvjere = async () => {
        try {
            const promises = predmeti.map(predmet =>
                axios.get(`/provjera/${predmet.imePredmeta}/${predmet.imeSmjera}/${predmet.imeFakulteta}`)
            );

            const responses = await Promise.all(promises);
            const allProvjere = responses.flatMap(response => response.data);

            setSveProvjere(allProvjere);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchPredmeti();
        }
    }, [user]);

    useEffect(() => {
        if (predmeti.length > 0) {
            fetchProvjere();
        }
    }, [predmeti]);

   const filterByDate = (year,month,day) => {
      const monthsAbbreviated = [
              'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const clickedDate = new Date(year, month - 1, day);

  
      const filteredd = sveProvjere.filter((provjera) => {
    
      const provjeraDate = new Date(provjera.datum_odrzavanja).toString().split(" ");
      const yearr = parseInt(provjeraDate[3]);
      const dayy = parseInt(provjeraDate[2]);
      const monthh = monthsAbbreviated.findIndex(monthx => provjeraDate[1] === monthx);


        return (
          yearr === year && dayy === day && monthh === month
        );
      });

      console.log(filteredd);

      setFiltered(filteredd)
   }

    const handleCellClick = (year, month, day) => {
      if(day === shownCell) {
        setShownCell(-1);
        return;
      }
      filterByDate(year,month,day);
      setShownCell(day);
  
    };

    useEffect(() => {
      console.log("ovdje");
    },[shownCell])

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <main className='calendar-body'>
        <div className="header-cal">
          <div className="col-start">
            <div className="icon" onClick={prevMonth}>
              ←
            </div>
          </div>
          <div className="col-center">
            <span>{currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="col-end">
            <div className="icon" onClick={nextMonth}>
              →
            </div>
          </div>
        </div>
      </main>
    );
  };

  const vrijeme = (timestamp) => {
    const date = new Date(timestamp);

    const localizedHour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return localizedHour;
  }

  const renderDays = () => {
    const days = [];
    const dateFormat = "ddd";
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'];
    const dayTmp = new Date(currentDate.getFullYear(),currentDate.getMonth(),1).getDay();


    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col" key={i}>
          {daysOfWeek[(dayTmp+i)%7]}
        </div>
      );
    }
    return <div className="days calendarRow">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = new Date(startDate);
    var dayTmp = 1;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day);
          days.push(
            <div className={`col cell ${day.getMonth() !== currentDate.getMonth() ? "disabled" : ""}`} key={day} onClick = {(e) => {handleCellClick(currentDate.getFullYear(),currentDate.getMonth(),cloneDay.getDate())}}>
              <span className="number">{day.getDate()}</span>

              

              {cloneDay.getDate() === shownCell && (
                
                <div className = "add-material-modal">
                  <div className = "provjere">

                  <button style = {{
                    position:'absolute',
                    top:'10px',
                    right:'10px',
                    borderRadius:'2px',
                    backgroundColor:'transparent',
                    border:'none',
                    color:'#0f75bd'
                    
                }} onClick={(e) => {setOpen(false)}}><FontAwesomeIcon icon = {faClose}/></button>

                    { filtered.length > 0 && filtered.map(filter => (
                      
                      <div>
                        <p>{filter.ime_predmeta}</p>
                        <p>{filter.ime_provjere}</p>
                        <p>{vrijeme(filter.datum_odrzavanja)}</p>
                      </div>
                        
                        ))}
                    {filtered.length === 0 && <p>Nema provjera tog dana!</p>}
                  </div>
                </div>
                )}
            </div>
          );
          dayTmp+=1;
          day.setDate(day.getDate() + 1);
      }
      rows.push(
        <div className="calendarRow" key={day}>
          {days}
        </div>
      );
      days = [];
      dayTmp = 1;
    }
    return <div className="body">{rows}</div>;
  };

  const nextMonth = () => {
    setShownCell(-1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setShownCell(-1);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
