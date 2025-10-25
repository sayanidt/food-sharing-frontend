import React, { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Tag,
  Space,
  Menu,
  theme,
} from 'antd';
import {
  EnvironmentOutlined,
  TeamOutlined,
  RiseOutlined,
  RestOutlined,
  UploadOutlined,
  SearchOutlined,
  SmileOutlined,
  PlayCircleOutlined,
  ArrowRightOutlined,
  LeafOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Header, Content } = Layout;
const { useToken } = theme;

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <EnvironmentOutlined />,
      title: 'Hyperlocal Matching',
      description: 'AI-powered location-based food discovery within minutes',
    },
    {
      icon: <LeafOutlined />,
      title: 'Zero Waste Mission',
      description: 'Join the movement to eliminate food waste globally',
    },
    {
      icon: <TeamOutlined />,
      title: 'Community Power',
      description: 'Connect with 10,000+ neighbors building sustainability',
    },
    {
      icon: <RiseOutlined />,
      title: 'Smart Predictions',
      description: 'Real-time freshness scoring and demand forecasting',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Fixed Header */}
      <Header
        style={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
          padding: '0 50px',
          background: scrollY > 50 ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
          transition: 'all 0.3s',
          borderBottom: scrollY > 50 ? '1px solid #f0f0f0' : 'none',
        }}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Space align="center">
              <LeafOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />
              <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
                FoodShare
              </Title>
            </Space>
          </Col>
          <Col>
            <Space size={24}>
              <Menu
                mode="horizontal"
                style={{ background: 'transparent', border: 'none' }}
                items={[
                  { key: 'how', label: 'How It Works' },
                  { key: 'impact', label: 'Impact' },
                  { key: 'about', label: 'About Us' },
                ]}
              />
              <Button type="primary" size="large" onClick={() => navigate('/register')}>
                Join Now
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      {/* Hero Section */}
      <Content style={{ padding: '120px 50px 50px' }}>
        <Row justify="center" align="middle" gutter={[48, 48]} style={{ marginTop: 32 }}>
          <Col xs={24} md={12}>
            <div style={{ maxWidth: 600 }}>
              <Tag color="success" style={{ padding: '8px 16px', marginBottom: 24, fontSize: '14px' }}>
                🚀 Reducing Community Waste by 50%
              </Tag>
              
              <Title style={{ marginBottom: 24, fontSize: 48, lineHeight: 1.1 }}>
                Zero Food Waste.
                <br />
                Maximum Community Share.
              </Title>
              <Paragraph style={{ fontSize: 18, marginBottom: 32, color: token.colorTextSecondary }}>
                Our AI-powered platform seamlessly connects surplus food directly to those who need it,
                making sustainable sharing simple and impactful.
              </Paragraph>
              
              <Space size={16} style={{ marginBottom: 48 }}>
                <Button 
                  type="primary"
                  size="large"
                  icon={<PlayCircleOutlined />}
                  onClick={() => navigate('/register')}
                  style={{ height: 48, padding: '0 32px', fontSize: 16 }}
                >
                  Start Sharing Now
                </Button>
                <Button
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate('/demo')}
                  style={{ height: 48, padding: '0 32px', fontSize: 16 }}
                >
                  Watch a Quick Demo
                </Button>
              </Space>
            </div>
          </Col>
          
          <Col xs={24} md={12}>
            <Card
              style={{
                background: token.colorBgContainer,
                borderRadius: 16,
                boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <div style={{ 
                background: token.colorPrimary,
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <RestOutlined style={{ fontSize: 120, color: '#fff' }} />
              </div>
              <Card.Meta
                title={
                  <Text strong style={{ fontSize: 18 }}>
                    🌱 Join 10,000+ people reducing food waste
                  </Text>
                }
                style={{ padding: 24 }}
              />
            </Card>
          </Col>
        </Row>
              
              {/* Rotating Badge */}
              <Box
                sx={{
                  position: 'relative',
                  width: 150,
                  height: 150,
                  mt: 4,
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #76ff03 0%, #64dd17 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `${rotate} 20s linear infinite`,
                    boxShadow: '0 8px 32px rgba(118,255,3,0.4)',
                  }}
                >
                  <Box
                    sx={{
                      width: '85%',
                      height: '85%',
                      borderRadius: '50%',
                      bgcolor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: `${rotate} 20s linear infinite reverse`,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} color="primary">
                      Enjoy
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      the fastest way
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                animation: `${float} 6s ease-in-out infinite`,
              }}
            >
              {/* 3D Card Effect */}
              <Box
                sx={{
                  background: alpha('#fff', 0.9),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 6,
                  p: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  transform: 'perspective(1000px) rotateY(-10deg)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Animated Circles */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '80%',
                      height: '80%',
                      borderRadius: '50%',
                      border: '2px dashed rgba(255,255,255,0.3)',
                      animation: `${rotate} 30s linear infinite`,
                    }}
                  />
                  <Restaurant
                    sx={{
                      fontSize: 120,
                      color: 'white',
                      animation: `${pulse} 3s ease-in-out infinite`,
                    }}
                  />
                </Box>
                <Box mt={3}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    🌱 FoodShare
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Join 10,000+ people reducing food waste
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Scroll Indicator */}
        <Box
          textAlign="center"
          mt={8}
          sx={{
            animation: `${float} 2s ease-in-out infinite`,
          }}
        >
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scroll Down
          </Typography>
          <IconButton sx={{ animation: `${float} 2s ease-in-out infinite` }}>
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      </Container>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 12, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '50K+', label: 'Meals Shared' },
            { value: '2.5M kg', label: 'CO₂ Saved' },
            { value: '98%', label: 'Success Rate' },
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Box
                textAlign="center"
                sx={{
                  animation: `${slideUp} 1s ease-out ${index * 0.1}s both`,
                }}
              >
                <Typography
                  variant="h2"
                  fontWeight={800}
                  sx={{
                    background: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={600}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            fontWeight={800}
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              background: 'linear-gradient(135deg, #1b5e20 0%, #66bb6a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose FoodShare?
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
            AI-powered features that make food sharing simple, safe, and
            sustainable
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  background: alpha('#fff', 0.9),
                  backdropFilter: 'blur(20px)',
                  borderRadius: 4,
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  animation: `${slideUp} 1s ease-out ${index * 0.1}s both`,
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      background: feature.gradient,
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    }}
                  >
                    {React.cloneElement(feature.icon, { sx: { fontSize: 35 } })}
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)',
          py: 12,
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" fontWeight={800} color="white" gutterBottom>
            Ready to Make a Difference?
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.9)" paragraph sx={{ mb: 4 }}>
            Join thousands reducing food waste in their communities
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 3,
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #76ff03 0%, #64dd17 100%)',
              color: '#1b5e20',
              boxShadow: '0 8px 32px rgba(118,255,3,0.4)',
              '&:hover': {
                boxShadow: '0 12px 48px rgba(118,255,3,0.6)',
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s',
            }}
          >
            Get Started Now
          </Button>
        </Container>

        {/* Animated Background Circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(118,255,3,0.2) 0%, transparent 70%)',
            animation: `${float} 8s ease-in-out infinite`,
          }}
        />
      </Box>
    </Box>
  );
};

export default LandingPage;
