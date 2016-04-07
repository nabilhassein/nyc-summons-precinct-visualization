'use strict';

import d3 from 'd3';
import d3_queue from 'd3-queue';
import React from 'react';
import ReactDOM from 'react-dom';
import UI from './components/UI.js';

d3_queue.queue()
    .defer(d3.json, "data/police_precincts.geojson")
    .defer(d3.csv, "data/clean-summons-data.csv")
    .await( (error, precinctJson, violationData) => {
        ReactDOM.render(
            <UI precinctJson={precinctJson} violationData={violationData} />,
            document.getElementById("root")
        );
    });
