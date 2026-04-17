import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { usePortfolio } from "../context/PortfolioContext";
import { formatNumber, formatNumberPlain } from "../utils/formatters";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { 
  SiEthereum, SiSolana, SiBinance, SiBitcoin, SiPolygon 
} from "react-icons/si";

const getIcon = (symbol) => {
  switch (symbol) {
    case "ETH": return <SiEthereum size={24} color="#627eea" />;
    case "SOL": return <SiSolana size={24} color="#00ffbd" />;
    case "BNB": return <SiBinance size={24} color="#f3ba2f" />;
    case "AAVE": return <SiBitcoin size={24} color="#b6509e" />;
    case "WBTC": return <SiBitcoin size={24} color="#f7931a" />;
    case "BTC": return <SiBitcoin size={24} color="#f7931a" />;
    case "MATIC": return <SiPolygon size={24} color="#8247e5" />;
    default: return <SiBitcoin size={24} />;
  }
};

const TableWrapper = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  font-family: 'Roboto', sans-serif;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Th = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  background-color: #f9fafb;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #111827;
  border-top: 1px solid #e5e7eb;
  vertical-align: top;
`;

const TwoLineCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  .line1 { font-weight: ${props => props.boldFirst ? "500" : "normal"}; }
  .line2 { font-size: 0.7rem; color: #6b7280; }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
`;

const ViewAllButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem;
  width: 100%;
  text-align: center;
  color: #2563eb;
  background: transparent;
  border: none;
  border-top: 1px solid #e5e7eb;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  &:hover {
    color: #1e40af;
    background-color: #eff6ff;
  }
`;

const SortIcon = ({ column, sortField, sortDirection }) => {
  if (column !== sortField) return <FaSort size={12} style={{ marginLeft: "4px", opacity: 0.5 }} />;
  if (sortDirection === "asc") return <FaSortUp size={12} style={{ marginLeft: "4px" }} />;
  return <FaSortDown size={12} style={{ marginLeft: "4px" }} />;
};

const HoldingsTable = () => {
  const { holdings, selectedAssets, toggleAsset, toggleAll } = usePortfolio();
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [viewAll, setViewAll] = useState(false);

  const sortedFullHoldings = useMemo(() => {
    if (!sortField) return holdings;
    const sorted = [...holdings];
    sorted.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [holdings, sortField, sortDirection]);

  const displayedHoldings = viewAll ? sortedFullHoldings : sortedFullHoldings.slice(0, 4);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const allSelected = holdings.length > 0 && selectedAssets.length === holdings.length;

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <Th style={{ width: "40px" }}>
              <Checkbox
                checked={allSelected}
                onChange={(e) => toggleAll(e.target.checked)}
              />
            </Th>
            <Th onClick={() => handleSort("name")}>
              Asset <SortIcon column="name" sortField={sortField} sortDirection={sortDirection} />
            </Th>
            <Th onClick={() => handleSort("totalHoldings")}>
              Holdings Avg Buy Price <SortIcon column="totalHoldings" sortField={sortField} sortDirection={sortDirection} />
            </Th>
            <Th onClick={() => handleSort("currentPrice")}>
              Current Price <SortIcon column="currentPrice" sortField={sortField} sortDirection={sortDirection} />
            </Th>
            <Th onClick={() => handleSort("shortTermGain")}>
              Short-Term <SortIcon column="shortTermGain" sortField={sortField} sortDirection={sortDirection} />
            </Th>
            <Th onClick={() => handleSort("longTermGain")}>
              Long-Term <SortIcon column="longTermGain" sortField={sortField} sortDirection={sortDirection} />
            </Th>
            <Th>Amount to Sell</Th>
          </tr>
        </thead>
        <tbody>
          {displayedHoldings.map((holding) => (
            <tr key={holding.symbol}>
              {/* Checkbox */}
              <Td>
                <Checkbox
                  checked={selectedAssets.includes(holding.symbol)}
                  onChange={() => toggleAsset(holding.symbol)}
                />
              </Td>

              {/* Asset: name + symbol (two lines) */}
              <Td>
                <TwoLineCell>
                  <div className="line1" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {getIcon(holding.symbol)} {holding.name}
                  </div>
                  <div className="line2">{holding.symbol}</div>
                </TwoLineCell>
              </Td>

              {/* Holdings + Avg Buy Price (two lines) */}
              <Td>
                <TwoLineCell>
                  <div className="line1">{formatNumberPlain(holding.totalHoldings)} {holding.symbol}</div>
                  <div className="line2">${formatNumberPlain(holding.avgBuyPrice)}/{holding.symbol}</div>
                </TwoLineCell>
              </Td>

              {/* Current Price (single line, but keep consistent) */}
              <Td>
                <TwoLineCell>
                  <div className="line1">${formatNumberPlain(holding.currentPrice)}</div>
                </TwoLineCell>
              </Td>

              {/* Short-Term: gain + holdings (two lines) */}
              <Td>
                <TwoLineCell>
                  <div className="line1" style={{ color: holding.shortTermGain >= 0 ? "#16a34a" : "#dc2626" }}>
                    {formatNumber(holding.shortTermGain)}
                  </div>
                  <div className="line2">{formatNumberPlain(holding.totalHoldings)} {holding.symbol}</div>
                </TwoLineCell>
              </Td>

              {/* Long-Term: gain + 0 symbol (two lines) */}
              <Td>
                <TwoLineCell>
                  <div className="line1" style={{ color: holding.longTermGain >= 0 ? "#16a34a" : "#dc2626" }}>
                    {formatNumber(holding.longTermGain)}
                  </div>
                  <div className="line2">0 {holding.symbol}</div>
                </TwoLineCell>
              </Td>

              {/* Amount to Sell: shows totalHoldings when selected */}
              <Td>
                <TwoLineCell>
                  <div className="line1">
                    {selectedAssets.includes(holding.symbol) 
                      ? `${formatNumberPlain(holding.totalHoldings)} ${holding.symbol}` 
                      : "-"}
                  </div>
                </TwoLineCell>
              </Td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {holdings.length > 4 && (
        <ViewAllButton onClick={() => setViewAll(!viewAll)}>
          {viewAll ? "Show Less" : `View All (${holdings.length} holdings)`}
        </ViewAllButton>
      )}
    </TableWrapper>
  );
};

export default HoldingsTable;