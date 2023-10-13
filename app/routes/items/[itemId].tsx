import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

interface Env {
  DB: D1Database;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  let env = context.env as Env;

  let { results } = await env.DB.prepare("SELECT * FROM Items WHERE item_id = ? LIMIT 1").get(params.itemId);
  return json(results);
};

export default function ItemDetail() {
  const item = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      {/* other details */}
    </div>
  );
}
