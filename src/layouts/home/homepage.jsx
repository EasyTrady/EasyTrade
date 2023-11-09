import { Box } from '@mui/material';
import { Footer } from 'components/common/footer/footer';
import ResponsiveGrid from 'components/common/homeSection/cards';
import LandingSection from 'components/common/homeSection/landingSection';
import SubscribeSection from 'components/common/homeSection/subscribeSection';
import Navbar from 'components/common/navbar/navbar';
import Achievements from '../../components/common/homeSection/Achievements'
import CompanySection from '../../components/common/homeSection/companySection'
// import ContactUs from 'ContactUs/ContactUs.jsx';
import PageLayout from "examples/LayoutContainers/PageLayout"

import React from 'react';
import Price from 'layouts/Price/Price';
import ContactUs from 'layouts/ContactUs/ContactUs';

const HomeSections = () => {
  return (
    <PageLayout>
    <Box>
      <Navbar />
      <LandingSection />
      
      <Price/>
      <ContactUs/>
      <Achievements/>
      <CompanySection />
      <SubscribeSection />
      <ResponsiveGrid/>
      <Footer />
    </Box>
    </PageLayout>
  );
};

export default HomeSections;
