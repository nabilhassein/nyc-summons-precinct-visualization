'use strict';

import d3 from 'd3'
import d3_queue from 'd3-queue'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import UI from './components/UI.js'
import reducer from './reducer.js'

d3_queue.queue()
    .defer(d3.json, "data/police_precincts.geojson")
    .defer(d3.csv, "data/clean-summons-data.csv")
    .await( (error, precinctJson, violationData) => {
        const store = createStore(reducer);
        const defaultYear = "2007";
        const defaultViolation = "DISORDERLY CONDUCT";
        ReactDOM.render(
            <Provider store={store}>
                <UI precinctJson={precinctJson} violationData={violationData} currentYear={defaultYear} currentViolation={defaultViolation} />
            </Provider>,
            document.getElementById("root")
        );
    });
