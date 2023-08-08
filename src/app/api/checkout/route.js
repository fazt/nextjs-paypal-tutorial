import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";

// Creating an environment
let clientId = "AXXL9Zy4gU8R2iMkav-yourclient";
let clientSecret = "ED-yoursecret";

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export async function POST() {
  let request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  });

  const response = await client.execute(request);

  return NextResponse.json({
    id: response.result.id,
  });
}
