import React from 'react';
import {
  Layout,
  Typography,
  Button,
  Row,
  Col,
  Card,
  Space,
  Tag,
  theme,
  Menu,
} from 'antd';
import { colors } from '../theme/colors';
import {
  UploadOutlined,
  SearchOutlined,
  SmileOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  // Configure steps for How It Works section
  const steps = [
    {
      icon: <UploadOutlined />,
      title: 'Post Surplus Food',
      description: 'Easily share your excess food with a few taps'
    },
    {
      icon: <SearchOutlined />,
      title: 'Get Matched by AI',
      description: 'Our smart system finds the perfect match for your food'
    },
    {
      icon: <SmileOutlined />,
      title: 'Share & Connect',
      description: 'Meet your neighbor and make a difference together'
    }
  ];

  return (
    <Layout>
      {/* Header */}
      <Header style={{ 
        background: colors.background,
        position: 'fixed',
        width: '100%',
        zIndex: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '0 50px'
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Space>
              <HeartOutlined style={{ fontSize: '24px', color: colors.primary }} />
              <Title level={3} style={{ margin: 0, color: colors.primary }}>
                FoodShare
              </Title>
            </Space>
          </Col>
          <Col>
            <Space>
              <Menu mode="horizontal" style={{ border: 'none' }}>
                <Menu.Item key="how">How It Works</Menu.Item>
                <Menu.Item key="impact">Impact</Menu.Item>
                <Menu.Item key="about">About Us</Menu.Item>
              </Menu>
              <Button type="primary" size="large" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>

      {/* Main Content */}
      <Content style={{ marginTop: 64 }}>
        {/* Hero Section */}
        <Row 
          justify="center" 
          align="middle" 
          style={{ 
            minHeight: 'calc(100vh - 64px)',
            padding: '64px 50px',
            background: colors.background
          }}
        >
          <Col xs={24} lg={12} style={{ padding: '0 24px' }}>
            <Space direction="vertical" size="large">
              <Tag color="success" style={{ padding: '4px 12px' }}>
                Reducing Community Waste by 50%
              </Tag>
              
              <Title style={{ margin: 0 }}>
                Zero Food Waste.
                <br />
                Maximum Community Share.
              </Title>
              
              <Paragraph style={{ fontSize: 18, color: colors.textSecondary }}>
                Our AI-powered platform seamlessly connects surplus food directly to those who need it,
                making sustainable sharing simple and impactful.
              </Paragraph>
              
              <Space size="large">
                <Button 
                  type="primary" 
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate('/register')}
                  style={{ backgroundColor: colors.primary }}
                >
                  Start Sharing Now
                </Button>
                <Button 
                  size="large"
                  icon={<PlayCircleOutlined />}
                  style={{ borderColor: colors.secondary, color: colors.secondary }}
                >
                  Watch a Quick Demo
                </Button>
              </Space>
            </Space>
          </Col>
          
          <Col xs={24} lg={12} style={{ padding: '0 24px' }}>
            <img 
              src="/hero-illustration.jpg" 
              alt="Food Sharing Illustration"
              style={{ 
                width: '100%',
                maxWidth: 600,
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Col>
        </Row>

        {/* How It Works Section */}
        <Row 
          justify="center" 
          style={{ 
            padding: '64px 50px',
            background: colors.background 
          }}
        >
          <Col span={24} style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2}>How FoodShare Works</Title>
          </Col>
          
          {steps.map((step, index) => (
            <Col key={index} xs={24} md={8} style={{ padding: '0 16px' }}>
              <Card style={{ height: '100%' }}>
                <Space direction="vertical" align="center" style={{ width: '100%' }}>
                  <div style={{
                    fontSize: 48,
                    color: token.colorPrimary,
                    marginBottom: 16
                  }}>
                    {step.icon}
                  </div>
                  <Title level={4}>{step.title}</Title>
                  <Paragraph style={{ textAlign: 'center' }}>
                    {step.description}
                  </Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <Row 
          justify="center" 
          align="middle" 
          style={{ 
            padding: '64px 50px',
            background: token.colorPrimary,
            textAlign: 'center'
          }}
        >
          <Col span={24} style={{ maxWidth: 800 }}>
            <Space direction="vertical" size="large">
              <Title level={2} style={{ color: '#fff', margin: 0 }}>
                Ready to Make a Difference?
              </Title>
              <Paragraph style={{ fontSize: 18, color: 'rgba(255,255,255,0.9)' }}>
                Join thousands reducing food waste in their communities
              </Paragraph>
              <Button 
                type="primary"
                size="large"
                style={{
                  height: 'auto',
                  padding: '12px 40px',
                  fontSize: 18,
                  backgroundColor: '#fff',
                  color: token.colorPrimary
                }}
                onClick={() => navigate('/register')}
              >
                Get Started Now
              </Button>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>

  );
};

export default LandingPage;
