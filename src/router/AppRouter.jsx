import React from "react";
import { Route, Routes } from "react-router";
import Main from "../pages/Main";
import FormQuestions from "../pages/FormQuestions";
import DbMain from "../pages/DbMain";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPass from "../pages/ForgotPass";
import Verification from "../pages/Verification";
import DemoPageContent from "../pages/Dashboard";
import ResetForgottenPass from "../pages/ResetForgottenPass";
import PrivateRouter from "../pages/PrivateRouter";
import Submitted from "../pages/Submitted";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Testimonials from "../pages/Testimonials";

const AppRouter = () => {
  return (
    <Routes>


      <Route path="/" element={<Main />} />
      <Route path="/dbmain/login" element={<Login/>}/>
      <Route path="/dbmain/register" element={<Register/>}/>
      <Route path="/dbmain/verification" element={<Verification/>}/>
      <Route path="/dbmain/forgotpass" element={<ForgotPass/>}/>
      <Route path="/reset-password/:userId" element={<ResetForgottenPass />} />
      <Route path="/apply" element={<FormQuestions />} />
      <Route path="/dbmain" element={<DbMain/>}/>
      <Route path="/submitted" element={<Submitted/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/testimonials" element={<Testimonials/>}/>
      <Route path="*" element={<NotFound/>}/>

      <Route path="/" element={<PrivateRouter />}>
      <Route path="/dashboard" element={<DemoPageContent/>}/>
    </Route>
    </Routes>
  );
};

export default AppRouter;
