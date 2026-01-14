import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import AuthProvider from './componets/Components/AuthProvider.jsx'
import {Provider} from "react-redux"
import createStore from './store/create-store.js'

const store=createStore()
// console.log('store',store.getState());
// store.subscribe(()=>{
//   console.log('store updated',store.getState())
// })


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Provider store={store}>
         <AuthProvider>
             <App />
        </AuthProvider> 
    </Provider>
       
    </BrowserRouter>
   

)
