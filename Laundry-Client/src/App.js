import {Route,Routes,BrowserRouter} from "react-router-dom";
import OrderBody from "./Components/Protected comp/Components/order-create";
import OrderPage from "./Components/Protected comp/Components/order_page";
import Signinpage from "./Components/Unprotected comp/Parent comp/Signinpage";
import Registerpage from "./Components/Unprotected comp/Parent comp/RegisterPage";
import Protected from "./Components/Protected comp/Protected";
import Logoutcomp from "./Components/Protected comp/Logout comp/Logoutcomp";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/create-order" element={<Protected><OrderBody/></Protected>}></Route>
      <Route path="/viewOrder" element={<Protected> <OrderPage/> </Protected>}/>
      <Route exact path="/" element={<Signinpage/>}></Route>
      <Route path="/Signin" element={<Signinpage/>}></Route>
      <Route path="/Register" element={<Registerpage/>}></Route>
      <Route path="/Logout"  element={<Protected><Logoutcomp/></Protected>}></Route>
    </Routes>
    </BrowserRouter> 
  );
}

export default App;