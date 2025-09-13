<<<<<<< HEAD
// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
=======
// import React from "react";
// import LoginPage from "./components/LoginPage"; // Importing your component

// function App() {
//   return (
//     <div>
//       <LoginPage />   {/* Using the component */}
//     </div>
    
//   );
// }

// export default App;

import React from "react";
import SignUp from "./components/SignUp"; // Importing your component
>>>>>>> 2285b470e1f8192dc8de1a095cf72b0427f80348

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
