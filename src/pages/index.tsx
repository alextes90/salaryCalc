import { StaticImage } from "gatsby-plugin-image";
import styled, { keyframes } from "styled-components";
import React, { FormEvent, useState } from "react";
import "../index.css";
import { net, Res } from "../utils";
// styles
const pageStyles = {
  color: "#232129",
  padding: 40,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
};
const headingAccentStyles = {
  color: "#663399",
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const FormWrapper = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  margin-bottom: 40px;
  font-size: 1.5rem;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  font-size: 1.5rem;
`;

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  margin-left: 10px;
  height: 25px;
`;
const ResAmounts = styled.span`
  font-size: 2rem;
  color: #663399;
`;

const ResLabels = styled.b``;

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

const Button = styled.button`
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

// markup
const IndexPage = () => {
  const [gross, setGross] = useState(10000);
  const [tax, setTax] = useState(17);
  const [calcRes, setCalcRes] = useState<Res | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      typeof gross !== "number" ||
      typeof tax !== "number" ||
      gross < 0 ||
      tax < 0
    )
      return alert("Gross and Tax should be a positive numbers!");
    setCalcRes(net(gross, tax));
  };
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Salary calculator for employees.
        <br />
        <span style={headingAccentStyles}>thx Evgeny for that</span>
        🎉🎉🎉
      </h1>
      <Container>
        <FormWrapper>
          <Form onSubmit={onSubmit}>
            <Label>
              Salary gross:
              <InputField
                type="number"
                name="gross"
                value={gross}
                onChange={(e) => setGross(+e.target.value)}
              />
            </Label>
            <Label>
              Tax rate (17 or 32):
              <InputField
                type="text"
                name="name"
                value={tax}
                onChange={(e) => setTax(+e.target.value)}
              />
            </Label>
            <Button type="submit">Submit</Button>
          </Form>
          {calcRes ? (
            <Results>
              <span>
                <ResLabels>Entered tax_rate: </ResLabels>
                <ResAmounts>{calcRes.tax_rate}</ResAmounts>
              </span>
              <span>
                <ResLabels>Entered gross: </ResLabels>
                <ResAmounts>{calcRes.gross}</ResAmounts>
              </span>
              <br />
              <span>
                <ResLabels>ZUS: </ResLabels>
                <ResAmounts>{calcRes.zus}</ResAmounts>
              </span>
              <span>
                <ResLabels>Health insurance: </ResLabels>
                <ResAmounts>{calcRes.healthInsurance}</ResAmounts>
              </span>
              <span>
                <ResLabels>Tax: </ResLabels>
                <ResAmounts>{calcRes.tax}</ResAmounts>
              </span>
              <br />
              <strong>
                Netto: <ResAmounts>{calcRes.net}</ResAmounts>
              </strong>
            </Results>
          ) : (
            <>
              <h2>Press Submit to see results</h2>
              <StaticImage
                src={`../images/icon.png`}
                objectFit="contain"
                objectPosition="left"
                alt="card icon"
                width={300}
                placeholder="tracedSVG"
                quality={100}
              />
            </>
          )}
        </FormWrapper>
        <StaticImage
          src={`../images/solution.png`}
          objectFit="contain"
          objectPosition="left"
          alt="card icon"
          placeholder="tracedSVG"
          quality={100}
        />
      </Container>
    </main>
  );
};

export default IndexPage;
