import { ImageResponse } from "next/og";

async function loadAssets() {
  try {
    const [normalFontModule, monoFontModule, semiboldFontModule] =
      await Promise.all([
        import("./geist-regular-otf.json"),
        import("./geist-mono-regular-otf.json"),
        import("./geist-semibold-otf.json"),
      ]);

    const normalFont =
      normalFontModule.default?.base64Font || normalFontModule.base64Font || "";
    const monoFont =
      monoFontModule.default?.base64Font || monoFontModule.base64Font || "";
    const semiboldFont =
      semiboldFontModule.default?.base64Font ||
      semiboldFontModule.base64Font ||
      "";

    return [
      {
        name: "Geist",
        data: Buffer.from(normalFont as string, "base64"),
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Geist Mono",
        data: Buffer.from(monoFont as string, "base64"),
        weight: 400 as const,
        style: "normal" as const,
      },
      {
        name: "Geist",
        data: Buffer.from(semiboldFont as string, "base64"),
        weight: 600 as const,
        style: "normal" as const,
      },
    ];
  } catch (error) {
    console.error("Font loading error:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Blog";
    const description =
      searchParams.get("description") || "Welcome to my blog!";

    const fonts = await loadAssets();

    return new ImageResponse(
      (
        <div
          tw="flex h-full w-full relative overflow-hidden"
          style={{
            fontFamily: "Geist",
          }}
        >
          <div tw="flex flex-col items-center justify-center text-center w-full h-full">
            <div tw="tracking-tight flex flex-col justify-center text-balance font-semibold text-[80px] max-w-4xl text-slate-800">
              {title}
            </div>
            {description && (
              <div tw="text-[32px] mt-6 text-balance font-normal max-w-3xl text-slate-500">
                {description}
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 628,
        fonts,
      }
    );
  } catch (error) {
    console.error("OG image generation error:", error);
    return new Response(`OG image generation failed: ${error}`, {
      status: 500,
    });
  }
}
