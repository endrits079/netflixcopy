import React from 'react'
import './SingleCategoryElement.scss';
export default function SingleCategoryElement(props) {
    return (
        <div className='single-category-element'>
            <img src={require(`../../../assets/entities/thumbnails/${props.img}`)}></img>
        </div>
    )
}
