import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import createStore from './store/create-store.js'

const store=createStore()
console.log('Store',store.getState());
store.subscribe(()=>{
    console.log('store Updated',store.getState())
})
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={store}>
         <App />
    </Provider>
        
    </BrowserRouter>
   

)
