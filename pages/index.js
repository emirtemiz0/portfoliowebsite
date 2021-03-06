import React, {useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'


const Home = () => {
  var aboutContent = null
  var contactContent = null

  useEffect(() => {
    contactContent = document.querySelector('#contact-content')
    aboutContent = document.querySelector('#about-content')
  }, [])

  return (
    <div>
      <Script src='js/winbox.bundle.js'></Script>
      <div className="container">
        <nav>
          <ul>
          <li onClick={() => { 
            new WinBox({ 
              title :'about-me',
              width:'50%',
              height:'50%',
              x:'center',
              y:'center',
              onfocus: function() { 
                this.setBackground('#ff007f')
              },
              onblur: function() { 
                this.setBackground('#999')
              },
              mount: aboutContent,
            })
          }}>/about</li>
          <li
           onClick={() => { 
            new WinBox({ 
              title :'contact-me',
              width:'50%',
              height:'50%',
              x:'center',
              y:'center',
              onfocus: function() { 
                this.setBackground('#ff007f')
              },
              onblur: function() { 
                this.setBackground('#999')
              },
              mount: contactContent,
            })
          }}>/contact</li>
          <li>
            <Link href='/blog' rel="noopener noreferrer">
            /blog
            </Link>
          </li>
          <li>
          <Link href='/project' rel="noopener noreferrer">
            /project
            </Link>
          </li>
          </ul>
        </nav>

        <main>
          <h1>emirtemiz:$<span className="cursor">|</span></h1>
          <ul>
            <li>
              <Link href="/" rel="noopener noreferrer">
              Yotube
              </Link>
            </li>
            <li>
              <Link href="/" rel="noopener noreferrer">
              LinkedIn
              </Link>
            </li>
            <li>
              <Link href="/" rel="noopener noreferrer">
              Github
              </Link>
            </li>
            <li>
              <Link href="/" rel="noopener noreferrer">
              Instagram
              </Link>
            </li>
          </ul>
        </main>
      </div>
      <div className="hidden">
        <div id="about-content">
          <h2>about-me:$<span className="cursor">|</span></h2>
          <p>
            Selam , Ben emir bir y??ld??r yaz??l??mla u??ra????yorum.
          </p>
        </div>

        <div id="contact-content">
        <h2>contact-me:$<span className="cursor">|</span></h2>
          <p>
            ??leti??im i??in bana bu hesaplardan ula??abilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
