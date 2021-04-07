import { Link } from "react-router-dom";

import '../styles/Home.css';
import '../styles/button.css';

const Home = () => {
    return(
        <div id='HomeWrapper'>
            <h1 id='homeTitle'>CSE 5544 Final Project</h1>
            <p id='Author'>Adithya Reji, Cyrus Li, Taoqi Yang</p>
            <div className='BtnGroup'>
                <Link to='/visual1'><button className='btn-1'><span>Visualization 1</span></button></Link>
                <Link to='/visual2'><button className='btn-3'><span>Visualization 2</span></button></Link>
                <Link to='/visual3'><button className='btn-4'><span>Visualization 3</span></button></Link>
            </div>
        </div>
    );
};

export default Home;