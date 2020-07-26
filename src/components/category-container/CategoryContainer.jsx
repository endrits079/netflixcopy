import React,{useState,useEffect} from 'react'
import './CategoryContainer.scss';
import axios from 'axios';
export default function CategoryContainer() {
    const[categories,setCategories]=useState([]);
    useEffect(()=>{
        let formData = new FormData();
        formData.append('getCategories',true);
        axios.post('http://localhost/netflix/index.php',formData).then(response=>{
            console.log(response.data);
            setCategories(response.data);
        })
    },[])
    return (
        <div className='category-container'>
            
        </div>
    )
}
