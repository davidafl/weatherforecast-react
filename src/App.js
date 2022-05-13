
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {useReducer} from "react";

import Menu from './components/Menu';
import Home from './components/Home';
import LocationEditor from './components/LocationEditor';
import NoPage from './components/NoPage';


 const locationsInit = []
//     [{id:0, name:"Jerusalem", longtitude:31.7683, latitude:35.2137},
//     {id:1, name:"Tel Aviv", longtitude:32.0853, latitude:34.7817},
//     {id:2, name:"Haifa", longtitude:32.8153, latitude:34.9817},
//     {id:3, name:"Beer Sheva", longtitude:31.2553, latitude:34.8817}]

function locationsReducer(locations,action){
    switch(action.type){
        case 'ADD_LOCATION':
            action.location.id = locations.length;
            return [...locations,action.location]
        case 'REMOVE_LOCATION':
            return locations.filter(location => location.id !== action.id)
        default:
            return locations
    }
}

function App() {
    const [locations, dispatch] = useReducer(locationsReducer,locationsInit);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu/>}>
            <Route index element={<Home locations={locations}/>}/>
            <Route path="locations" element={<LocationEditor locations={locations}
                                                             deleteLocation={
                                                                    (id)=>{dispatch({type:'REMOVE_LOCATION',id})}
                                                             }
                                                             addLocation={
                                                                    (location)=>{dispatch({type:'ADD_LOCATION',location})}
                                                             }
                                             />
            }/>
            <Route path="*" element={<NoPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;