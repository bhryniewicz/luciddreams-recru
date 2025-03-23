import { formulaOptions } from "@/data/data";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const searchValue = url.searchParams.get("searchValue") || "";

  await new Promise((resolve) => setTimeout(resolve, 500));

  const lowerFilter = searchValue.toLowerCase();

  const filteredFormulaOptions = formulaOptions
    .filter(({ name }) => name.toLowerCase().includes(lowerFilter))
    .slice(0, 35)
    .map(({ name }) => ({
      value: name,
      label: name,
    }));

  return new Response(JSON.stringify(filteredFormulaOptions), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
