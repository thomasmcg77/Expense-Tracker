import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/footer";

import Header from "./components/header";
import AddExpense from "./pages/add-expense";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
