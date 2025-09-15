import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import LoginPage from "./Signin/LoginPage";
import SignUp from "./Signup/SignUp";
import HomePage from "./Home/HomePage";

const styles = {
  notFound: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Home Page */}
        <Route path="/home" element={<HomePage />} />
        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={styles.notFound}>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;













// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./Landing/LandingPage";
// import LoginPage from "./Signin/LoginPage";
// import SignUp from "./Signup/SignUp";
// import HomePage from "./Home/HomePage";



// function App() {
//   return (
//     <Router>
//       <Routes>
        
//         {/* Landing Page at root */}
//         <Route path="/" element={<LandingPage />} />

//         <Route path="/login" element={<LoginPage />} />


//         <Route path="/signup" element={<SignUp />} />

//         {/* Home Page */}
//         <Route path="/home" element={<HomePage />} />

//         {/* 404 Fallback */}
//         <Route
//           path="*"
//           element={
//             <div style={styles.notFound}>
//               <h1>404 - Page Not Found</h1>
//               <p>The page you are looking for does not exist.</p>
//             </div>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }


// const styles = {
//   notFound: {
//     textAlign: "center",
//     marginTop: "100px",
//     fontFamily: "Arial, sans-serif",
//     color: "#333",
//   },
// };


// export default App;




