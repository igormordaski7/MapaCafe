import React from 'react';
import '../assets/Dashboard.css';

const Dashboard = () => (
  <div className="dashboard-container">
    <div className="dashboard-card">
      <h2>Meu Dashboard Pessoal</h2>
      <div className="dashboard-grid">
        <div className="dashboard-item visitas">
          Total de visitas
        </div>
        <div className="dashboard-item cidades">
          Total de cidades visitadas
        </div>
        <div className="dashboard-item ultima">
          Última visita
        </div>
        <div className="dashboard-item media">
          Média de avaliações
        </div>
        <div className="dashboard-item top">
          Top 5 cafeterias
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
