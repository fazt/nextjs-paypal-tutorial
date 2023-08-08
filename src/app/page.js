"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function HomePage() {
  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center">
      <PayPalScriptProvider
        options={{
          clientId:
            "AXXL9Zy4gU8R2iMkav-yourclientid",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical", color: "silver" }}
          createOrder={async (data, actions) => {
            const res = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const order = await res.json();
            console.log(order);
            return order.id;
          }}
          onCancel={(data) => {
            console.log("Cancelled:", data);
          }}
          onApprove={(data, actions) => {
            console.log("Approved:", data);
            actions.order.capture();
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default HomePage;
