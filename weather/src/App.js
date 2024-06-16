
import './App.css';

import ContextProvider from './ReactContext/Context';
import Home from './components/Home/Home';


const App=()=>(
    <ContextProvider>
        <Home/>
    </ContextProvider>
)

export default App;
