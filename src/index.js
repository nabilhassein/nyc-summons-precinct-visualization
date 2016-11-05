'use strict';

import d3 from 'd3'
import d3_queue from 'd3-queue'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import UI from './components/UI.js'
import { defaultState, reducer } from './reducer.js'

d3_queue.queue()
    .defer(d3.json, "data/police_precincts.geojson")
    .defer(d3.csv, "data/clean-summons-data.csv")
    .await( (error, precinctJson, violationData) => {
        const store = createStore(reducer);

        const years = d3.keys(violationData[0]).filter(col => +col == col).sort(),
              firstYear = years[0],
              lastYear = years[years.length - 1];

        ReactDOM.render(
            <Provider store={store}>
                <UI
                    precinctJson={precinctJson}
                    violationData={violationData}
                    firstYear={firstYear}
                    lastYear={lastYear}
                    currentYear={defaultState.currentYear}
                    currentViolation={defaultState.currentViolation}
                />
            </Provider>,
            document.getElementById("root")
        );
    });
