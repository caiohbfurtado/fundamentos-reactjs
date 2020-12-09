import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    api.get('/transactions').then(({ data }) => {
      const { balance: balanceRes, transactions: transactionsRes } = data;
      const balanceValues = {
        income: formatValue(Number(balanceRes.income)),
        outcome: formatValue(Number(balanceRes.outcome)),
        total: formatValue(Number(balanceRes.total)),
      };
      setBalance(balanceValues);
      const transactionValues = transactionsRes.map((item: Transaction) => ({
        id: item.id,
        title: item.title,
        value: item.value,
        formattedValue: formatValue(Number(item.value)),
        formattedDate: formatDate(item.created_at),
        // formattedDate: new Date(item.created_at).toLocaleString('pt-br),
        type: item.type,
        category: { title: item.category.title },
        created_at: item.created_at,
      }));
      setTransactions(transactionValues);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance?.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance?.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance?.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(item => (
                <tr key={item.id}>
                  <td className="title">{item.title}</td>
                  <td className={item.type}>
                    {item.type === 'outcome' && ' - '}
                    {item.formattedValue}
                  </td>
                  <td>{item.category.title}</td>
                  <td>{item.formattedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
