import { http, HttpResponse } from "msw";
import { products, fullProducts } from "./products";

export const handlers = [
  http.get("https://api.deepspacestore.com/offers", () => {
    return HttpResponse.json(products);
  }),
  http.get("https://api.deepspacestore.com/offers/:code", (req) => {
    const { code } = req.params;
    const product = fullProducts[code];
    if (product) {
      return HttpResponse.json(product);
    } else {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }
  }),
  http.post(
    "https://api.deepspacestore.com/offers/:code/create_order",
    async ({ request }) => {
      const requestBody = await request.json();
      const cpf = requestBody.cpf;

      if (cpf == "00000000000") {
        return HttpResponse.json({ error: "CPF inválido" });
      }

      const order = {
        orderId: Math.floor(Math.random() * 100000),
        status: "success",
        message: "Order created successfully",
      };

      return HttpResponse.json({ order });
    }
  ),
];
