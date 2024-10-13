"use client";
function Test() {
  const getTest = () => {
    fetch("/api/test")
      .then((response) => {
        if (!response.ok) {
          throw new Error('ネットワークの応答が正常ではありません');
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error('エラーが発生しました:', error);
      });
  };

  return (
    <div>
      <h1>Testコンポーネント</h1>
      <button onClick={getTest}>APIにGETリクエスト</button>
    </div>
  );
}

export default Test;
