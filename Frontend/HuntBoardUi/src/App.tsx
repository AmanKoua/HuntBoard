import { BrowserRouter, Route, Routes } from "react-router";
import { ProfileSelector } from "./pages/profileSelector/ProfileSelector.tsx";
import "./App.scss"
import { Header } from "./components/header/Header.tsx";
import { Dashboard } from "./pages/dashboard/Dashboard.tsx";
import { AppContext } from "./context/appContext.ts";
import { useDefaultAppContext } from "./hooks/useDefaultAppContext.ts";

function App() {

    const defaultAppContext = useDefaultAppContext();

    return <>
        <AppContext.Provider value={defaultAppContext}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<ProfileSelector />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    </>
}

export default App
