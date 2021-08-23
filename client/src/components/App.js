import React from 'react';
import { Router , Route , Switch} from 'react-router-dom';
import streamList from './streams/streamList';
import streamCreate from './streams/streamCreate';
import streamEdit from './streams/streamEdit';
import streamShow from './streams/streamShow';
import streamDelete from './streams/streamDelete';
import Header from './Header';
import history from "../history";


const App = ()=>{
    return (<div>
      
        <Router history={history}>
        <div> 
            <Header />
            <Switch>
                <Route path = "/" exact component={streamList} />
                <Route path = "/streams/new" component={streamCreate} />
                <Route path = "/streams/edit/:id" component={streamEdit} />
                <Route path = "/streams/delete/:id" component={streamDelete} />
                <Route path = "/streams/:id" component={streamShow} />
            </Switch>
        </div>
        </Router>
    </div>)
}

export default App;