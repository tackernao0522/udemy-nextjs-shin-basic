## 26 マークダウン解析のためのライブラリを作成する

- `$ mkdir lib && tuoch $_/post.js`を実行<br>

* `lib/post.js`を編集<br>

```js:post.js
import path from 'path'
import fs from 'fs'

const postsDirectory = path.join(process.cwd(), 'posts')

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '') // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.joun(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  })
}
```

- `$ npm i matter`を実行<br>

* `lib/post.js`を編集<br>

```js:post.js
import path from 'path'
import fs from 'fs'
import matter from 'matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// mdファイルのデータを取り出す
export const getPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '') // ファイル名(id)

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.joun(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    // idとデータを返す
    return {
      id,
      ...matterResult,
    }
  })
}
```
