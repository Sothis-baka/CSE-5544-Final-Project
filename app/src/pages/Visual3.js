const Visual3 = () => {
    return(
        <div>
            <img src={process.env.PUBLIC_URL + '/first_visual.jpg'}/>
            <p>
                In this graph, the red points represent patitents with stroke and blue points represent patients without stroke. The triangle represents male patients and circle represents female. The patients with heart disease are shown with bigger circle.
            </p>
        </div>
    );
}

export default Visual3;