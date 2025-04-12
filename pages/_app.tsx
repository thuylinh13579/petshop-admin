import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import '../public/vendors/bootstrap/dist/css/bootstrap.min.css';
import '../public/vendors/font-awesome/css/font-awesome.min.css';
import '../public/vendors/nprogress/nprogress.css';
import '../public/vendors/iCheck/skins/flat/green.css';
import '../public/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import '../public/vendors/jqvmap/dist/jqvmap.min.css';
import '../public/vendors/bootstrap-daterangepicker/daterangepicker.css';
import '../public/build/css/custom.min.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  return <Component {...pageProps} />
};

export default MyApp;
