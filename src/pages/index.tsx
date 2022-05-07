import { StaticImage } from "gatsby-plugin-image";
import * as S from "../styled";
import React, { FormEvent, useEffect, useState } from "react";
import "../index.css";
import { net, parseInputValue, Res } from "../utils";
import { SEO } from "../components/SEO";

interface ResState extends Res {
  myBenefit: number;
  multisportToMinus: number;
}

const IndexPage = () => {
  const [gross, setGross] = useState("10000");
  const [tax, setTax] = useState("17");
  const [multisport, setMultisport] = useState("118");
  const [usd, setUsd] = useState(0);
  const [calcRes, setCalcRes] = useState<ResState | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      typeof gross !== "number" ||
      typeof tax !== "number" ||
      gross < 0 ||
      tax < 0
    )
      return alert("Gross and Tax should be a positive numbers!");
    const myBenefit = 100 - +multisport > 0 ? 100 - +multisport : 0;
    const multisportToMinus = +multisport < 100 ? 0 : +multisport - 100;
    setCalcRes({ ...net(gross, tax), myBenefit, multisportToMinus });
  };
  // https://cors-anywhere.herokuapp.com/
  useEffect(() => {
    const fetchCourse = async () => {
      const formData = new FormData();
      formData.append("c_type", "sell");
      formData.append("c_amount", "1");
      formData.append("c_currency", "USD");
      try {
        const rawResponse = await fetch(
          "https://cors-anywhere.herokuapp.com/https://www.centkantor.pl/scripts/calc.php?type=calc",
          {
            method: "POST",
            body: formData,
          }
        );
        const content = await rawResponse.json();
        setUsd(content.value);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCourse();
  }, []);

  return (
    <S.PageStyles>
      <SEO title="SalaryCalc" />
      <title>Home Page</title>
      <S.HeadingStyles>Salary calculator for employees 🎉🎉🎉</S.HeadingStyles>
      <S.Container>
        <S.FormWrapper>
          <S.Form onSubmit={onSubmit}>
            <S.Label>
              Salary gross:
              <S.InputField
                type="text"
                name="gross"
                required
                value={gross}
                onChange={(e) =>
                  setGross(parseInputValue(e.target.value, gross))
                }
              />
            </S.Label>
            <S.Label>
              Tax rate (17 or 32):
              <S.InputField
                type="text"
                name="tax"
                required
                value={tax}
                onChange={(e) => setTax(parseInputValue(e.target.value, tax))}
              />
            </S.Label>
            <S.Label>
              Multisport price:
              <S.InputField
                type="text"
                name="sport"
                value={multisport}
                onChange={(e) =>
                  setMultisport(parseInputValue(e.target.value, multisport))
                }
              />
            </S.Label>
            <S.Button type="submit">Submit</S.Button>
          </S.Form>
          {calcRes ? (
            <S.Results>
              <S.ResContainer>
                <S.ResLabels>ZUS: </S.ResLabels>
                <S.ResAmounts>{calcRes.zus}zl</S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer>
                <S.ResLabels>Health insurance: </S.ResLabels>
                <S.ResAmounts>
                  {calcRes.healthInsurance.toFixed(2)}zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer>
                <S.ResLabels>Tax: </S.ResLabels>
                <S.ResAmounts>{calcRes.tax.toFixed(2)}</S.ResAmounts>
              </S.ResContainer>
              <br />
              <S.ResContainer as="strong">
                MyBenefit:{" "}
                <S.ResAmounts>{calcRes.myBenefit.toFixed(2)}zl</S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer as="strong">
                Netto zl:{" "}
                <S.ResAmounts>
                  {(calcRes.net - calcRes.multisportToMinus).toFixed(2)}zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer as="strong">
                Netto USD:{" "}
                <S.ResAmounts>
                  {((calcRes.net - calcRes.multisportToMinus) / usd).toFixed(2)}
                  $
                </S.ResAmounts>
              </S.ResContainer>
              <br />
              <S.ResContainer as="strong">
                TIP:{" "}
                <S.ResAmounts>
                  <span>1USD = {usd}zl</span>
                </S.ResAmounts>
              </S.ResContainer>
            </S.Results>
          ) : (
            <div style={{ position: "relative" }}>
              <h2>Press Submit to see results</h2>
              <S.USDzl>{usd ? `1$ = ${usd}zl` : "Loading..."}</S.USDzl>
              <StaticImage
                src={`../images/icon.png`}
                objectFit="contain"
                objectPosition="left"
                alt="card icon"
                width={300}
                placeholder="tracedSVG"
                quality={100}
              />
            </div>
          )}
          <a
            href="https://cors-anywhere.herokuapp.com/corsdemo"
            target="_blank"
            rel="noopener"
          >
            if no exchange rate - press link and press button there
          </a>
        </S.FormWrapper>
        <StaticImage
          src={`../images/solution.png`}
          objectFit="contain"
          objectPosition="left"
          alt="card icon"
          placeholder="tracedSVG"
          quality={100}
        />
      </S.Container>
    </S.PageStyles>
  );
};

export default IndexPage;
