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
cd && git clone https://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@github.com/mizunoshota2001/MAC-Observer.git tmp && mkdir -p MAC-Observer && cp -a tmp/* MAC-Observer && rm -rf tmp
cd MAC-Observer
sudo npm install
sudo npm run build

sudo npm run start
```


```bash
cd
cd MAC-Observer
sudo touch /etc/systemd/system/mac-observer.service
sudo cp -a  mac-observer.service /etc/systemd/system/mac-observer.service
sudo systemctl daemon-reload
sudo systemctl enable mac-observer.service

```