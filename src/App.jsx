import { useEffect } from "react";
import Carousal from "./Components/Carousal/Carousal";
import Navbar from "./Components/Navbar/Navbar";
import { MyntraApi } from "./Components/Axios/Api";
import { InsertLogo } from "./Redux/Recducer/WishListReducer";
import { useDispatch } from "react-redux";
// import { createAsyncThunk } from "@reduxjs/toolkit";

function App() {

  // const fetchLogo = createAsyncThunk(async () => {
  //   const res = await MyntraApi.get('/icons');
  //   return await res.json();
  // });

const dispatcher = useDispatch();
  useEffect(() => {
    const fetchWish = async () => {
      try {
        const res = await MyntraApi.get("/icons");
        dispatcher(InsertLogo(res.data));
      } catch (error) {
        alert("Error in fetching");
      }
    };
    fetchWish();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousal />
    </div>
  );
}

export default App;
