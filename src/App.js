
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {useState} from "react";

import Menu from './components/Menu';
import Home from './components/Home';
import LocationEditor from './components/LocationEditor';
import NoPage from './components/NoPage';


 const locationsInit = []
//     [{id:0, name:"Jerusalem", longtitude:31.7683, latitude:35.2137},
//     {id:1, name:"Tel Aviv", longtitude:32.0853, latitude:34.7817},
//     {id:2, name:"Haifa", longtitude:32.8153, latitude:34.9817},
//     {id:3, name:"Beer Sheva", longtitude:31.2553, latitude:34.8817}]

function deleteLocation(locations, id) {
    return locations.filter(location => location.id !== id);
}

function addLocation(locations, location) {
    location.id = locations.length;
    return [...locations, location];
}

function App() {
    const [locations, setLocations] = useState(locationsInit);
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu/>}>
            <Route index element={<Home locations={locations}/>}/>
            <Route path="locations" element={<LocationEditor locations={locations}
                                                             deleteLocation={
                                                                    (id)=>{ setLocations(deleteLocation(locations,id)) }
                                                             }
                                                             addLocation={
                                                                    (location)=>{ setLocations(addLocation(locations,location)) }
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