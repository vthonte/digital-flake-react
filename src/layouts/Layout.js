import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthSimpleLayout from './AuthSimpleLayout';
import is from 'is_js';
import MainLayout from './MainLayout';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import Protected from 'components/authentication/Protected';

import ErrorLayout from './ErrorLayout';

import Landing from 'components/pages/landing/Landing';
import { toast, ToastContainer } from 'react-toastify';
import { CloseButton } from 'components/common/Toast';

import DarkMode from 'components/documentation/DarkMode';
import Plugins from 'components/documentation/Plugins';
import Styling from 'components/documentation/Styling';
import DesignFile from 'components/documentation/DesignFile';
import Changelog from 'components/documentation/change-log/ChangeLog';

import ModalAuth from 'components/authentication/modal/ModalAuth';


import Error404 from 'components/errors/Error404';
import Error500 from 'components/errors/Error500';

import SimpleLogin from 'components/authentication/simple/Login';
import SimpleLogout from 'components/authentication/simple/Logout';
import SimpleRegistration from 'components/authentication/simple/Registration';
import SimpleForgetPassword from 'components/authentication/simple/ForgetPassword';
import SimplePasswordReset from 'components/authentication/simple/PasswordReset';
import SimpleConfirmMail from 'components/authentication/simple/ConfirmMail';
import SimpleLockScreen from 'components/authentication/simple/LockScreen';


import Dashboard from 'components/dashboards/default';
import AppContext from 'context/Context';
import Faq from 'components/documentation/Faq';


import Category from 'components/app/digital-flake/Category';
import Product from 'components/app/digital-flake/Product';
import AddProduct from 'components/app/digital-flake/AddProduct';
import AddCategory from 'components/app/digital-flake/AddCategory';

const Layout = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const {
    config: { navbarPosition }
  } = useContext(AppContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  const [isLoggedIn, setisLoggedIn] = useState(false)


  useEffect(() => {
    const digitalFlake = JSON.parse(localStorage.getItem("digitalFlake"));
    setisLoggedIn(digitalFlake?.isLoggedIn);

  }, []);



  return (
    <>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route element={<ErrorLayout />}>
          <Route path="errors/404" element={<Error404 />} />
          <Route path="errors/500" element={<Error500 />} />
        </Route>
        {/*- ------------- Authentication ---------------------------  */}

        {/*- ------------- simple ---------------------------  */}
        <Route element={<AuthSimpleLayout />}>
          <Route path="authentication/simple/login" element={<SimpleLogin />} />
          <Route
            path="authentication/simple/register"
            element={<SimpleRegistration />}
          />
          <Route
            path="authentication/simple/logout"
            element={<SimpleLogout />}
          />
          <Route
            path="authentication/simple/forgot-password"
            element={<SimpleForgetPassword />}
          />
          <Route
            path="authentication/simple/reset-password"
            element={<SimplePasswordReset />}
          />
          <Route
            path="authentication/simple/confirm-mail"
            element={<SimpleConfirmMail />}
          />
          <Route
            path="authentication/simple/lock-screen"
            element={<SimpleLockScreen />}
          />
        </Route>


        {/* //--- MainLayout Starts  */}

        <Route element={<MainLayout />}>
          <Route path="/"
            element={<Protected isLoggedIn={isLoggedIn} component={<Dashboard />} />} />
          <Route path="digital-flake/products"
            element={<Protected isLoggedIn={isLoggedIn} component={<Product />} />} />
          <Route path="digital-flake/category"
            element={<Protected isLoggedIn={isLoggedIn} component={<Category />} />} />
          <Route path="digital-flake/add-category"
            element={<Protected isLoggedIn={isLoggedIn} component={<AddCategory />} />} />
          <Route path="digital-flake/add-product"
            element={<Protected isLoggedIn={isLoggedIn} component={<AddProduct />} />} />


          <Route path="digital-flake/add-category" element={<AddCategory />} />
          <Route path="digital-flake/add-product" element={<AddProduct />} />
          <Route path="documentation/styling" element={<Styling />} />
          <Route path="documentation/dark-mode" element={<DarkMode />} />
          <Route path="documentation/plugin" element={<Plugins />} />
          <Route path="documentation/faq" element={<Faq />} />
          <Route path="documentation/design-file" element={<DesignFile />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="authentication-modal" element={<ModalAuth />} />
        </Route>

        {/* //--- MainLayout end  */}

        {/* <Navigate to="/errors/404" /> */}
        <Route path="*" element={<Navigate to="/errors/404" replace />} />
      </Routes>
      <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </>
  );
};

export default Layout;
