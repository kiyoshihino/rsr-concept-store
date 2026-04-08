import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const UPLOAD_PHP_URL = "https://rsrconceptstore.aartdigital.site/upload.php";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    const response = await fetch(UPLOAD_PHP_URL, {
      method: "POST",
      body: formDataUpload,
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
