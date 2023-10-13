import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import CourseItemDetails from './Components/CourseItemDetails'
import NotFound from './Components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <Route exact path="/notfound" component={NotFound} />
    <Route exact path="/bad-path" />
    <Redirect to="/notfound" />
  </Switch>
)

export default App
