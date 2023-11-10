/* eslint-disable react/prop-types */
import { Parser } from "html-to-react";

import { Box, Divider, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonSubScribtion, TitleText } from '../../../styles/style';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Subscribtion } from 'store/pages/subscribition';
import { Skeleton } from '@mui/material';

const SubscribeCard = ({ type }) => {

  const [isHovering, setIsHovering] = useState(-1);
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();
  const { subscribtion } = useSelector((state) => state.subscribtion);
  useEffect(() => {
    dispatch(Subscribtion(type));
  }, []);

  const handleMouseOver = (i) => {
    setIsHovering(i);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  const Card = [

    {
      id: 1,
      title: 'Basic',
      decription: 'Perfect for Growing Businesses on a Budget',
      offer: 'Start 14 days free trail',
      price: '$200',
      landing: {
        icon: <CheckCircleIcon />,
        address: 'Landing Page'
      },
      responsive: {
        icon: <CheckCircleIcon />,
        address: 'Responsive designs'
      },
      domain: {
        icon: <CheckCircleIcon />,
        address: 'Custom domain name'
      },
      support: {
        icon: <CheckCircleIcon />,
        address: '24 hours Support'
      },
      button: 'Choose Plan',
      link: 'See details'
    },
    {
      id: 2,
      title: 'Pro',
      decription: 'Advanced Features for High-Performing Businesses',
      offer: 'Start 14 days free trail',
      price: '$500',
      landing: {
        icon: <CheckCircleIcon />,
        address: ' Pro landing Page'
      },
      responsive: {
        icon: <CheckCircleIcon />,
        address: 'Product banners'
      },
      domain: {
        icon: <CheckCircleIcon />,
        address: 'Chats'
      },
      support: {
        icon: <CheckCircleIcon />,
        address: 'Sales management'
      },
      button: 'Choose Plan',
      link: 'See details'
    },
    {
      id: 3,
      title: 'Enterprise',
      decription: 'Collaboration Tools for Large Organizations',
      offer: 'Start 14 days free trail',
      price: '$800',
      landing: {
        icon: <CheckCircleIcon />,
        address: 'Pro landing page'
      },
      responsive: {
        icon: <CheckCircleIcon />,
        address: 'Coupons links'
      },
      domain: {
        icon: <CheckCircleIcon />,
        address: 'Affiliate system'
      },
      support: {
        icon: <CheckCircleIcon />,
        address: 'Payment Gateways'
      },
      button: 'Choose Plan',
      link: 'See details'
    },
    {
      id: 4,
      title: 'Vip',
      decription: 'Ideal for Small Businesses and Solo Entrepreneurs',
      price: '$1000',
      landing: {
        icon: <CheckCircleIcon />,
        address: 'Pro landing page'
      },
      responsive: {
        icon: <CheckCircleIcon />,
        address: 'POS'
      },
      domain: {
        icon: <CheckCircleIcon />,
        address: 'Return management'
      },
      support: {
        icon: <CheckCircleIcon />,
        address: 'Subscription'
      },
      button: 'Choose Plan',
      link: 'See details'
    }

  ];

  console.log(Card);
  // ....................................skeleton......................................
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(subscribtion);
    // console.log('run');
    if (subscribtion.length >= 1) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [subscribtion]);

  const boxStyle = {
    width: '100%',
    height: '100%',
    mx: 'auto',
    overFlowx: 'auto',
    // overFlowy: 'hidden',
    display: 'flex',
     textAlign:'center',
    flexDirection: 'row',
    justifyContent: 'center'
  };
  const cardStyle = {
    height:{xl:'18%',lg:'20%', md:'25%',sm:'100%', xs:'100%'},
    marginTop: '50px',
    position: 'relative',
    width:{xl:'18%',lg:'20%', md:'25%',sm:'100%', xs:'100%'},
    margin: '0 5px 10px',
    padding: '10px',
    boxShadow:
      '0px 0.796192px 2.38858px -0.875px rgba(0, 0, 0, 0.067), 0px 2.41451px 7.24352px -1.75px rgba(0, 0, 0, 0.067), 0px 6.38265px 19.148px -2.625px rgba(0, 0, 0, 0.06), 0px 20px 60px -3.5px rgba(0, 0, 0, 0.03)',
    backgroundColor: '#FFFFFF01',
    borderRadius: '20px',
    px: '24px',
    ':hover': {
      height: '480px',
      border: ' 2px solid #5D449B',
      transition: '1s fade-in',
      '.MuiButton-root': {
        backgroundColor: '#5D449B',
        color: '#ffffff'
      },
      '.MuiSvgIcon-root': {
        color: 'black'
      }
    }
  };
  // const decriptionStyle = { fontSize: '13px', fontWeight: 500, color: '#666666', lineHeight: '19.5px' };
  const PriceStyle = { fontSize: '54px', fontWeight: 700, fontFamilly: 'Inter', letterSpacing: '-3px', lineHeight: '54px', mt: '22px' };
  const offerStyle = { fontSize: '16px', fontWeight: 500, color: '#5D449B', lineHeight: '29.98px', mb: '11px' };

  const linkStyle = {
    color: '#5D449B',
    fontSize: '14px',
    lineHeight: '26.24px',
    fontWeight: 500,
    letterSpacing: '-0.5px',
    justifyContent: 'center',
    display: 'flex',
    my: '5px 20px'

  };
  return (

    <Box sx={boxStyle} >
      {isLoading ? [1, 2, 3, 4].map((item, indx) => (
        <Skeleton key={item + indx} variant='rectangle' width={400} height={400} sx={{ borderRadius: '10px', marginTop: '70px' }} />)) : subscribtion?.map((card, i) => {
          return (

            <Box key={`${card.id} ${i}`} sx={cardStyle} onMouseOver={() => handleMouseOver(i)} onMouseOut={handleMouseOut}>
              <TitleText sx={{ textAlign: 'right' }}>{card.name}</TitleText>
              {card.hasOwnProperty.call('offer') && isHovering === i && <Typography sx={offerStyle}>{card.offer}</Typography>}
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'end', 
                justifyContent: 'end'
              }}>
                <Typography>شهريا/</Typography>
                <Typography variant="h2" margin='0' sx={PriceStyle}>${card.price}</Typography>
              </Box>
              <Divider width="90%" sx={{ mx: 'auto', my: '18px' }} />
              <ButtonSubScribtion
                onClick={() => {
                  console.log(card.id)
                  navigate('/authentication/sign-up', { state: { subscribtionId: card.id } });
                }}
              >
                {t('chooseplan.title')}
              </ButtonSubScribtion>
              {isHovering === i && (
                <Link to={'#'} style={linkStyle}>
                  {t('seedetails.title')}
                </Link>
              )}
              <Typography sx={{ textAlign: 'end' }} variant="h4">{Parser().parse(card.description)}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default SubscribeCard;