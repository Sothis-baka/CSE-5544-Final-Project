import React from "react";
import loadedData from "../utils/loadedData";

class Visual1 extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    async componentDidMount() {
        this.setState({
            data: await loadedData()
        });
    }

    render() {
        return(
            <div id='visual1'>
                <form id='visual1Form'>
                    <div className='radioGroup'>
                        <input type='radio' id='Residence_type' name='residenceOrWork' value='Residence_type'/>
                        <label>Residence_type</label>
                        <input type='radio' id='Work_type' name='residenceOrWork' value='Work_type'/>
                        <label>Work_type</label>
                    </div>
                    <div className='checkboxGroup'>
                        <input type='checkbox' id='Gender' name='Gender' value='Gender'/>
                        <label>Gender</label>
                        <input type='checkbox' id='Marriage' name='Marriage' value='Marriage'/>
                        <label>Marriage</label>
                        <input type='checkbox' id='Smoke' name='Smoke' value='Smoke'/>
                        <label>Smoke</label>
                    </div>
                </form>

            </div>
        );
    }
}

export default Visual1;