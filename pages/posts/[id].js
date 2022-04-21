import Layout from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/post'

export const getStaticPaths = () => {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.date}
      <br />
      {postData.blogContentHTML}
    </Layout>
  )
}
