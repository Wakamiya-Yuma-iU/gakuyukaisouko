// app/routes/loans/index.tsx
import { json, LoaderFunction, redirect } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;
  let items = await env.DB.prepare("SELECT * FROM Items").all();
  return json({ items });
};

export default function LoansIndex() {
  const data = useLoaderData<typeof loader>();
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Insert loan information into the database here
    // ...

    navigate("/loans/success");
  };

  return (
    <div>
      <h1>Loan an Item</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Item:
          <select onChange={(e) => setSelectedItem(e.target.value)}>
            {data.items.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {/* Add more form fields as needed */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
