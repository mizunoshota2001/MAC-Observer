"use client";
import { useState } from "react";

function Test() {
  const [inputValue, setInputValue] = useState("");

  const getTest = () => {
    // アラートで入力を取得
    const userInput = prompt("入力してください");
    if (userInput) {
      setInputValue(userInput);
      postTest(userInput);
    }
  };

  const postTest = (data) => {
    fetch("/api/setDeviceName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data, mac: "test" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワークの応答が正常ではありません");
        }
        return response.json();
      })
      .then((json) => {
        console.log("POSTの結果:", json);
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  };

  return (
    <div>
      <h1>Testコンポーネント</h1>
      <button onClick={getTest}>APIにPOSTリクエスト</button>
      {inputValue && <p>入力内容: {inputValue}</p>}
    </div>
  );
}

export default Test;
