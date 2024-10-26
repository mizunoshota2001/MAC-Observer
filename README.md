The `README.md` file currently provides installation and setup instructions in bash commands. Here is the README.md translated into Japanese:

---

# MAC-Observer

## インストール手順

### 必要なパッケージのインストール

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nodejs npm -y
```

### リポジトリのクローン

```bash
cd && git clone https://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@github.com/mizunoshota2001/MAC-Observer.git tmp && mkdir -p MAC-Observer && cp -a tmp/* MAC-Observer && rm -rf tmp
```

### プロジェクトのセットアップ

```bash
cd MAC-Observer
npm install
npm run build
npm run start
```

### サービスの設定

```bash
cd && git clone https://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@github.com/mizunoshota2001/MAC-Observer.git tmp && mkdir -p MAC-Observer && cp -a tmp/* MAC-Observer && rm -rf tmp
rm -rf .next
cd MAC-Observer
sudo npm install
sudo npm run build
sudo npm run start
```

### システムサービスの設定

```bash
cd
cd MAC-Observer
sudo touch /etc/systemd/system/mac-observer.service
sudo cp -a mac-observer.service /etc/systemd/system/mac-observer.service
sudo systemctl daemon-reload
sudo systemctl enable mac-observer.service
```

---

これを新しい`README.md`ファイルとして保存してください。










```bash
sudo apt update
sudo apt upgrade -y
sudo apt install nodejs npm -y

```

```bash
cd && git clone https://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@github.com/mizunoshota2001/MAC-Observer.git tmp && mkdir -p MAC-Observer && cp -a tmp/* MAC-Observer && rm -rf tmp
```

```bash
cd MAC-Observer
npm install
npm run build
npm run start
```

```bash
cd && git clone https://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@github.com/mizunoshota2001/MAC-Observer.git tmp && mkdir -p MAC-Observer && cp -a tmp/RPi/* MAC-Observer && rm -rf tmp
rm -rf .next
cd MAC-Observer
sudo npm install
sudo npm run build

sudo npm run start
```

```bash
cd
cd MAC-Observer
sudo touch /etc/systemd/system/mac-observer.service
sudo touch /etc/systemd/system/uploader.service
sudo cp -a  mac-observer.service /etc/systemd/system/mac-observer.service
sudo cp -a  uploader.service /etc/systemd/system/uploader.service
sudo systemctl daemon-reload
sudo systemctl enable mac-observer.service
sudo systemctl enable uploader.service

```
