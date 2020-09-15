import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css'

const stripePromise = loadStripe('pk_test_51HRnD1FjBBtBsr1TEE1GrRuYJxZgtAurJEP8WLx5GwKpX3WHW6Z4kP2RlNM7CeZuTlbsCzEAwhsHqHcbwO0krVIT00iGLh7oEg')

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if(!error) {
      console.log(paymentMethod)
    }
  }

  return <form onSubmit={handleSubmit} className="card card-body">
    <img src="https://www.soydemac.com/wp-content/uploads/2018/04/teclado-mecanico-Kira-Kickstarter.jpg" alt="" className="img-fluid" />
    <div className="form-group">
      <CardElement className="form-control"/>
    </div>
    <button className="btn btn-success">
      Buy
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
