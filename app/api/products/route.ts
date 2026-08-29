import { NextResponse } from "next/server";
import { db } from "@/src/prisma/db";

export async function GET() {
  try {
    const products = await db.orm.public.Product.all();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET products error:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { sku, name, description } = body;

    if (!sku || !name) {
      return NextResponse.json(
        { error: "SKU and name are required" },
        { status: 400 }
      );
    }

    const product = await db.orm.public.Product.create({
      sku,
      name,
      description: description || null,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST product error:", error);

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}