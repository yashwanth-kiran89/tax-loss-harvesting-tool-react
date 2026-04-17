import React, { useMemo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";
import CapitalGainsCard from "./components/CapitalGainsCard";
import HoldingsTable from "./components/HoldingsTable";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #111827;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #111827;
  padding: 1rem;
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const Inner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  h1 {
    font-size: 1.875rem;
    font-weight: bold;
    color: white;
    margin: 0;
  }
  p {
    color: #9ca3af;
    margin-top: 0.25rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AppContent = () => {
  const { holdings, capitalGains, selectedAssets, isLoading, error } = usePortfolio();

  const postHarvesting = useMemo(() => {
    let stcgProfit = capitalGains.stcg.profits;
    let stcgLoss = capitalGains.stcg.losses;
    let ltcgProfit = capitalGains.ltcg.profits;
    let ltcgLoss = capitalGains.ltcg.losses;

    selectedAssets.forEach((symbol) => {
      const asset = holdings.find((h) => h.symbol === symbol);
      if (!asset) return;
      if (asset.shortTermGain > 0) stcgProfit += asset.shortTermGain;
      else if (asset.shortTermGain < 0) stcgLoss += Math.abs(asset.shortTermGain);
      if (asset.longTermGain > 0) ltcgProfit += asset.longTermGain;
      else if (asset.longTermGain < 0) ltcgLoss += Math.abs(asset.longTermGain);
    });

    return { stcg: { profits: stcgProfit, losses: stcgLoss }, ltcg: { profits: ltcgProfit, losses: ltcgLoss } };
  }, [holdings, capitalGains, selectedAssets]);

  const preRealised = (capitalGains.stcg.profits - capitalGains.stcg.losses) + 
                      (capitalGains.ltcg.profits - capitalGains.ltcg.losses);
  const postRealised = (postHarvesting.stcg.profits - postHarvesting.stcg.losses) + 
                       (postHarvesting.ltcg.profits - postHarvesting.ltcg.losses);
  const savings = preRealised > postRealised ? preRealised - postRealised : 0;

  if (isLoading) {
    return (
      <Container>
        <Inner><div style={{ textAlign: "center", color: "white", padding: "3rem" }}>Loading portfolio data...</div></Inner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Inner><div style={{ textAlign: "center", color: "#ef4444", padding: "3rem" }}>{error}</div></Inner>
      </Container>
    );
  }

  return (
    <Container>
      <Inner>
        <Header>
          <h1>Tax Optimization</h1>
          <p>Select assets to optimize your capital gains</p>
        </Header>
        <CardsGrid>
          <CapitalGainsCard
            title="Pre Harvesting"
            isBlue={false}
            stcgProfit={capitalGains.stcg.profits}
            stcgLoss={capitalGains.stcg.losses}
            ltcgProfit={capitalGains.ltcg.profits}
            ltcgLoss={capitalGains.ltcg.losses}
          />
          <CapitalGainsCard
            title="After Harvesting"
            isBlue={true}
            stcgProfit={postHarvesting.stcg.profits}
            stcgLoss={postHarvesting.stcg.losses}
            ltcgProfit={postHarvesting.ltcg.profits}
            ltcgLoss={postHarvesting.ltcg.losses}
            savings={savings}
          />
        </CardsGrid>
        <HoldingsTable />
      </Inner>
    </Container>
  );
};

function App() {
  return (
    <>
      <GlobalStyle />
      <PortfolioProvider>
        <AppContent />
      </PortfolioProvider>
    </>
  );
}

export default App;