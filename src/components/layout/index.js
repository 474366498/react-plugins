

import Header from "../header"
import Main from '../main'
import { Footer } from "../footer"

function Layout() {
  return (
    <section id='app' className='flex flex-dir-c '>
      <Header />
      <Main />
      <Footer />
    </section>

  )
}

export default Layout 
