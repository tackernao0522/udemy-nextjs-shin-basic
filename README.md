## 08 create-next-app

- `$ npx create-next-app udemy-next-basic`を実行<br>

* `node_modules`及び`yarn.lock`を削除<br>

- `package.json`を編集<br>

```json:package.json
{
  "name": "udemy-next-basic",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.1.0",
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  "devDependencies": {
    "eslint": "8.10.0",
    "eslint-config-next": "12.1.0"
  }
}
```

- `$ yarn install`を実行<br>

* localhost:3000 にアクセスしてみる<br>
