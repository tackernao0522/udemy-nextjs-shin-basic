import Layout from '../../components/Layout'
import { getAllPostIds } from '../../lib/post'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export default function Post() {
  return (
    <Layout>
      動的ルーティング設定
    </Layout>
  )
}
