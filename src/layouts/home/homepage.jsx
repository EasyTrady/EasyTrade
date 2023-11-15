import { Box } from '@mui/material';
import { Footer } from 'components/common/footer/footer';
import ResponsiveGrid from 'components/common/homeSection/cards';
import LandingSection from 'components/common/homeSection/landingSection';
import SubscribeSection from 'components/common/homeSection/subscribeSection';
import Navbar from 'components/common/navbar/navbar';
import Achievements from '../../components/common/homeSection/Achievements'
import CompanySection from '../../components/common/homeSection/companySection'
import PageLayout from "examples/LayoutContainers/PageLayout"

import React from 'react';
import CarouselComponent from 'components/common/homeSection/Carousel';


const HomeSections = () => {
  return (
    <PageLayout>
    <Box>
      <Navbar />
      <LandingSection />
      <Achievements/>
      <CarouselComponent/>
      <SubscribeSection />
      <CompanySection />
      <ResponsiveGrid/>
      <Footer />
    </Box>
    </PageLayout>
  );
};

export default HomeSections;
