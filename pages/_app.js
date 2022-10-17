import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Router from "next/router";
import {useState} from "react";
import Loader from "@components/loader";



function MyApp({ Component, pageProps }) {
  const [loading,setLoading] = useState(false);
  Router.events.on("routeChangeStart",(url)=>{
    setLoading(true);
   
  })
  Router.events.on("routeChangeComplete",(url)=>{
    setLoading(false);
   
  })
  return (
    <ThemeProvider attribute="class">
      {loading ? (<Loader/>):( <Component {...pageProps} />)}
     
    </ThemeProvider>
  );
}

export default MyApp;
