import React from 'react'
import './404.scss';
import {Link} from 'react-router-dom';
export default function NotFound() {
    return (
        <div className='not-found'>
            <h1>Error 404. Page not found</h1>
            <Link to='/'>Go back</Link>
        </div>
    )
}
