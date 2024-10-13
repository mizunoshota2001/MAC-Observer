import { exec } from "node:child_process";

function test(): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec("arp -a", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      resolve({ stdout, stderr });
    });
  });
}

export async function GET() {
  const result = await test();
  return new Response(JSON.stringify({ test: result }), {
    headers: { "Content-Type": "application/json" },
  });
}
