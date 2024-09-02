import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the bouncy animation
const bouncyAnimation = keyframes`
  0% { top: 0em; }
  40% { top: 0em; }
  43% { top: -0.9em; }
  46% { top: 0em; }
  48% { top: -0.4em; }
  50% { top: 0em; }
  100% { top: 0em; }
`;

// Keyframes for continuous 3D rotation animation
const rotateAnimation = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-image: url('assets/Overview3.png'); /* Updated with the correct image path */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background: rgba(15, 15, 15, 0.9);
  color: white;
  border: 2px solid #00c785;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(14, 167, 233, 0.3);
  backdrop-filter: blur(10px);
`;

const ImageSection = styled.div`
  flex: 1.5;
   /* Updated to use the specified image */
   
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #aaa;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(26, 26, 26, 0.8);
  color: white;

  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #00c785; /* Updated color to green */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  animation: ${bouncyAnimation} 5s infinite linear;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpLink = styled.p`
  margin-top: 20px;
  text-align: left;
  color: #aaa;

  a {
    color: #00c785; /* Updated color to green */
    text-decoration: none;
  }
`;

const RotatingTextSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Text3DWrapper = styled.div`
  perspective: 1000px;
`;

const Text3D = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: #00c785;
  animation: ${rotateAnimation} 10s infinite linear;
  transform-style: preserve-3d;
`;

const Text3DFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FrontFace = styled(Text3DFace)`
  transform: rotateY(0deg);
`;

const BackFace = styled(Text3DFace)`
  transform: rotateY(180deg);
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Handle login logic here
  };

  return (
    <PageWrapper>
      <PageContainer>
        <ImageSection> 
          <RotatingTextSection>
            <Text3DWrapper>
              <Text3D>
                <FrontFace>MentoreTalk</FrontFace>
                <BackFace>Connect to Mentors</BackFace>
              </Text3D>
            </Text3DWrapper>
          </RotatingTextSection>
        </ImageSection>
        <FormSection>
          <Title>Log in</Title>
          <Subtitle>Welcome back! Log in to access your account.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Log In</Button>
          </Form>
          <SignUpLink>
            New to our platform? <a href="/signup">Sign up</a>
          </SignUpLink>
        </FormSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default LoginPage;
