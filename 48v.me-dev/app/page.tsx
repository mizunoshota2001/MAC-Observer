"use client";
import { useState, useEffect } from "react";
import type { Devices } from "@/lib/types";
import DeviceListItem from "@/components/DeviceListItem";
import { getDevices } from "@/lib/api";
import { useSearchParams } from "next/navigation";

function Page() {
  const [devices, setDevices] = useState<Devices>({ known: [], unknown: [] });
  const place = useSearchParams().toString().replace("=", "");
  async function fetchDevices() {
    await getDevices(place).then(setDevices);
  }

  useEffect(() => {
    fetchDevices();
    const intervalId = setInterval(() => {
      fetchDevices();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <input
        type="hidden"
        className="bg-blue-100 hover:bg-blue-50 bg-red-100 hover:bg-red-50 bg-green-100 hover:bg-green-50"
      />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-semibold my-4 text-center">
            <img
              src="./img/title.png"
              alt="MAC Obs."
              className="object-contain w-full m-auto px-5"
            />
          </h1>
          <ul className="space-y-3">
            {devices.known.length === 0 && (
              <>
                <li
                  className={`animate-pulse relative flex items-center p-5 bg-gray-50 rounded-lg shadow hover:bg-gray-50 transition duration-300`}
                >
                  <div
                    className={` w-5 h-5 rounded-full shadow-inner mr-3 bg-gray-200`}
                  />
                  <div className="flex items-center flex-1">
                    <div className="w-full grid grid-rows-2 gap-2">
                      <div className="h-2 bg-gray-200 rounded" />
                      <div className="h-2 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-2 text-xs text-gray-500 font-mono">
                    IP:{" "}
                    <span className="h-2 bg-gray-200 rounded">
                      <span className="invisible">000.000.000.000</span>
                    </span>{" "}
                    / MAC:{" "}
                    <span className="h-2 bg-gray-200 rounded">
                      <span className="invisible">ff-ff-ff-ff-ff-ff</span>
                    </span>
                  </div>
                </li>
              </>
            )}
            {devices.known.map((device) => (
              <DeviceListItem
                key={`${device.ip}-${device.mac}`}
                device={device}
                color="blue"
              />
            ))}
          </ul>
          <div className="text-right font-thin italic px-1">
            ※5分ごとに更新　リアルタイム版は
            <a
              href="http://mac-obs.local"
              className="font-bold text-blue-500 hover:underline"
            >
              こちら
            </a>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">MAC Obs. について</h2>
            <p className="text-gray-700 mb-2">
              MAC
              Obs.は、ネットワーク内のデバイスをリアルタイムで監視し、既知および未知のデバイスのリストを提供するサービスです。
            </p>
          </div>
          <div className="mt-4 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">端末の登録について</h2>
            <p className="text-gray-700 mb-2">
              <a
                href="http://mac-obs.local"
                className="text-blue-500 hover:underline"
              >
                mac-obs.local
              </a>
              にアクセスし、対応するMACアドレスの端末名を編集してください。
            </p>
          </div>
          <div className="mt-4 p-6 bg-yellow-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              トラブルシューティング
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ネットワーク接続を確認してください。</li>
              <span className="italic">
                MAC-Obs.はLAN内のRaspberry
                Piで動作しています。同じネットワーク内にいることを確認してください。
              </span>
              <li>MACアドレスを固定してください。</li>
              <span className="italic">
                端末によっては、MACアドレスが変わることがあります(iPhoneなど)。MACアドレスを固定してください。
              </span>
              <li>URLのパラメータを確認してください。</li>
              <span className="italic">
                適切なパラメータでないと何も表示されません。例: ?1411
              </span>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
