import {BrowserRouter, Route, Routes} from "react-router";
import {ProfileSelector} from "./pages/profileSelector/ProfileSelector.tsx";
import "./App.scss"

function App() {

       return  <BrowserRouter>
            <Routes>
                <Route index element={<ProfileSelector/>} />
            </Routes>
        </BrowserRouter>
}

export default App
