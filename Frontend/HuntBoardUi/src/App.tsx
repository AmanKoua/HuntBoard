import {BrowserRouter, Route, Routes} from "react-router";
import {ProfileSelector} from "./pages/profileSelector/ProfileSelector.tsx";
import "./App.scss"
import {Header} from "./components/header/Header.tsx";

function App() {

       return <>
    <Header/>
    <BrowserRouter>
            <Routes>
                <Route index element={<ProfileSelector/>} />
            </Routes>
        </BrowserRouter>
    </>
}

export default App
