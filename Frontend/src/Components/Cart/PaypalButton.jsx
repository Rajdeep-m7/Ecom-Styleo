import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PaypalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATpmWsANCBGmL6JYm_7SnleruG_bFGixasSRQgzLSI1X8STRnA2kXodVjT_XZfZMl8ju1_oyvYeHRZ3i"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
              },
            ],
          })
        }
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}

export default PaypalButton;
