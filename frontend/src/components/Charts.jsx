import { Progress } from 'antd';
import React from 'react';

const Charts = ({ alltransaction }) => {
  // categories
  const category = [
    'salary',
    'tip',
    'project',
    'food',
    'movie',
    'bills',
    'medical',
    'fee',
    'tax'
  ]
  const totaltransaction = alltransaction.length;
  const totalincometransactions = alltransaction.filter((transaction) => transaction.type === 'income');
  const totalexpensetransactions = alltransaction.filter((transaction) => transaction.type === 'expense');

  // Calculate total income and total expense amounts
  const totalIncomeAmount = (totalincometransactions.length / totaltransaction) * 100;

  const totalExpenseAmount = (totalexpensetransactions.length / totaltransaction) * 100;
  // total turnover
  const TotalTurnover = alltransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
  // total income turnover
  const totalIncometurnover = alltransaction
    .filter((transaction) => transaction.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  // total expense turnover

  const totalExpenseturnover = alltransaction
    .filter((transaction) => transaction.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncometurnoverPercent = (totalIncometurnover / TotalTurnover) * 100;
  const totalExpenseturnoverPercent = (totalExpenseturnover / TotalTurnover) * 100;

  return (
    <>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="bg-white border border-gray-300 p-4 rounded shadow">
            <div className="text-xl font-semibold text-gray-800 mb-4">Total Transaction: {totaltransaction}</div>
            <div className="flex justify-between">
              <div className="text-yellow-300">
                <p className="text-lg font-semibold">Income Count: {totalincometransactions.length}</p>
                <Progress
                  type="circle"
                  strokeColor="#FFD700"
                  className="m-2"
                  percent={totalIncomeAmount.toFixed(0)}
                />
              </div>
              <div className="text-red-300">
                <p className="text-lg font-semibold">Expense Count: {totalexpensetransactions.length}</p>
                <Progress
                  type="circle"
                  strokeColor="#FF0000"
                  className="m-2"
                  percent={totalExpenseAmount.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white border border-gray-300 p-4 rounded shadow">
            <div className="text-xl font-semibold text-gray-800 mb-4">Total TurnOver: {TotalTurnover}</div>
            <div className="flex justify-between">
              <div className="text-yellow-300">
                <p className="text-lg font-semibold">Income: {totalIncometurnover}</p>
                <Progress
                  type="circle"
                  strokeColor="#FFD700"
                  className="m-2"
                  percent={totalIncometurnoverPercent.toFixed(0)}
                />
              </div>
              <div className="text-red-300">
                <p className="text-lg font-semibold">Expense: {totalExpenseturnover}</p>
                <Progress
                  type="circle"
                  strokeColor="#FF0000"
                  className="m-2"
                  percent={totalExpenseturnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
  <div>
    <h4 className="text-lg font-semibold mb-2">Categoriewise Income</h4>
    {category.map((categoryItem) => {
      const amount = alltransaction
        .filter((transaction) => transaction.type === 'income' && transaction.category === categoryItem)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return (
        amount > 0 && (
          <div key={categoryItem} className="bg-white rounded shadow-md p-4">
            <h4 className="text-xl font-semibold mb-2">{categoryItem}</h4>
            <Progress percent={((amount / totalIncometurnover) * 100).toFixed(0)} />
          </div>
        )
      );
    })}
  </div>

  <div>
    <h4 className="text-lg font-semibold mb-2">Categoriewise Expense</h4>
    {category.map((categoryItem) => {
      const amount = alltransaction
        .filter((transaction) => transaction.type === 'expense' && transaction.category === categoryItem)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      return (
        amount > 0 && (
          <div key={categoryItem} className="bg-white rounded shadow-md p-4">
            <h4 className="text-xl font-semibold mb-2">{categoryItem}</h4>
            <Progress percent={((amount / totalExpenseturnover) * 100).toFixed(0)} />
          </div>
        )
      );
    })}
  </div>
</div>

    </>
  );
};

export default Charts;
