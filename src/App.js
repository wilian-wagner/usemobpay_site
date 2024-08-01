import React, { useState } from 'react';
import './App.css';
import visaLogo from './assets/visa.png';
import usemobpayLogo from './assets/USEMOBPAY_1x.png';

const App = () => {
  const [amount, setAmount] = useState('');
  const [installments, setInstallments] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedButton, setSelectedButton] = useState('visa');

  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const rates = [
    3.89, 5.86, 6.64, 7.79, 8.99, 9.39, 10.69, 11.29, 11.47, 12.7, 12.98, 13.69,
    13.99, 15.24, 15.89, 16.54, 16.99, 18.18, 18.95, 19.89, 20.79,
  ];

  const ratesOthers = [
    4.79, 6.65, 7.41, 8.55, 9.75, 10.14, 11.71, 12.31, 12.45, 13.68, 13.95,
    14.66, 14.9, 16.21, 16.8, 17.39, 17.81, 19.08, 19.84, 20.71, 21.56,
  ];

  const calculateValues = () => {
    let rate = 0;
    if (isEnabled) {
      rate = 1.99;
    } else if (selectedButton === 'visa') {
      rate = rates[installments - 1];
    } else if (selectedButton === 'others') {
      rate = ratesOthers[installments - 1];
    }
    if (!amount || !installments) return {};
    const principal = parseFloat(amount);
    const totalWithRate = principal / ((100 - rate) / 100);
    const totalWithoutRate = principal * ((100 - rate) / 100);
    const installmentValueWithRate = totalWithRate / installments;
    const installmentValueWithoutRate = totalWithoutRate / installments;

    return {
      totalWithoutRate: totalWithoutRate.toFixed(2),
      totalWithRate: totalWithRate.toFixed(2),
      installmentValueWithRate: installmentValueWithRate.toFixed(2),
      installmentValueWithoutRate: installmentValueWithoutRate.toFixed(2),
    };
  };

  const values = calculateValues();

  return (
    <div className="container">
      <header className="header">
        <div className="banner-container">
          <img src={usemobpayLogo} alt="Use Mob Pay" className="banner" />
        </div>
      </header>
      <div className="content-container">
        <div className="content">
          <div className="input-container">
            <label htmlFor="amount" className="label">Digite o valor:</label>
            <input
              type="number"
              id="amount"
              className="input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 1000"
            />
          </div>
          <div className="input-container">
            <label className="label">Selecione a bandeira:</label>
            <div className="button-group">
              <button
                className={`button ${selectedButton === 'visa' ? 'selected' : ''}`}
                onClick={() => setSelectedButton('visa')}
              >
                <img src={visaLogo} alt="Visa" className="button-image" />
              </button>
              <button
                className={`button ${selectedButton === 'others' ? 'selected' : ''}`}
                onClick={() => setSelectedButton('others')}
              >
                Outros
              </button>
            </div>
          </div>
          <div className="input-container">
            <div className="switch-container">
              <div>
                <label className="label">Débito/Pix:</label>
                <label className="legenda">Desabilite para função crédito</label>
              </div>
              <input
                type="checkbox"
                className="switch"
                checked={isEnabled}
                onChange={toggleSwitch}
              />
            </div>
            <select
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
              className="select"
            >
              <option value="">Selecione as parcelas</option>
              {rates.map((rate, index) => (
                <option key={index} value={index + 1}>
                  {index + 1} parcelas
                </option>
              ))}
            </select>
          </div>
          {installments && amount && isEnabled === false && (
            <div className="result-container">
              <p className="label">Valor a cobrar: {values.totalWithRate}</p>
              <p className="label2">
                Repassando a taxa {installments}x ({values.installmentValueWithRate})
              </p>
              <p className="label">Valor a receber: {values.totalWithoutRate}</p>
              <p className="label2">
                Sem repassar a taxa {installments}x ({values.installmentValueWithoutRate})
              </p>
            </div>
          )}
          {isEnabled === true && (
            <div className="result-container">
              <p className="label">Valor a cobrar: {values.totalWithRate}</p>
              <p className="label2">Repassando a taxa</p>
              <p className="label">Valor a cobrar: {values.totalWithoutRate}</p>
              <p className="label2">Sem repassar a taxa</p>
            </div>
          )}
        </div>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h2>Contato</h2>
            <h3>Suporte Usemobpay</h3>
            <p>+55 15 99737-0669</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
