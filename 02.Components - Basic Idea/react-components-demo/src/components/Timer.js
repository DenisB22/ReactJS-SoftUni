import React from 'react';

const Timer = (props) => {
    const [seconds, setSeconds] = React.useState(props.start);
    
    // let seconds = props.start;

    console.log('seconds -' + seconds);

    // Not good practice (useEffect is better)
    setTimeout(() => {
       // setSeconds(seconds + 1);
       // setSeconds(20);
       setSeconds(state => state + 1);
    //    setSeconds(state => state + 1);
       
    }, 1000);


    return (
        <div>
            <h2>Timer</h2>
            Time: {seconds}s
        </div>
    );
};

export default Timer;