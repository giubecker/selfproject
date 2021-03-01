import React from 'react'
import { Header } from '../Website/Header';
import { Navbar } from '../Website/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
  import {UserStorage} from '../../UserContext';
import Blog from '../Website/Blog';
import About from '../Website/About';


export const Website = () => {
    return (
        <div>
        <Router>
        <UserStorage>
<About/>
<Blog/>
                    {/* <Navbar /> */}
        <Header />
        </UserStorage>


        </Router>

            Website
        </div>
    )
};

export default Website;
