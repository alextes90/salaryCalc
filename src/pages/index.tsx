import { StaticImage } from "gatsby-plugin-image";
import * as S from "../styled";
import React, {
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "../index.css";
import { net, parseInputValue, recursion, Res } from "../utils";
import { SEO } from "../components/SEO";
import { EXCHANGE_RATE_API } from "../appConstants";

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
  const usdNettoRef = useRef<HTMLSpanElement>(null);
  const zusRef = useRef<HTMLSpanElement>(null);
  const healthRef = useRef<HTMLSpanElement>(null);
  const taxRef = useRef<HTMLSpanElement>(null);
  const nettoRef = useRef<HTMLSpanElement>(null);
  const benefitRef = useRef<HTMLSpanElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (+gross < 0 || +tax < 0)
      return alert("Gross and Tax should be a positive numbers!");
    const myBenefit = 100 - +multisport > 0 ? 100 - +multisport : 0;
    const multisportToMinus = +multisport < 100 ? 0 : +multisport - 100;
    setCalcRes({ ...net(+gross, +tax), myBenefit, multisportToMinus });
  };
  // https://cors-anywhere.herokuapp.com/
  useEffect(() => {
    const fetchCourse = async () => {
      const formData = new FormData();
      formData.append("c_type", "sell");
      formData.append("c_amount", "1");
      formData.append("c_currency", "USD");
      try {
        const rawResponse = await fetch(EXCHANGE_RATE_API, {
          method: "POST",
          body: formData,
        });
        const content = await rawResponse.json();
        setUsd(content.value);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCourse();
  }, []);

  useEffect(() => {
    if (calcRes) {
      const usdNetto = (calcRes.net - calcRes.multisportToMinus) / usd;
      const normalisedUsdNetto = isFinite(usdNetto) ? usdNetto.toFixed(2) : "0";

      const ZUS = calcRes.zus.toFixed(2);
      const benefit = calcRes.myBenefit.toFixed(2);
      const netto = (calcRes.net - calcRes.multisportToMinus).toFixed(2);
      const tax = calcRes.tax.toFixed(2);
      const health = calcRes.healthInsurance.toFixed(2);
      recursion(usdNettoRef, +normalisedUsdNetto);
      recursion(zusRef, +ZUS);
      recursion(benefitRef, +benefit);
      recursion(nettoRef, +netto);
      recursion(taxRef, +tax);
      recursion(healthRef, +health);
    }
  }, [calcRes, usd]);

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
                <S.ResAmounts>
                  <span ref={zusRef}>0</span>zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer>
                <S.ResLabels>Health insurance: </S.ResLabels>
                <S.ResAmounts>
                  <span ref={healthRef}></span>zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer>
                <S.ResLabels>Tax: </S.ResLabels>
                <S.ResAmounts>
                  <span ref={taxRef}>0</span>zl
                </S.ResAmounts>
              </S.ResContainer>
              <br />
              <S.ResContainer as="strong">
                MyBenefit:{" "}
                <S.ResAmounts>
                  <span ref={benefitRef}>0</span>zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer as="strong">
                Netto zl:{" "}
                <S.ResAmounts>
                  <span ref={nettoRef}>0</span>zl
                </S.ResAmounts>
              </S.ResContainer>
              <S.ResContainer as="strong">
                Netto USD:
                <S.ResAmounts>
                  <span ref={usdNettoRef}>0</span>
                  <span style={{ fontSize: "32px" }}>&#128176;</span>
                </S.ResAmounts>
              </S.ResContainer>
              <br />
              <S.ResContainer as="strong">
                TIP:{" "}
                <S.ResAmounts>
                  <span>1USD = {usd ? usd : "🤷"}zl</span>
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
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            press
            <StaticImage
              src={`../images/btn.png`}
              alt="btn"
              style={{ margin: "5px" }}
              width={170}
              placeholder="tracedSVG"
              quality={100}
            />
            if no exchange rate
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
