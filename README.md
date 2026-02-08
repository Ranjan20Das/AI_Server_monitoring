# AWS EC2 Node.js AI Server Deployment Guide

This document explains **end-to-end steps** to deploy a AI_Powered Node.js (Express) server with a simple HTML/CSS UI on **AWS EC2 (Ubuntu)**, assign an **Elastic IP**, and keep the server running permanently using **PM2**.

server demo - go to repo -> assets-> download 2 mp4 videos to see the working flow of the server

Elastic ip- http://54.83.237.200:5050

## 1. Create Ubuntu EC2 Instance

1. Login to **AWS Management Console**
2. Go to **EC2 → Launch instance**
3. Instance name: `ai-server`
4. AMI: **Ubuntu Server 22.04 LTS**
5. Instance type: `t2.micro` (Free Tier)
6. Key pair:

   * Create new key pair
   * Type: RSA
   * Download `.pem` file (keep it safe)
7. Network settings:

   * Allow **SSH (22)** from your IP
   * Allow **Custom TCP (5050)** from `0.0.0.0/0`
8. Click **Launch instance**

---

## 2. Allocate and Attach Elastic IP

1. EC2 Dashboard → **Elastic IPs**
2. Click **Allocate Elastic IP address**
3. Select the Elastic IP → **Actions → Associate**
4. Choose your EC2 instance → Associate

This makes your public IP **permanent**.

---

## 3. Connect to Ubuntu Instance

From your local Ubuntu machine:

```bash
cd ~/Downloads
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@<ELASTIC_IP>
```

If login is successful, you are inside the server.

---

## 4. Update System and Install Node.js

```bash
sudo apt update && sudo apt upgrade -y
```

Install Node.js (LTS):

sudo apt install -y nodejs


Verify:

```bash
node -v
npm -v
```

---

## 5. Create Project Structure

```bash
mkdir ai-server-ui
cd ai-server-ui
mkdir public
nano server.js
nano public/index.html
nano public/style.css
```

---

## 6. Install Express and Dependencies

```bash
npm init -y
npm install express cors
```

---

## 7. Express Server (server.js)

*get express code (server.js) from repo
* Runs on port **5050**
* Serves HTML/CSS
* Accepts AI-style messages

Key points:

* Uses `express.json()`
* Listens on `0.0.0.0`

---

## 8. Frontend (HTML + CSS)

* get HTML/CSS code from repo
* `index.html` provides browser UI
* `style.css` styles the page
* Browser sends POST requests to `/ai/message`

---

## 9. Run Server (Test)

```bash
node server.js
```

Open browser:

```
http://<ELASTIC_IP>:5050
```

If the page loads, deployment is correct.

---

## 10. Install PM2 (Keep Server Running)

```bash
sudo npm install -g pm2
```

Start server with PM2:

```bash
pm2 start server.js --name ai-server
```

Enable auto-start on reboot:

```bash
pm2 startup
```

Run the command PM2 prints.

Save process list:

```bash
pm2 save
```

---

## 11. Verify Permanent Deployment

Check status:

```bash
pm2 status
```

Restart EC2 instance → Server will start automatically.

---

## 12. Public Access Flow

User Browser → Elastic IP → EC2 Security Group → Express Server → Response

---


---

## 13. Final Result

* Ubuntu EC2 running Node.js
* Express server live on public IP
* HTML/CSS UI accessible via browser
* PM2 ensures zero downtime after reboot

---

This setup represents a **production-ready AI_Powered Node.js server deployment workflow**.
