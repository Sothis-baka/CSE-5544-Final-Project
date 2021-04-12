import React from 'react';
import Plotly from 'plotly.js-dist';

import dataSource from '../sources/healthcare-dataset-stroke-data.csv';

const drawChart = () => {
    Plotly.d3.csv(dataSource, function(err, rows){
        function unpack(rows, key) {
            return rows.map(function(row) {
                return row[key];
            });
        }

        const data = [{
            type: 'parcoords',
            // Padding
            pad: [100,100,100,100],
            line: {
                color: unpack(rows, 'stroke'),
                colorscale: [[0, '#74b9ff'], [1, '#ff7675']]
            },

            dimensions: [
                {
                    label: 'Gender',
                    tickvals: [0, 1, 2],
                    ticktext: ['Male', 'Female', 'Other'],
                    values: JSON.parse(JSON.stringify(unpack(rows, 'gender')).replaceAll('Male', '0').replaceAll('Female', '1').replaceAll('Other', '2'))
                },
                {
                    label: 'Age',
                    range: [0.08, 82],
                    values: unpack(rows, 'age')
                },
                {
                    label: 'Work type',
                    tickvals: [0, 1, 2, 3, 4],
                    ticktext: ['Children', 'Govt job', 'Never worked', 'Private', 'Self employed'],
                    values: JSON.parse(JSON.stringify(unpack(rows, 'work_type')).replaceAll('children', '0').replaceAll('Govt_job', '1').replaceAll('Never_worked', '2').replaceAll('Private', '3').replaceAll('Self-employed', '4'))
                },
                {
                    label: 'Residence type',
                    tickvals: [0, 1],
                    ticktext: ['Urban', 'Rural'],
                    values: JSON.parse(JSON.stringify(unpack(rows, 'Residence_type')).replaceAll('Urban', '0').replaceAll('Rural', '1'))
                },
                {
                    label: 'Smoking status',
                    tickvals: [0, 1, 2, 3],
                    ticktext: ['formerly smoked', 'never smoked', 'smokes', 'Unknown'],
                    values: JSON.parse(JSON.stringify(unpack(rows, 'smoking_status')).replaceAll('formerly smoked', '0').replaceAll('never smoked', '1').replaceAll('smokes', '2').replaceAll('Unknown', '3'))
                },
                {
                    label: 'Average glucose level',
                    range: [55.1, 272],
                    values: unpack(rows, 'avg_glucose_level')
                },
                {
                    label: 'BMI',
                    range: [10.1, 97.6],
                    values: unpack(rows, 'bmi')
                }
            ]
        }];

        const layout = {
            title:"Parallel Coordinates of the distribution of several factors on stroke",
            width: 1200,
            height:600
        };

        Plotly.newPlot('myDiv', data, layout);
    });
};

const Legend = ({ label, color }) => {
    return(
        <div className='row'>
            <div className='legend' style={{ backgroundColor: color }}/>
            <span>{ label }</span>
        </div>
    );
};

class ParallelCoordinates extends React.Component{
    componentDidMount() {
        drawChart();
    }

    render() {
        return (
            <div id="myDiv">
                <div id='legends'>
                    <Legend label={'Without Stroke'} color='#74b9ff'/>
                    <Legend label={'With Stroke'} color='#ff7675'/>
                </div>
            </div>
        );
    }
}

export default ParallelCoordinates;

