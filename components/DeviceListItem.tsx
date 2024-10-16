import { Device } from "@/lib/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { setDeviceName } from "@/lib/api";

function edit(device: Device): void {
  const name = prompt("名前を変更してね🤗", device.name);
  if (!name) return;
  setDeviceName(name, device.mac);
}

function DeviceListItem({
  device,
  color = "blue",
  disabled = false,
}: {
  device: Device;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <li
      key={`${device.ip}-${device.mac}`}
      className={`relative flex items-center p-5 bg-white rounded-lg shadow hover:bg-${color}-50 transition duration-300`}
    >
      <div className="relative">
        <div
          className={`animate-ping absolute w-5 h-5 rounded-full bg-${color}-100 opacity-50`}
        />
        <div
          className={`relative w-5 h-5 rounded-full shadow-inner mr-3 bg-${color}-100`}
        />
      </div>

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
              onClick={() => edit(device)}
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

export default DeviceListItem;
