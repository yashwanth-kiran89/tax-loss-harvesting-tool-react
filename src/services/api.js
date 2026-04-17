export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          symbol: "ETH",
          name: "Ethereum",
          totalHoldings: 20028.05,
          avgBuyPrice: 3367.78,
          currentPrice: 2531.06,
          shortTermGain: -16760000,
          longTermGain: 0,
        },
        {
          symbol: "SOL",
          name: "Solana",
          totalHoldings: 20277.78,
          avgBuyPrice: 192.15,
          currentPrice: 174.37,
          shortTermGain: -360410,
          longTermGain: 0,
        },
        {
          symbol: "BNB",
          name: "BNB",
          totalHoldings: 7020.16,
          avgBuyPrice: 708.72,
          currentPrice: 665.55,
          shortTermGain: -303050,
          longTermGain: 0,
        },
        {
          symbol: "AAVE",
          name: "Aave",
          totalHoldings: 2615.93,
          avgBuyPrice: 321.51,
          currentPrice: 224.33,
          shortTermGain: -254220,
          longTermGain: 0,
        },
        {
          symbol: "WBTC",
          name: "Wrapped Bitcoin",
          totalHoldings: 2218.81,
          avgBuyPrice: 92980.19,
          currentPrice: 104390,
          shortTermGain: 25310000,
          longTermGain: 0,
        },
        {
          symbol: "BTC",
          name: "Bitcoin",
          totalHoldings: 1184.12,
          avgBuyPrice: 93072.64,
          currentPrice: 104250,
          shortTermGain: 13240000,
          longTermGain: 0,
        },
        {
          symbol: "MATIC",
          name: "Polygon",
          totalHoldings: 26038.45,
          avgBuyPrice: 0.13,
          currentPrice: 0.26,
          shortTermGain: 3348.92,
          longTermGain: 0,
        },
      ]);
    }, 500);
  });
};

export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stcg: { profits: 4049.48, losses: 32127.03 },
        ltcg: { profits: 0, losses: 0 },
      });
    }, 500);
  });
};