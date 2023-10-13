// app/routes/items/index.tsx
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM Items LIMIT 5").all();
  return json(results);
};

export default function ItemsIndex() {
  const items = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
