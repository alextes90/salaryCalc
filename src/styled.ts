import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

export const FormWrapper = styled.div``;

export const PageStyles = styled.main`
  color: #232129;
  padding: 20px 40px;
  font-family: "-apple-system, Roboto, sans-serif, serif";
`;

export const HeadingStyles = styled.h1`
  margin-bottom: 64px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-bottom: 40px;
  font-size: 1.5rem;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  font-size: 1.5rem;
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ResContainer = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: baseline;
`;

export const InputField = styled.input`
  margin-left: 10px;
  height: 25px;
`;
export const ResAmounts = styled.span`
  font-size: 2rem;
  color: #663399;
`;

export const ResLabels = styled.b``;

export const USDzl = styled.b`
  position: absolute;
  top: 136px;
  left: 8px;
  text-decoration: #509ec0 wavy underline;
  transform: rotate(-30deg);
  z-index: 1;
  font-size: 1.5rem;
`;

const glowingbutton = keyframes`
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
`;

export const Button = styled.button`
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:before {
    content: "";
    background: linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    -webkit-filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: ${glowingbutton} 20s linear infinite;
    transition: opacity 0.3s ease-in-out;
    border-radius: 10px;
  }
  &:after {
    z-index: -1;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #222;
    left: 0;
    top: 0;
    border-radius: 10px;
  }
`;
