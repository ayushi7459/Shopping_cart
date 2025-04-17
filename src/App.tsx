import { Provider } from "react-redux"
import { store } from "./app/store"
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Dashboard from "./components/dashboard"
import Carts from "./components/Carts"
import './index.css';
import List from "./components/listPage";
import Dropdown_menu  from "./components/dropdown";



const App=() =>{

  return (
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cart" element={<Carts/>}/>
      <Route path="/userlist" element={<List/>}/>
      <Route path="/dropdown_menu" element={<Dropdown_menu/>}/>
    </Routes>
  </BrowserRouter>
  </Provider>
  )
}

export default App
