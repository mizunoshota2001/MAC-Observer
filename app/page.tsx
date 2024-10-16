"use client";
import Image from "next/image";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import type { Device, Devices } from "@/lib/types";
import DeviceListItem from "@/components/DeviceListItem";
import { getDevices, getHost, arpFlush } from "@/lib/api";

function update(e: { currentTarget: EventTarget & HTMLButtonElement }) {
  arpFlush(e.currentTarget);
  const icon = e.currentTarget.querySelector(".arrow-path-icon");
  if (!icon) return;
  icon.classList.add("animate-spin");
}

function Page() {
  const [devices, setDevices] = useState<Devices>({ known: [], unknown: [] });
  const [isUnknownOpen, setIsUnknownOpen] = useState(false);
  const [host, setHost] = useState<Device | null>(null);

  async function fetchDevices() {
    await Promise.all([getDevices().then(setDevices), getHost().then(setHost)]);
  }
  function toggleUnknown() {
    setIsUnknownOpen(!isUnknownOpen);
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <>
      <input
        type="hidden"
        className="bg-blue-100 hover:bg-blue-50 bg-red-100 hover:bg-red-50 bg-green-100 hover:bg-green-50"
      />
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
            {host && (
              <DeviceListItem
                key={`${host.ip}-${host.mac}`}
                device={host}
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
                    color="red"
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-end">
              <button
                onClick={update}
                className="flex items-center justify-end px-4 py-2 bg-amber-200 rounded-lg shadow hover:bg-amber-300 transition duration-300"
              >
                <span className="text-xl font-semibold mr-2">Update</span>
                <ArrowPathIcon className="w-6 h-6 arrow-path-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
