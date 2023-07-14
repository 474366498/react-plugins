
import $ from 'jquery'

function PptxView({ path }) {
  let url = `http://127.0.0.1:3000/` + path
  console.log(6, $)
  // $("#ppt").pptxToHtml({
  //   pptxFileUrl: url,
  //   slidesScale: "50%",
  //   slideMode: false,
  //   keyBoardShortCut: false
  // })
  return (
    <div> pptx view
      <code>
        <p>d3.min.js</p>
        <p>div2slides.js </p>
        <p>filereader.js</p>
        <p>jquery-ui</p>
        <p>jquery</p>
        <p>jszip</p>
        <p>nv.d3.js</p>
        <p>pptx.js</p>
      </code>
      <div id='ppt'></div>
    </div>
  )
}

export default PptxView