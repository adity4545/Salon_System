import { PayPalButtons } from '@paypal/react-paypal-js';

const PaymentComponent = ({ amount = '100.00', currency = 'USD' }) => (
  <PayPalButtons
    style={{ layout: 'vertical' }}
    createOrder={(data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount,
            currency_code: currency,
          },
        }],
      });
    }}
    onApprove={async (data, actions) => {
      const details = await actions.order.capture();
      alert(`Payment successful! Thank you, ${details.payer.name.given_name}!`);
    }}
    onError={(err) => {
      alert('Payment failed: ' + err);
    }}
  />
);

export default PaymentComponent;
