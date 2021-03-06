import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interaction from '@fullcalendar/interaction';
const axios = require('axios').default;
const backendURL = "https://init-meetingscheduler.herokuapp.com/";
const baseURL = "https://jolly-keller-8dfa48.netlify.app/";
//const backendURL = "http://localhost:2022";
//const baseURL = "http://localhost:3000";

let headers = new Headers()
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Origin',baseURL)

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    componentDidMount() {
        axios.get(backendURL)
        .then(response => {
            this.setState({
                events: response.data.data.map(event => {return (
                    { title: event.title, start :event.startTime, end :event.endTime}
                )}),
            })
        })
        .catch(error => { return error})
    }

    render() {
        return (
            <div className="container">  
                <div className="row title" style={{ marginTop: "20px" }} >  
                    <div class="col-sm-12 btn btn-info">  
                        Welcome, pick a date with me.
                        Please dont forget to drop your email in the note
                    </div>  
                </div>  
                <FullCalendar
                    plugins={[ timeGridPlugin, interaction ]}
                    weekends={false}
                    editable={true}
                    selectable={true}
                    events= {this.state.events}
                    selectLongPressDelay={1}
                    select={this.handleDateSelect}
                    initialView="timeGridWeek"
                />
            </div>  
        )  
    }

    handleDateSelect(info) {
        let title = prompt("Add Title that can be seen by all")
        let note = prompt("Add meeting note with your email address")

        axios({
            method: "post",
            url: backendURL,
            headers: headers,
            data: {title, note, startTime: info.startStr, endTime: info.endStr}
        })
    }
}

export default Calendar
