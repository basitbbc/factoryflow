import AddProductForm from "./AddProductForm";
export default async function ProductsPage() {
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  const products = await response.json();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1><AddProductForm />

      <div className="space-y-4">
        {products.map(
          (product: {
            id: number;
            sku: string;
            name: string;
            description: string | null;
          }) => (
            <div
              key={product.id}
              className="border rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>

              <p className="text-sm">SKU: {product.sku}</p>

              {product.description && (
                <p className="mt-2">{product.description}</p>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}