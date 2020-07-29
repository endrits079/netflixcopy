import React from 'react'
import './Movie.scss';

import PreviewContainer from '../../components/preview-container/PreviewContainer';
export default function Movie(props) {
    let formData = new FormData();
    formData.append("getMovie", true);
    formData.append("id", props.match.params.id);
    return (
        <div className='movie'>
            <PreviewContainer formData={formData}></PreviewContainer>
        </div>
    )
}
