import React from "react";
import * as d3 from 'd3';

import '../styles/Visual1.css';

import dataSource from '../sources/healthcare-dataset-stroke-data.csv';
import PairwiseScatterPlot from "../components/PairwiseScatterPlot";

class Visual1 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }


    async componentDidMount() {
        const data = await d3.csv(dataSource);
        this.setState({
            data,
            x_selected: new Set(),
            y_selected: 'Residence_type',
            ageMin: 0,
            ageMax: 100,
            ageValid: true,
        })
    }

    handleNumChange = (e) => {
        let value = e.target.value === '' ? 0 : Number(e.target.value);
        e.target.name === 'ageMin'
            ? this.setState({ ageMin: value })
            : this.setState({ ageMax: value })
    }

    handleRadioChange = (e) => {
        this.setState({ y_selected: e.target.value});
    }

    handleCheckBoxes = (e) => {
        const name = e.target.name;
        const x_selected = this.state.x_selected;

        if(x_selected.has(name)){
            x_selected.delete(name);
        }else{
            x_selected.add(name);
        }

        this.setState(x_selected);
    }

    componentDidUpdate() {
        if(this.state.ageValid){
            if(this.state.ageMin > this.state.ageMax){
                this.setState({ ageValid: false});
            }
        }else{
            if(this.state.ageMin <= this.state.ageMax){
                this.setState({ ageValid: true});
            }
        }
    }

    render() {
        const data = this.state.data;

        if(!data){
            return <div className='container-fluid'><p>Loading</p></div>;
        }

        const newData = data.filter(d => {
            if(Number(d.age) >= Number(this.state.ageMin) && Number(d.age) <= Number(this.state.ageMax)){
                return true;
            }

            return false;
        })

        return(
            <div id='visual1' className='container-fluid'>
                <form id='visual1Form' className='row'>
                    <div className='radioGroup col' onChange={this.handleRadioChange}>
                        <div className='row'>
                            <input type='radio' id='Residence_type' name='residenceOrWork' value='Residence_type' defaultChecked={true}/>
                            <label htmlFor='Residence_type'>Residence_type</label>
                        </div>
                        <div className='row'>
                            <input type='radio' id='Work_type' name='residenceOrWork' value='Work_type'/>
                            <label htmlFor='Work_type'>Work_type</label>
                        </div>
                    </div>
                    <div className='checkboxGroup col' onChange={this.handleCheckBoxes}>
                        <div className='row'>
                            <input type='checkbox' id='Gender' name='Gender' value='Gender'/>
                            <label htmlFor='Gender'>Gender</label>
                        </div>
                        <div className='row'>
                            <input type='checkbox' id='Marriage' name='Marriage' value='Marriage'/>
                            <label htmlFor='Marriage'>Marriage</label>
                        </div>
                        <div className='row'>
                            <input type='checkbox' id='Smoke' name='Smoke' value='Smoke'/>
                            <label htmlFor='Smoke'>Smoke</label>
                        </div>
                    </div>
                    <div className='ageSelector col'>
                        <div className='row'><label>Age</label></div>
                        <div className='row'>
                            <label className='col'>From</label>
                            <div className='col'>
                                <input type='tel' name='ageMin' value={this.state.ageMin} onChange={this.handleNumChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col'>To</label>
                            <div className='col'>
                                <input type='tel' name='ageMax' value={this.state.ageMax} onChange={this.handleNumChange}/>
                            </div>

                        </div>
                        {this.state.ageValid ? null : <div className='row'><small>Invalid</small></div>}
                    </div>
                    <div id='visual1Legends' className='col'>
                        <div className='row'>
                            <label className='col'>Hypertension</label>
                            <div className='col'>
                                <div className='circleLegend' id='diseaseLegend1'>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col'>Heart_Disease</label>
                            <div className='col'>
                                <div className='circleLegend' id='diseaseLegend2'>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col'>Both</label>
                            <div className='col'>
                                <div className='circleLegend' id='diseaseLegend3'>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col'>Neither</label>
                            <div className='col'>
                                <div className='circleLegend' id='diseaseLegend4'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='Visual1StrokeLegends' className='col'>
                        <div className='row'>
                            <label className='col'>With Stroke</label>
                            <div className='col'>
                                <div className='circleLegend' id='strokeLegend1'>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <label className='col'>Without Stroke</label>
                            <div className='col'>
                                <div className='circleLegend' id='strokeLegend2'>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {this.state.x_selected.size < 3
                    ? <PairwiseScatterPlot data={newData} x_selected={ this.state.x_selected } y_selected={ this.state.y_selected }/>
                    : <p>Please don't select all checkboxes, otherwise the plot will be too large</p>
                }
            </div>
        );
    }
};

export default Visual1;