import "./ThingstoDo.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThingsToDo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [next, setNext] = useState();
    const [previous, setPrevious] = useState();
    const [locationId, setLocationId] = useState(298571);

    const handleNext = () => {
      let newValue = locationId + 1; 
      if(newValue == 298576){
        newValue = 298571
      }
      setLocationId(newValue);
      console.log("clicked");
    }

    const handlePrevious = () => {
      let newValue = locationId - 1; 
      setLocationId(newValue);
      console.log("clicked");
    }


    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://travel-advisor.p.rapidapi.com/attractions/list',
            params: {
              location_id: locationId,
              currency: 'USD',
              lang: 'en_US',
              lunit: 'km',
              sort: 'recommended'
            },
            headers: {
              'X-RapidAPI-Key': '7b7fc55551msh75c870ab4ca9d94p1708d5jsn1233d8d9fad4',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          };
      
          setLoading(true);
          axios.request(options)
          .then((response) => {
            setLoading(false);
            console.log(response.data.data)
            setTodos(response.data.data)
          })
          .catch((err) => {
            console.log(err.message);
            setError(err.message);
          })
    }, [locationId]);
    
    // handling the search keyword
    const handlingSearch = () => {
        
    }


  if(error){
    return (
      <div className="error">
        <img src="https://i.gifer.com/origin/4b/4b55c3867e2fc9d86d1beb8ab2ce2a1d_w200.gif" alt="erro Image" />
        <p>Oops! An Error Occured: {error}</p>
      </div>
    )
  }else if (loading){
    return (
      <div className="loadContainer">
        <img src="https://icon-library.com/images/loading-gif-icon/loading-gif-icon-18.jpg" alt="loading" />
        <p>Loading...</p>
      </div>
    )
  }else{
    return (
      <div className='ttd'>
        <h1 className="head">Discover Captivating Destinations and Attractions</h1>
          <div className="ttd-container">
            {
                todos.map((todo) => {
                  return(
                    <div className='container'>
                            <div className="image">
                              {todo.photo?.images?.large.url?
                                <img src={todo.photo?.images?.large.url} alt='image'/> :
                                <img src='https://uknow.uky.edu/sites/default/files/styles/uknow_story_image/public/GettyImages-1160947136%20%281%29.jpg' alt='image'/>
                              }
                                
                            </div>
                            <div className="name">
                                
                                {todo.name?
                                  <h1>{todo.name}</h1> :
                                  <h1>Lorem ipsum dolor sit amet.</h1>
                                }
  
                                {todo.address?
                                  <p><i class="fa-solid fa-location-dot" style={{color: "#000"}}></i> {todo.address}</p> :
                                  <p><i class="fa-solid fa-location-dot" style={{color: "#000"}}></i> Lorem ipsum dolor sit amet consectetur.</p>
                                }
  
                                {todo.phone?
                                  <p className="contact"><i class="fa-solid fa-phone-volume" style={{color: "#000"}}></i> {todo.phone}</p> :
                                  <p className="contact"><i class="fa-solid fa-phone-volume" style={{color: "#000"}}></i> +12345678910</p>
                                }
  
                                {}
                                {todo.description?
                                  <p>{todo.description}</p> : 
                                  <p>Lorem ipsum dolor sit amet consectetur adipisicing 
                                    elit. Voluptatum nulla error repellat saepe odit explicabo 
                                    enim. Fugiat amet, at ut ipsum consequatur consequuntur est 
                                    esse voluptatem dolorem quos laborum earum!
                                    </p>
                                }
                            </div>
                        </div>
                  )
                })
            }
          </div>
          <div className="btnContainer">
            <i onClick={handlePrevious} class="fa-solid fa-circle-chevron-left"></i>
            <i onClick={handleNext} class="fa-solid fa-circle-chevron-right"></i>
          </div>
      </div>
    )
  }
}

export default ThingsToDo