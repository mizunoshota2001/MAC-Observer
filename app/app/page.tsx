"use client";
import { useState } from "react";
import {
  PencilIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  // サンプルユーザーデータ
  const users = [
    {
      id: 1,
      name: "user1",
      avatar: "https://via.placeholder.com/40",
      lastLogin: "2024-10-12",
    },
    {
      id: 2,
      name: "user2",
      avatar: "https://via.placeholder.com/40",
      lastLogin: "2024-10-10",
    },
    {
      id: 3,
      name: "user3",
      avatar: "https://via.placeholder.com/40",
      lastLogin: "2024-10-08",
    },
    // 必要に応じてユーザーを追加
  ];

  const blocked = [
    {
      id: 4,
      name: "Unknown",
      avatar: "https://via.placeholder.com/40",
      lastLogin: "2024-09-30",
    },
    {
      id: 5,
      name: "Unknown",
      avatar: "https://via.placeholder.com/40",
      lastLogin: "2024-09-25",
    },
    // 必要に応じてブロックユーザーを追加
  ];

  const handleEdit = (user: {
    id?: number;
    name: any;
    avatar?: string;
    lastLogin?: string;
  }) => {
    // 編集アクションをここに実装
    alert(`Edit user: ${user.name}`);
  };

  // ブロックユーザーセクションの開閉状態を管理
  const [isBlockedOpen, setIsBlockedOpen] = useState(false);

  const toggleBlocked = () => {
    setIsBlockedOpen(!isBlockedOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* ユーザーリスト */}
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">User List</h2>
        <ul className="space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              className="relative flex items-center p-4 bg-white rounded-lg shadow hover:bg-blue-50 transition duration-300"
            >
              {/* ユーザーアバター */}
              <img
                src={user.avatar}
                alt={`${user.name}のアバター`}
                className="w-10 h-10 rounded-full mr-4"
              />
              {/* ユーザー名と編集ボタン */}
              <div className="flex items-center flex-1">
                <span className="text-lg font-medium text-gray-800">
                  {user.name}
                </span>
                <button
                  onClick={() => handleEdit(user)}
                  className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={`Edit ${user.name}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
              {/* 最終ログイン */}
              <div className="absolute top-2 right-2 text-sm text-gray-500 mr-3">
                <ul>
                  <li>Last login: {user.lastLogin}</li>
                </ul>
              </div>
            </li>
          ))}
        </ul>

        {/* Unknownユーザーセクション */}
        <div className="mt-8">
          <button
            onClick={toggleBlocked}
            className="flex items-center justify-between w-full px-4 py-2 bg-gray-200 rounded-lg shadow hover:bg-gray-300 transition duration-300"
          >
            <span className="text-xl font-semibold">Unknown Users</span>
            {isBlockedOpen ? (
              <EyeIcon className="w-6 h-6" />
            ) : (
              <EyeSlashIcon className="w-6 h-6" />
            )}
          </button>
          {isBlockedOpen && (
            <ul className="mt-4 space-y-3">
              {blocked.map((user) => (
                <li
                  key={user.id}
                  className="relative flex items-center p-4 bg-white rounded-lg shadow hover:bg-red-50 transition duration-300"
                >
                  {/* ユーザーアバター */}
                  <img
                    src={user.avatar}
                    alt={`${user.name}のアバター`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  {/* ユーザー名と編集ボタン */}
                  <div className="flex items-center flex-1">
                    <span className="text-lg font-medium text-gray-800">
                      {user.name}
                    </span>
                    <button
                      onClick={() => handleEdit(user)}
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={`Edit ${user.name}`}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                  {/* 最終ログイン */}
                  <span className="absolute top-2 right-2 text-sm text-gray-500">
                    Last login: {user.lastLogin}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
