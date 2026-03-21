import { NextResponse } from "next/server";

type PistonResponse = {
  run?: {
    stdout?: string;
    stderr?: string;
    output?: string;
    code?: number;
    signal?: string;
  };
  compile?: {
    stdout?: string;
    stderr?: string;
    output?: string;
    code?: number;
    signal?: string;
  };
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      code?: string;
      stdin?: string;
    };

    const code = body.code?.trim() ?? "";
    const stdin = body.stdin ?? "";

    if (!code) {
      return NextResponse.json({ error: "Codul C++ lipseste." }, { status: 400 });
    }

    const pistonPayload = {
      language: "cpp",
      version: "10.2.0",
      files: [{ name: "main.cpp", content: code }],
      stdin,
      compile_timeout: 10000,
      run_timeout: 5000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    };

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pistonPayload),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Serviciul extern de compilare a raspuns cu ${response.status}.` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as PistonResponse;

    return NextResponse.json({
      compile: data.compile ?? null,
      run: data.run ?? null,
      message: data.message ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Compilatorul extern nu este disponibil momentan." },
      { status: 500 },
    );
  }
}
