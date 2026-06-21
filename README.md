## Demo for Age Estimation Method

https://github.com/user-attachments/assets/5a7436c9-94ab-4661-ace1-f2529bf8c080

## Yoti-GamingApp 

A Next.js application integrating Yoti AVS to verify players are 18+ during registration - It's a registration flow 
where users verify their age using Yoti AVS before they can sign up.

## What it does
- User signs up with username, email and password
- Then they pick how they want to verify their age (face scan, ID, or digital ID)
- Yoti handles the verification and sends them back to a result page
- 
## Prerequisites
- Node.js 18+
- npm
- [ngrok](https://ngrok.com/) account 
- Yoti AVS API Key and SDK ID

## How to run it

You'll need Node.js and an ngrok account

1. Clone the repo and run npm install
   git clone https://github.com/shiivaniiawasthii/Yoti-GamingApp.git
   cd yoti-gaming-app
   npm install

2. You need ngrok because Yoti needs a public URL to redirect back to.
   Run this in a separate terminal:
   ngrok http 3000
   
## Setup ngrok
Yoti needs a public URL to redirect back to after verification, localhost won't work.

Go to ngrok.com, create a free account.

Connect your account:
ngrok config add-authtoken your_ngrok_token_here

Write this command line in a seperate terminal while running the localhost in another:
ngrok http 3000

It will show a URL like https://abc123.ngrok-free.app - copy that.

 Note: every time you restart ngrok you get a new URL, so update your .env each time.

5. Create a .env file and add these:
   NEXT_PUBLIC_YOTI_AVS_API_KEY=your key here
   NEXT_PUBLIC_YOTI_AVS_SDK_ID=your sdk id here
   NEXT_PUBLIC_APP_URL=the https url ngrok gives you

6. Run npm run dev and open localhost:3000

## App Flow
1. **Landing Page** — Enter username, email, password
2. **Verification Page** — Choose Age Estimation / ID Verification / Digital ID
3. **Yoti AVS** — Complete verification on Yoti's platform
4. **Result Screen** — View session status, method used, and timestamp

## Note
I used ngrok because Yoti's callback couldn't reach localhost directly. 
The app URL in .env needs to be the ngrok one for the redirect to work after verification



