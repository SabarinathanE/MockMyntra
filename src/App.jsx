import Carousal from "./Components/Carousal/Carousal";
import Navbar from "./Components/Navbar/Navbar";

// import { createAsyncThunk } from "@reduxjs/toolkit";

function App() {

  // const fetchLogo = createAsyncThunk(async () => {
  //   const res = await MyntraApi.get('/icons');
  //   return await res.json();
  // });

  return (
    <div>
      <Navbar />
      <Carousal />
    </div>
  );
}

export default App;
