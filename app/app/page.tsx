"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  PencilIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

async function getDevices() {
  const response = await fetch("/api/getDevices");
  if (!response.ok) {
    throw new Error("ネットワークの応答が正常ではありません");
  }
  return response.json();
}
async function getHost() {
  const response = await fetch("/api/getHost");
  if (!response.ok) {
    throw new Error("ネットワークの応答が正常ではありません");
  }
  return response.json();
}

function setDeviceName(name: string, mac: string | undefined) {
  fetch("/api/setDeviceName", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, mac: mac }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ネットワークの応答が正常ではありません");
    }
    location.reload();
  });
}

function arpFlush(btn: EventTarget & HTMLButtonElement) {
  btn.disabled = true;
  fetch("/api/arpFlush", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("ネットワークの応答が正常ではありません");
    }
    location.reload();
  });
}

interface Device {
  name: string;
  ip: string;
  mac: string;
  lastAccess: string;
  avatar: string;
}

function DeviceListItem({
  device,
  setDeviceName,
  handleEdit,
  color = "blue",
  disabled = false,
}: {
  device: Device;
  setDeviceName: (name: string, mac: string | undefined) => void;
  handleEdit: (device: Device) => void;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <li
      key={`${device.ip}-${device.mac}`}
      className={`relative flex items-center p-5 bg-white rounded-lg shadow hover:bg-${color}-50 transition duration-300`}
    >
      {/* デバイスのアバター */}
      <div
        className={`w-5 h-5 rounded-full shadow-inner mr-3 bg-${color}-100`}
      />

      {/* デバイス名と編集ボタン */}
      <div className="flex items-center flex-1">
        <span className="font-medium text-gray-800 break-all">
          {device.name}
        </span>
        {!disabled && (
          <>
            <button
              onClick={() => setDeviceName("Unknown", device.mac)}
              className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={`Delete ${device.name}`}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEdit(device)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={`Edit ${device.name}`}
            >
              <PencilIcon className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* デバイスの詳細情報 */}
      <div className="absolute bottom-0 right-2 text-xs text-gray-500 font-mono">
        IP: {device.ip} / MAC: {device.mac}
      </div>
    </li>
  );
}

export default function Home() {
  // State to manage devices
  const [devices, setDevices] = useState<{
    known: {
      name: string;
      ip: string;
      mac: string;
      lastAccess: string;
      avatar: string;
    }[];
    unknown: {
      name: string;
      ip: string;
      mac: string;
      lastAccess: string;
      avatar: string;
    }[];
  }>({ known: [], unknown: [] });

  const [host, setHost] = useState<{
    name: string;
    ip: string;
    mac: string;
    lastAccess: string;
    avatar: string;
  } | null>(null);

  // Fetch devices on component mount
  useEffect(() => {
    async function fetchDevices() {
      try {
        const fetchedDevices = await getDevices();
        const fetchedHost = await getHost();
        setDevices(fetchedDevices);
        setHost(fetchedHost);
        console.log("Fetched devices:", fetchedDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    }
    fetchDevices();
  }, []);

  // Handle edit action
  const handleEdit = (device: {
    name: string;
    avatar?: string;
    lastAccess?: string;
    ip?: string;
    mac?: string;
  }) => {
    const name = prompt("名前を変更してね🤗", device.name);
    if (!name) return;
    setDeviceName(name, device.mac);
  };

  // Toggle state for unknown devices
  const [isUnknownOpen, setIsUnknownOpen] = useState(false);

  const toggleUnknown = () => {
    setIsUnknownOpen(!isUnknownOpen);
  };

  return (
    <>  
    <input type="hidden" className="bg-blue-100 hover:bg-blue-50 bg-red-100 hover:bg-red-50 bg-green-100 hover:bg-green-50" />
    <div className="min-h-screen bg-gray-100 p-4">
      {host && (
        <div className="absolute top-1 right-2 text-xs text-gray-500 font-mono">
          IP: {host.ip} / MAC: {host.mac}
        </div>
      )}
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold my-4 text-center">
          <Image
            src="/img/title.png"
            alt="MAC Obs."
            width={500}
            height={500}
            className="object-contain w-full m-auto px-5 invisible "
            onLoad={(e) => {
              (e.target as HTMLImageElement).classList.toggle("invisible");
            }}
          />
        </h1>
        <ul className="space-y-3">
          {devices.known.map((device) => (
            <DeviceListItem
              key={`${device.ip}-${device.mac}`}
              device={device}
              setDeviceName={setDeviceName}
              handleEdit={handleEdit}
              color="blue"
            />
          ))}
          {host && (
            <DeviceListItem
              key={`${host.ip}-${host.mac}`}
              device={host}
              setDeviceName={setDeviceName}
              handleEdit={handleEdit}
              color="green"
              disabled={true}
            />
          )}
        </ul>

        <div className="mt-8">
          <button
            onClick={toggleUnknown}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-300"
          >
            <span className="text-xl font-semibold">Unknown Devices</span>
            {isUnknownOpen ? (
              <EyeIcon className="w-6 h-6" />
            ) : (
              <EyeSlashIcon className="w-6 h-6" />
            )}
          </button>
          {isUnknownOpen && (
            <ul className="mt-4 space-y-3">
              {devices.unknown.map((device) => (
                <DeviceListItem
                  key={`${device.ip}-${device.mac}`}
                  device={device}
                  setDeviceName={setDeviceName}
                  handleEdit={handleEdit}
                  color="red"
                />
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-end">
            <button
              onClick={(e) => arpFlush(e.currentTarget)}
              className="flex items-center justify-end px-4 py-2 bg-amber-200 rounded-lg shadow hover:bg-amber-300 transition duration-300"
            >
              <span className="text-xl font-semibold mr-2">Update</span>
              <ArrowPathIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
