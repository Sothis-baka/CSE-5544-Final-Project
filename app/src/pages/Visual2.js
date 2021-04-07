import React from "react";

import ParallelCoordinates from "../components/ParallelCoordinates";

class Visual2 extends React.Component{
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
    }

    render() {
        return(
            <div id='visual1'>
                <ParallelCoordinates/>
            </div>
        );
    }
}

export default Visual2;