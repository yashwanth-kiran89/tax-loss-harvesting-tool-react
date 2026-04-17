import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchHoldings, fetchCapitalGains } from "../services/api";

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [holdings, setHoldings] = useState([]);
  const [capitalGains, setCapitalGains] = useState({
    stcg: { profits: 0, losses: 0 },
    ltcg: { profits: 0, losses: 0 },
  });
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [holdingsData, gainsData] = await Promise.all([
          fetchHoldings(),
          fetchCapitalGains(),
        ]);
        setHoldings(holdingsData);
        setCapitalGains(gainsData);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleAsset = (symbol) => {
    setSelectedAssets((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const toggleAll = (selectAll) => {
    setSelectedAssets(selectAll ? holdings.map((h) => h.symbol) : []);
  };

  return (
    <PortfolioContext.Provider
      value={{
        holdings,
        capitalGains,
        selectedAssets,
        toggleAsset,
        toggleAll,
        isLoading,
        error,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};