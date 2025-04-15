# Take-home technical assignment for web enginner position at company.

## ✒️ Author: Modestas Anilionis

## Intro

Initially this application was created to showcase my skills while applying to company. Unfortunately I did not met their requirements, so I decided to share my knowledge on github for other companies.
Application do not use any 3rd party libaries.

## 🖥️ Preview (deployed application)

I deployed application from my private repository on **Vercel**. You can check it out here: https://infinity-scroll-blond.vercel.app/

## 🛠️ Technical stack:

- Frontend: **React.JS, Vite**
- Tests: **Vitest, React Testing Library**

## 📌 Main features:

- Infinity scroll through images
- Images favouriting and unfavouriting
- Responsive design with 3 breakpoints (mobile, tablet, pc)
- Credits for author (Required by Pexels) (Hidden to match the expected UI)

## 📄 Documentation for install:

1. Clone Repository

   ```bash
   git clone https://github.com/vinted-hw/academy-web-homework-meModiz
   ```

2. Install dependencies **(recommended to use pnpm)**

   ```bash
   pnpm install
   ```

3. Or use npm (not recommended)

   ```bash
   npm install
   ```

4. Setup API Key in local environment:

   1. In project folder _infinity-scrooll_ create `.env.local` file
   2. Setup your API KEY like that (You can get your API at https://www.pexels.com/api/key/):

      ```
      VITE_PEXELS_API_KEY="YOUR_API_KEY"
      ```

- Run & Test Project

  - Run tests

  ```bash
  pnpm test
  ```

  - Start application (dev)

  ```bash
  pnpm dev
  ```

## 📸 Showcase:

<a href="./showcase_screenshots/preview_hover.png"><img src="./showcase_screenshots/preview_hover.png" width="500px"/>
<a href="./showcase_screenshots/preview.png"><img src="./showcase_screenshots/preview.png" width="500px"/>
