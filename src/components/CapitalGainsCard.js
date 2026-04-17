import React from "react";
import styled from "styled-components";
import { formatNumber } from "../utils/formatters";

const Card = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  color: white;
  background-color: ${(props) => (props.isBlue ? "#1e40af" : "#1f2937")};
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnHeaders = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
  margin-bottom: 0.25rem;
  padding-bottom: 0.25rem;
`;

const Label = styled.div`
  flex: 1;
  font-weight: 500;
`;

const ValuePair = styled.div`
  display: flex;
  gap: 2rem;
  flex: 2;
  justify-content: flex-end;
`;

const Value = styled.div`
  min-width: 80px;
  text-align: right;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1rem;
`;

const SavingsBox = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #22c55e;
  border-radius: 0.5rem;
  font-weight: 500;
  text-align: center;
`;

const CapitalGainsCard = ({ title, isBlue, stcgProfit, stcgLoss, ltcgProfit, ltcgLoss, savings }) => {
  const netShortTerm = stcgProfit - stcgLoss;
  const netLongTerm = ltcgProfit - ltcgLoss;
  const realisedGains = netShortTerm + netLongTerm;

  return (
    <Card isBlue={isBlue}>
      <Title>{title}</Title>

      <Table>
        {/* Column headers */}
        <ColumnHeaders>
          <Label></Label>
          <ValuePair>
            <Value>Short-term</Value>
            <Value>Long-term</Value>
          </ValuePair>
        </ColumnHeaders>

        {/* Profits row */}
        <Row>
          <Label>Profits</Label>
          <ValuePair>
            <Value>{formatNumber(stcgProfit)}</Value>
            <Value>{formatNumber(ltcgProfit)}</Value>
          </ValuePair>
        </Row>

        {/* Losses row */}
        <Row>
          <Label>Losses</Label>
          <ValuePair>
            <Value>{formatNumber(stcgLoss)}</Value>
            <Value>{formatNumber(ltcgLoss)}</Value>
          </ValuePair>
        </Row>

        {/* Net Capital Gains row */}
        <Row>
          <Label>Net Capital Gains</Label>
          <ValuePair>
            <Value>{formatNumber(netShortTerm)}</Value>
            <Value>{formatNumber(netLongTerm)}</Value>
          </ValuePair>
        </Row>
      </Table>

      {/* Total Realised / Effective Capital Gains */}
      <TotalRow>
        <span>{isBlue ? "Effective Capital Gains:" : "Realised Capital Gains:"}</span>
        <span style={{ fontSize: "1.1rem" }}>{formatNumber(realisedGains)}</span>
      </TotalRow>

      {savings > 0 && (
        <SavingsBox>You're going to save: {formatNumber(savings)}</SavingsBox>
      )}
    </Card>
  );
};

export default CapitalGainsCard;