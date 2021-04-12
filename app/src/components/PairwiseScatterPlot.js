import React from "react";
import Plotly from 'plotly.js-dist';

import compareSet from "../utils/compareSet";

const drawChart = (id, data) => {
    const x1 = [], x2 = [], x3 = [], x4=[], y1 = [], y2 = [], y3 = [], y4 = [],
        x5 = [], x6 = [], x7 = [], x8=[], y5 = [], y6 = [], y7 = [], y8 = [];

    for(let d of data){
        if(Number(d.stroke) === 0){
            if(Number(d.hypertension) === 1){
                if(Number(d.heart_disease) === 1){
                    x1.push(d.bmi);
                    y1.push(d.avg_glucose_level);
                }else{
                    x2.push(d.bmi);
                    y2.push(d.avg_glucose_level);
                }
            }else if(Number(d.heart_disease) === 1){
                x3.push(d.bmi);
                y3.push(d.avg_glucose_level);
            }else{
                x4.push(d.bmi);
                y4.push(d.avg_glucose_level);
            }
        }else{
            if(Number(d.hypertension) === 1){
                if(Number(d.heart_disease) === 1){
                    x5.push(d.bmi);
                    y5.push(d.avg_glucose_level);
                }else{
                    x6.push(d.bmi);
                    y6.push(d.avg_glucose_level);
                }
            }else if(Number(d.heart_disease) === 1){
                x7.push(d.bmi);
                y7.push(d.avg_glucose_level);
            }else{
                x8.push(d.bmi);
                y8.push(d.avg_glucose_level);
            }
        }
    }

    const trace1 = {
        x: x1,
        y: y1,
        mode: 'markers',
        type: 'scatter',
        name: 'WithoutStrokeWithBoth',
        marker: {
            color: '#CAD3C8',
            size: 3,
            line: {
                color: '#c56cf0',
                width: 0.4
            }
        }
    };

    const trace2 = {
        x: x2,
        y: y2,
        mode: 'markers',
        type: 'scatter',
        name: 'WithoutStrokeWithHypertension',
        marker: {
            color: '#CAD3C8',
            size: 3,
            line: {
                color: '#ff4d4d',
                width: 0.4
            }
        }
    };

    const trace3 = {
        x: x3,
        y: y3,
        mode: 'markers',
        type: 'scatter',
        name: 'WithoutStrokeWithHeartDisease',
        marker: {
            color: '#CAD3C8',
            size: 3,
            line: {
                color: '#18dcff',
                width: 0.4
            }
        }
    };

    const trace4 = {
        x: x4,
        y: y4,
        mode: 'markers',
        type: 'scatter',
        name: 'WithoutStrokeWithNeither',
        marker: {
            color: '#CAD3C8',
            size: 3,
            line: {
                color: 'aliceblue',
                width: 0.4
            }
        }
    };

    const trace5 = {
        x: x5,
        y: y5,
        mode: 'markers',
        type: 'scatter',
        name: 'WithStrokeWithBoth',
        marker: {
            color: '#3d3d3d',
            size: 3,
            line: {
                color: '#c56cf0',
                width: 0.4
            }
        }
    };

    const trace6 = {
        x: x6,
        y: y6,
        mode: 'markers',
        type: 'scatter',
        name: 'WithStrokeWithHypertension',
        marker: {
            color: '#3d3d3d',
            size: 3,
            line: {
                color: '#ff4d4d',
                width: 0.4
            }
        }
    };

    const trace7 = {
        x: x7,
        y: y7,
        mode: 'markers',
        type: 'scatter',
        name: 'WithStrokeWithHeartDisease',
        marker: {
            color: '#3d3d3d',
            size: 3,
            line: {
                color: '#18dcff',
                width: 0.4
            }
        }
    };

    const trace8 = {
        x: x8,
        y: y8,
        mode: 'markers',
        type: 'scatter',
        name: 'WithStrokeWithNeither',
        marker: {
            color: '#3d3d3d',
            size: 3,
            line: {
                color: 'aliceblue',
                width: 0.4
            }
        }
    };

    const myData = [trace1, trace2, trace3, trace4, trace5, trace6, trace7, trace8];

    const layout = {
        width: 280,
        height: 280,
        xaxis: {
            range: [0, 100]
        },
        yaxis: {
            range: [0, 300]
        },
        title: id,
        showlegend: false
    }

    Plotly.newPlot(id, myData, layout)
}

class SctPlot extends React.Component{
    componentDidMount() {
        drawChart(this.props.name, this.props.data)
    }

    componentDidUpdate() {
        drawChart(this.props.name, this.props.data)
    }

    render() {
        return (
            <div id={ this.props.name } className='SctPlot col'>
            </div>
        );
    }
}

const PlotRow = ({ data, x_selected, y }) => {
    if(x_selected.size === 2){
        if(compareSet(x_selected, new Set(['Gender', 'Marriage']))){
            return (
                <div>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.ever_married === 'Yes') } name={ y+'Married male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.ever_married === 'No') } name={ y+'Not married male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.ever_married === 'Yes') } name={ y+'Married female' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.ever_married === 'No') } name={ y+'Not married female' }/>
                </div>
            );
        }else if (compareSet(x_selected, new Set(['Gender', 'Smoke']))){
            return (
                <div className='row'>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.smoking_status === 'formerly smoked') } name={ y+'Formerly smoked male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.smoking_status === 'never smoked') } name={ y+'Never smoked male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.smoking_status === 'smokes') } name={ y+'Smokes male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Male' && d.smoking_status === 'Unknown') } name={ y+'Unknown male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.smoking_status === 'formerly smoked') } name={ y+'Formerly smoked female' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.smoking_status === 'never smoked') } name={ y+'Never smoked female' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.smoking_status === 'smokes') } name={ y+'Smokes female' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female' && d.smoking_status === 'Unknown') } name={ y+'Unknown female' }/>
                </div>
            );
        }else{
            return (
                <div className='row'>
                    <SctPlot data={ data.filter(d => d.ever_married === 'Yes' && d.smoking_status === 'formerly smoked') } name={ y+'Formerly smoked male' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'Yes' && d.smoking_status === 'never smoked') } name={ y+'Never smoked male' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'Yes' && d.smoking_status === 'smokes') } name={ y+'Smokes male' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'Yes' && d.smoking_status === 'Unknown') } name={ y+'Unknown male' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'No' && d.smoking_status === 'formerly smoked') } name={ y+'Formerly smoked female' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'No' && d.smoking_status === 'never smoked') } name={ y+'Never smoked female' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'No' && d.smoking_status === 'smokes') } name={ y+'Smokes female' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'No' && d.smoking_status === 'Unknown') } name={ y+'Unknown female' }/>
                </div>
            );
        }
    }else if(x_selected.size === 1){
        if(compareSet(x_selected, new Set(['Gender']))){
            return (
                <div className='row'>
                    <SctPlot data={ data.filter(d => d.gender === 'Male') } name={ y+'Male' }/>
                    <SctPlot data={ data.filter(d => d.gender === 'Female') } name={ y+'Female' }/>
                </div>
            );
        }else if(compareSet(x_selected, new Set(['Marriage']))){
            return (
                <div className='row'>
                    <SctPlot data={ data.filter(d => d.ever_married === 'Yes') } name={ y+'Married' }/>
                    <SctPlot data={ data.filter(d => d.ever_married === 'No') } name={ y+'Not Married' }/>
                </div>
            );
        }else {
            return (
                <div className='row'>
                    <SctPlot data={ data.filter(d => d.smoking_status === 'formerly smoked') } name={ y+'Formerly smoked' }/>
                    <SctPlot data={ data.filter(d => d.smoking_status === 'never smoked') } name={ y+'Never smoked' }/>
                    <SctPlot data={ data.filter(d => d.smoking_status === 'smokes') } name={ y+'Smokes' }/>
                    <SctPlot data={ data.filter(d => d.smoking_status === 'Unknown') } name={ y+'Unknown' }/>
                </div>
            );
        }
    }

    return (
        <div className='row'>
            <SctPlot data={ data } name={ y }/>
        </div>
    );
}

const PairwiseScatterPlot = ({ x_selected, y_selected, data }) => {
    return (
        y_selected === 'Residence_type'
            ?
            <div>
                <span>Urban</span>
                <PlotRow x_selected={x_selected} y='U ' data={data.filter(d => d.Residence_type === 'Urban')}/>
                <span>Rural</span>
                <PlotRow x_selected={x_selected} y='R ' data={data.filter(d => d.Residence_type === 'Rural')}/>
            </div>
            :
            <div>
                <span>Children</span>
                <PlotRow x_selected={x_selected} y='C ' data={data.filter(d => d.work_type === 'children')}/>
                <span>Govt Job</span>
                <PlotRow x_selected={x_selected} y='G ' data={data.filter(d => d.work_type === 'Govt_job')}/>
                <span>Never worked</span>
                <PlotRow x_selected={x_selected} y='N ' data={data.filter(d => d.work_type === 'Never_worked')}/>
                <span>Private</span>
                <PlotRow x_selected={x_selected} y='P ' data={data.filter(d => d.work_type === 'Private')}/>
                <span>Self employed</span>
                <PlotRow x_selected={x_selected} y='S ' data={data.filter(d => d.work_type === 'Self-employed')}/>
            </div>
    );
}

export default PairwiseScatterPlot;