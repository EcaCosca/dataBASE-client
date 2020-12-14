import React, { Component } from 'react';
import { withAuth } from '../context/auth-context';



export class ExitPreview extends Component {
    
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default withAuth(ExitPreview)
