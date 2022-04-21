## 34 外部から一度だけデータを取得する SSG を実装する

- `pages/posts/[id].js`を編集<br>

```js:[id].js
import Layout from '../../components/Layout'
import { getAllPostIds } from '../../lib/post'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

// 追加
export const getStaticProps = ({ params }) => {}

export default function Post() {
  return <Layout>動的ルーティング設定</Layout>
}
```
