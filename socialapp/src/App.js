import About from "./About";
import Missing from "./Missing";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Header from "./Header"
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import EditPost from "./EditPost";
import { DataProviders } from "./context/DataContext";



function App() {
  
  return (
    <div className="App">
      <DataProviders>

        <Header 
          title='My Social Media app'/> 

        <Nav />

          <Routes>
              <Route path='/' element={
                <Home />} />
              <Route path='/post'>
                <Route index element={<NewPost/>} />
              <Route path=':id' element={<PostPage />} />
              </Route>
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<Missing />} />
        </Routes>
        <Footer /> 
       </DataProviders>
         
    </div>
  );
}


export default App;
