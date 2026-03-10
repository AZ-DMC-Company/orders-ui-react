import React, { useEffect, useState } from 'react';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Lista de Órdenes</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;