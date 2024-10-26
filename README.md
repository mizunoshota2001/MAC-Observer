# MAC-Observer

**MAC-Observer**は、Raspberry Pi上で動作するMACアドレス監視システムです。LAN内に接続された端末のMACアドレスをリアルタイムで監視し、Raspberry Pi上のWEBサーバから閲覧することができます。

## 目次
- [MAC-Observer](#mac-observer)
  - [目次](#目次)
  - [必要なパッケージのインストール](#必要なパッケージのインストール)
  - [サービスの設定](#サービスの設定)
  - [システムサービスの設定](#システムサービスの設定)
  - [外部閲覧用拡張機能](#外部閲覧用拡張機能)
  - [使用方法](#使用方法)

---

## 必要なパッケージのインストール

まず、システムを最新の状態に更新し、必要なパッケージをインストールします。

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nodejs npm -y
```

---

## サービスの設定

次に、MAC-Observerのリポジトリをクローンし、必要な依存関係をインストールします。

```bash
# ホームディレクトリに移動し、リポジトリをクローン
cd
git clone https://github.com/mizunoshota2001/MAC-Observer.git

# MAC-Observerディレクトリに移動
cd MAC-Observer

# 依存関係のインストール
sudo npm install

# ビルドの実行
sudo npm run build
```

---

## システムサービスの設定

MAC-Observerをシステムサービスとして設定し、自動起動を有効にします。

```bash
# MAC-Observerディレクトリに移動
cd
cd MAC-Observer

# サービスファイルを作成
sudo touch /etc/systemd/system/mac-observer.service

# リポジトリ内のサービスファイルをコピー
sudo cp -a mac-observer.service /etc/systemd/system/mac-observer.service

# systemdデーモンを再読み込み
sudo systemctl daemon-reload

# サービスを有効化（自動起動設定）
sudo systemctl enable mac-observer.service

# システムを再起動
sudo reboot
```

---

## 外部閲覧用拡張機能

ゼミ生向けの外部閲覧用拡張機能については、以下のリポジトリをご参照ください。

[外部閲覧用拡張機能リポジトリ](https://github.com/mizunoshota2001/MAC-Observer-Extensions)

---

## 使用方法

1. Raspberry PiのWEBサーバにアクセスします。
2. ログイン画面が表示されたら、必要な認証情報を入力します。
3. 接続された端末のMACアドレスがリアルタイムで表示されます。

---

