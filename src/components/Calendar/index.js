import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import Modal from '../Modal';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import './styles.css';

export default class App extends React.Component {
    state = {
        weekendsVisible: true,
        currentEvents: [],
        showModal: false,
    };
    handleToggle = () => this.setState({ showModal: !this.state.showModal });

    render() {
        // console.log(this.state.currentEvents);
        return (
            <div className='demo-app'>
                {this.renderSidebar()}
                <div className='demo-app-main'>
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
                    />
                </div>
                <Modal
                    handleToggle={this.handleToggle}
                    isOpen={this.state.showModal}
                />
            </div>
        );
    }

    renderSidebar() {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>
                            Select dates and you will be prompted to create a
                            new event
                        </li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={this.state.weekendsVisible}
                            onChange={this.handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({this.state.currentEvents.length})</h2>
                    <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
                </div>
            </div>
        );
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible,
        });
    };

    handleDateSelect = (selectInfo) => {
        let start = moment(selectInfo.startStr).format('YYYY-MM-DD HH:mm a');
        let end = moment(selectInfo.endStr).format('YYYY-MM-DD HH:mm a');
        // let end = moment(selectInfo.end).format('YYYY-MM-DD HH:mm a');
        console.log(start, end);
        this.handleToggle();
        // change this to be in the modal instead of a prompt
        // let title = prompt('Please enter a new title for your event');
        let calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection
        let title = 'title hardcoded in app.js line 108';
        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                // backgroundColor: 'yellow',
                // textColor: 'black',
                start,
                // start: selectInfo.startStr,
                end,
                // end: selectInfo.endStr,
                allDay: false,
            });
        }
    };

    handleEventClick = (clickInfo) => {
        let ConfirmDelete = window.confirm(
            `Are you sure you want to delete the event '${clickInfo.event.title}'`
        );
        if (ConfirmDelete) {
            clickInfo.event.remove();
        }
    };

    handleEvents = (events) => {
        this.setState({
            currentEvents: events,
        });
    };
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>
                {formatDate(event.start, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
            </b>
            <i>{event.title}</i>
        </li>
    );
}
