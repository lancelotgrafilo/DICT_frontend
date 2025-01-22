
// import { TrainingPage } from './pages/TrainingPage/TrainingPage.jsx'
import { SignUpPage } from './pages/SignUpPage/SignUpPage.jsx' 
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx"
import { Sidebar } from './components/Sidebar/Sidebar.jsx'

export default function App() {
  return (
    <>
      {/* <TrainingPage /> */}
      <Sidebar/>
      <LoginPage/>
      <SignUpPage />
    </>
  )
  
}
