import React, { useState, useEffect} from 'react'
import axios from 'axios';


function Counter() {

    const [count, setCount] = useState(0);


    return (
        <div className="container">
            <p>{count}</p>

            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
            
        </div>
    )
}

export default Counter
