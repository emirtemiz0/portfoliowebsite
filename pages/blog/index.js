import React,{useState} from 'react'
import sanityClient from '../../sanity'
import Head from 'next/head'
import SanityBlockContent from '@sanity/block-content-to-react'
import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'

const Blog = ({posts}) => {
  const [blockContent ,setBlockContent] = useState()

  const fetchPostData = async (slug) => {
    const query = `*[_type == "post" && slug.current == $slug]{
      body
    }[0]`
    const singlePost = await sanityClient.fetch(query, { slug })

   setBlockContent(<SanityBlockContent projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
    blocks={singlePost.body}/>)
  }

    return (
      <main className='blog-main'>     
      <Script src='js/winbox.bundle.js'></Script>  
      <section className='post-section'>
        <h1>
          <Link href='/' rel="noopener noreferrer">emirtemiz</Link>
          <span className='cursor'>|</span>blog
        </h1>
        <h3>Recent posts</h3>
        <div className='posts'>
          {posts &&
            posts.map((post) => (
              <article key={post.slug.current}>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    fetchPostData(post.slug.current)
                    new WinBox({
                      title: post.title,
                      background: '#ff007f',
                      x: 'center',
                      y: 'center',
                      height: '70%',
                      width: '70%',
                      mount: document.querySelector('.single-post'),
                    })
                  }}
                  className='post-body'
                >
                  <span className='post-info'>
                    <h3 className='post-category'>
                      {post.categories ? post.categories[0] : 'No category'}
                    </h3>
                    <h3 className='post-title'>{post.title}</h3>
                  </span>
                </span>
              </article>
            ))}
        </div>
      </section>
      <div className='hidden'>
        <div className='single-post'>{blockContent}</div>
      </div>
    </main>
  )
}

export const getServerSideProps = async () => {
    const query = `*[ _type == "post"] | order(_createdAt desc) {
          title,
          slug,
          "categories": categories[] -> title,
          mainImage{
              asset->{
                  _id,
                  url
              },
              alt
          }
      }`

      const posts = await sanityClient.fetch(query)

      if (!posts.length) {
        return {
          props: {
            posts: [],
          }
        }
      } 
       else {
           console.log(posts)
        return {
          props: {
            posts,
          },
        }
      }
    }

    export default Blog