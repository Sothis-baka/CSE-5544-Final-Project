import * as d3 from 'd3';
import data from '../sources/healthcare-dataset-stroke-data.csv';

const loadedData = async () => {
    return d3.csv(data);
}

export default loadedData;