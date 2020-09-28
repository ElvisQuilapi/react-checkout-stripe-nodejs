import React, { useState } from 'react';
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css'

// Clave publicable Stripe
const stripePromise = loadStrip('##########')

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    setLoading(true)

    if (!error) {
      const { id } = paymentMethod

      try {
        const { data } = await axios.post('http://localhost:3001/api/checkout', {
          id,
          amount: 10000
        })
        elements.getElement(CardElement).clear()

      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">
    <img src="https://www.soydemac.com/wp-content/uploads/2018/04/teclado-mecanico-Kira-Kickstarter.jpg" alt="" className="img-fluid" />
    <h3 className="text-center mt-2">Price: 100$</h3>
    <div className="form-group">
      <CardElement className="form-control" />
    </div>
    <button className="btn btn-success" disabled={!stripe}>
      { loading  ? (
        <div className="spinner-border text-right" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : "Buy"}
    </button>
  </form>
}

function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="col-md-4 offset-md-4">
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}

export default App;
