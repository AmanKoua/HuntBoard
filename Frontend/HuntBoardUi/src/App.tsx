import {BrowserRouter, Route, Routes} from "react-router";
import {ProfileSelector} from "./pages/profileSelector/ProfileSelector.tsx";
import "./App.scss"
import {Header} from "./components/header/Header.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";

function App() {

       return <>
    <Header/>
    <BrowserRouter>
            <Routes>
                <Route index element={<ProfileSelector/>} />
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </BrowserRouter>
    </>
}

export default App
