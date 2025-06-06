import React, { useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AdminHeader from '../components/headers/AdminHeader';
import HeaderAdmin from '../components/headers/HeaderAdmin';
import { getEvents } from '../services/eventService';
import Header from '../components/Header'
import CopyrightFooter from '../components/CopyrightFooter'

export default function Schedule() {

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible)
  }

  function handleEventClick(clickInfo) {
    
  }

  function handleEvents(events) {
    setCurrentEvents(events)
    console.log("Wszystkie eventy: ", events)
  }

  function addOneDay(dateStr) {
    const date = new Date(dateStr)
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  }
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEvents();    
        console.log("Fetched data: ", data);

        const mappedEvents = data.map((event) => ({
          id: String(event.id),
          title: event.name,
          start: event.start_date,
          end: addOneDay(event.end_date),
          allDay: true
        }));

        setCurrentEvents(mappedEvents);
      } catch (error) {
        console.error('Błąd przy pobieraniu wydarzeń:', error);
      }
    };

    fetchData();  
  }, [])


  return (
    <>
    <div className='min-h-screen'>
      <Header
            navigationElements={[]}
            userState={null}
        />
      <HeaderAdmin title="Harmonogram" />      
      <div className='app'>
        <Sidebar
          weekendsVisible={weekendsVisible}
          handleWeekendsToggle={handleWeekendsToggle}
          currentEvents={currentEvents}
        />
        <div className='app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            // select={handleDateSelect}
            events={currentEvents} 
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    </div>
      <CopyrightFooter />
    </>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function Sidebar({ weekendsVisible, handleWeekendsToggle, currentEvents }) {
  return (
    <div className="bg-white-800 p-4 rounded-lg w-64">
      <h2 className="text-xl font-semibold mb-4">Opcje</h2>
      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            className="h-4 w-4"
          />
          <span>Pokaż weekendy</span>
        </label>
      </div>
      
      <div>
        <h3 className="font-medium mb-2 text-lg">Aktualne wydarzenia ({currentEvents.length})</h3>
        <ul className="space-y-2 max-h-96 overflow-auto">
          {currentEvents.map(event => (
            <li key={event.id} className="bg-blue-500 p-2 rounded">
              <strong>{event.title}</strong>
              <p className="text-xs opacity-80">
                {new Date(event.start).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }) {
  console.log(event)
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
