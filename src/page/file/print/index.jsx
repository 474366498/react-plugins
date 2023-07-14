

import { useRef } from "react"
import { Button } from "antd"
import printJS from "print-js"
import Print from 'react-print-html'
// import 'print-js/dist/print.css'

function FilePrint() {
  const printDom = useRef('print-dom')

  const printTypes = [
    { key: 'html' },
    { key: 'header-html' },
    { key: 'pdf' },
    { key: 'big-pdf' },
    { key: 'base-pdf' },
    { key: 'image' },
    { key: 'images' },
    { key:'json' } ,
    { key: 'json-style' },
    {key:'plugin-print'}
  ]
  const onTapButton = key => {
    console.log(15, key)
    switch (key) {
      case 'pdf':
        printJS('files/4.pdf')
        break;
      case 'big-pdf':
        printJS({
          printable: 'files/node.pdf',
          type: 'pdf',
          showModal : true 
        })
        break;
      case 'base-pdf':
        base64Pdf()
        break;
      case 'html':
        printJS({ printable: 'printJS-form', type: 'html' })
        break;
      case 'header-html':
        printJS({
          printable: 'printJS-form',
          type: 'html',
          header:'自定义表头'
        })
        break;
      case 'image':
        printJS('/logo512.png', 'image')
        break;
      case 'images':
        printJS({
          printable: ['/logo512.png', '/logo192.png'],
          type: 'image',
          header:'多张图片'
        })
        break;
      case 'json':
        printJS({
          printable: printTypes,
          type: 'json',
          properties :['key']
        })
        break;
      case 'json-style':
        printJS({
          printable: printTypes,
          type: 'json',
          properties: ['key'],
          gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
          gridStyle: 'border: 2px solid #3971A5;'
        })
        break;
      case 'plugin-print':
        Print(
          printDom.current,
          { type: 'window' }  // window iframe
        )
        break;
      default:
        break;
    }
    // Retrieving Document...
  },
    base64Pdf = () => {
      fetch('https://printjs.crabbly.com/docs/base64.txt')
        .then(response => response.text().then(base => {
          console.log(40, base)
          printJS({
            printable: base,
            type: 'pdf',
            base64 : true 
          })
        }))
      /*
      let xhr = new XMLHttpRequest()
      xhr.open('get', 'http://192.168.2.100:3000/files/node.pdf')
      xhr.responseType = 'blob'
      xhr.onload = function () {
        let blob = xhr.response 
        console.log(53, xhr,blob) 
        blob.text().then(t => {
          console.log(55,t)
        }).catch(err => {
          console.log(err)
        })
        let reader = new FileReader() 
        reader.readAsDataURL(blob)
        reader.onload = function (e) {
          let base64 = reader.result 
          console.log(47, base64.slice(0,100))
          printJS({
            printable: base64,
            type: 'pdf',
            base64 : true 
          })
        }
      }
      xhr.send() 
      */
      
  }
  return (
    <div className="flex flex-dir-c flex-ai-c">
      <div>
        <a target='_blank' href="https://www.npmjs.com/package/print-js"> npm print-js </a>
        <a target='_blank' href="https://printjs.crabbly.com/"> print-js 例子</a>
        <a href="https://www.npmjs.com/package/react-print-html?activeTab=readme" target='_blank'>npm react-print-html</a>
      </div>
      <div className="print-buttons">
        <Button.Group>
          {printTypes.map(item => (
            <Button onClick={e => onTapButton(item.key)} key={item.key}>{ item.key}</Button>
          ))}
        </Button.Group>
      </div>
      <div className='print-div' ref={printDom}>
        <section id="header" className="dark">
          <header>
            <h1>Print.js</h1>
            <p>A tiny javascript library to help printing from the web.</p>
          </header>
          <footer>
            <a href="#download" download="print.js" className="button scrolly">Download v1.5.0</a>
          </footer>
        </section>

        <section className="main" id="pdf">
          <div className="content">
            <div className="container">
              <section>
                <h2>PDF Printing</h2>
                <p>Print.js was primarily written to help us print PDF files directly within our apps, without leaving the interface, and no use of embeds. For unique situations where there is no need for users to open or download the PDF files, and instead, they just need to print them.</p>
                <p>One scenario where this is useful, for example, is when users request to print reports that are generated on the server side. These reports are sent back as PDF files. There is no need to open these files before printing them. Print.js offers a quick way to print these files within our apps.</p>
              </section>

              <section className="in-link light">
                <blockquote>PDF files must be served from the same domain as your app is hosted under. Print.js uses iframe to load files before printing them, therefore, it is limited by the <a href="https://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">Same Origin Policy</a>. This helps preventing <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank">Cross-site scripting</a> (XSS) attacks.</blockquote>
              </section>
            </div>
          </div>


          <div className="content dark style5">
            <div className="container">
              <section>
                <h2>Example</h2>

                <p>Add a button to print a PDF file located on your hosting server:</p>
    pdf code 
    <pre><code data-language="html">
    &lt;button type="button" onclick="printJS('docs/printjs.pdf')"&gt;
        Print PDF
    &lt;/button&gt;

    </code></pre>

                <p>Result:</p>
                <button type="button" onclick="printJS('docs/printjs.pdf')">
                  Print PDF
                </button>

              </section>

              <section>
                <p>Result:</p>
                <button type="button" onclick="printJS({printable:'docs/large_printjs.pdf', type:'pdf', showModal:true})"  >
                  Print Large PDF ( 5mb file )
                </button>
                <button type="button" onclick="printJS({printable:'docs/x_large_printjs.pdf', type:'pdf', showModal:true})"  >
                  Print Extra Large PDF ( 16mb file )
                </button>
              </section>

              <section>
                <p>The library supports base64 PDF printing:  pdf code   </p>
                <p>Result:</p>
                <button type="button" onclick="printPdfBase64()"  >
                  Print base64 PDF
                </button>
              </section>
            </div>
          </div>
        </section>


        <section className="main" id="html">
          <div className="content">
            <div className="container">
              <section>
                <header>
                  <h2>HTML Printing</h2>
                </header>
                <p>Sometimes we just want to print selected parts of a HTML page, and that can be tricky. With Print.js, we can easily pass the id of the element that we want to print. The element can be of any tag, as long it has a unique id. The library will try to print it very close to how it looks on screen, and at the same time, it will create a printer friendly format for it.</p>
              </section>
            </div>
          </div>


          <div className="content dark style5">
            <div className="container">
              <section>
                <header>
                  <h2>Example</h2>
                  <p>Add a print button to a HTML form:</p>
                </header>
                <p>Result:</p>

                <form method="post" action="#" id="printJS-form">
                  <div  >
                    <div  >
                      Name:
                      <input type="text" name="name" id="name" value="John Doe" placeholder="Name" />
                    </div>
                    <div  >
                      Email:
                      <input type="text" name="email" id="email" value="john@doe.com" placeholder="Email" />
                    </div>
                  </div>
                  <div>
                    <div>
                      Message:
                      <textarea name="message" id="message" placeholder="Message">Print HTML Elements</textarea>
                    </div>
                  </div>
                </form>

                


                <p>Print.js accepts an object with arguments. Let's print the form again, but now we will add a header to the page:</p> 
                            <p>Result:</p>

                <button type="button" onclick="printJS({ printable: 'printJS-form', type: 'html', header: 'PrintJS - Form Element Selection', css: ['/assets/css/main.css?v1'] })">
                  Print Form with Header
                </button>

              </section>
            </div>
          </div>
        </section>

 
        <section className="main" id="image">
            <div className="content">
                <div className="container">
                    <section>
                        <header>
                            <h2>Image Printing</h2>
                        </header>
                        <p>Print.js can be used to quickly print any image on your page, by passing the image url. This can be useful when you have multiple images on the screen, using a low resolution version of the images. When users try to print the selected image, you can pass the high resolution url to Print.js.</p>
                    </section>
                </div>
            </div>

            <div className="content dark style5">
                <div className="container">
                    <section>
                        <header>
                            <h2>Example</h2>
                        </header>

                        <p>Load images on your page with just the necessary resolution you need on screen:</p>

<pre><code data-language="html">
 &lt;img src="images/print-01.jpg" /&gt;

</code></pre>

                        <p>In your javascript, pass the highest resolution image url to Print.js for a better print quality:</p>

<pre><code data-language="generic">
 printJS('images/print-01-highres.jpg', 'image')

</code></pre>

                        <p>Result:</p>

                        <div className="imgGallery">
                            <div>
                                <div>
                                    <img src="images/print-01.jpg" alt="" />
                                    <a href="#" onclick="printJS('images/print-01-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                                <div>
                                    <img src="images/print-02.jpg" />
                                    <a href="#" onclick="printJS('images/print-02-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                                <div>
                                    <img src="images/print-03.jpg" />
                                    <a href="#" onclick="printJS('images/print-03-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src="images/print-04.jpg" />
                                    <a href="#" onclick="printJS('images/print-04-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                                <div>
                                    <img src="images/print-05.jpg" />
                                    <a href="#" onclick="printJS('images/print-05-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                                <div>
                                    <img src="images/print-06.jpg" />
                                    <a href="#" onclick="printJS('images/print-06-highres.jpg', 'image');return false;">
                                        <i className="fa fa-print"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </section>

					<section>
						<blockquote>Print.js uses promises to make sure the images are loaded before trying to print. This is useful when printing high resolution images that are not yet loaded, like the example above.</blockquote>
					</section>

					<section>
						<p>You can also add a header to the image being printed:</p> 

					<div>
						<p>Result:</p>
						<button onclick="printJS({printable: 'images/print-01-highres.jpg', type: 'image', header: 'My cool image header'});return false;">
							Print Image With Header
						</button>
					</div>
					</section>

					<section>
						<p>To print multiple images together, we can pass an array of images. We can also pass the style to be applied on each image:</p> 

						<div>
							<p>Result:</p>
							<button onclick="printJS({printable: ['images/print-01-highres.jpg', 'images/print-02-highres.jpg', 'images/print-03-highres.jpg'], type: 'image', header: 'Multiple Images', imageStyle: 'width:50%;margin-bottom:20px;'});return false;">
								Print Multiple Images
							</button>
						</div>
					</section>
                </div>
            </div>
        </section>

 
        <section className="main" id="json">
          <div className="content">
            <div className="container">
              <section>
                <header>
                  <h2>JSON Printing</h2>
                </header>
                <p>A simple and quick way to print dynamic data or array of javascript objects.</p>
              </section>
            </div>
          </div>
        </section>
			

        <section className="main" id="docs">
          <div className="content download">
            <div className="container" id="download">
              <section>
                <header>
                  <h2>Download and Install</h2>
                </header>
                <p>You can download the latest version of Print.js from the GitHub releases.</p>
                <p  >
                  <a href="https://github.com/crabbly/Print.js/releases/tag/v1.5.0" className="button">Download v1.5.0</a>
                </p>

                <p>To install using npm:</p> 

                <p>To install using yarn:</p> 

                <p>When installing via npm or yarn, import the library into your project:</p>
    
      
                <p id="cdn">CDN is also available, thanks to <a href="https://www.keycdn.com" target="_blank">KeyCDN:</a></p> 

                <h2 id="documentation">Getting Started</h2>
                <p>First we need to include the Print.js library on the page.</p>

                <p>That's it. You can now use Print.js in your pages.</p>
                <p>When writing your javascript code, remember that the library occupies a global variable of <code>printJS</code>.</p>

                <h2>Using Print.js</h2>
                <p>There are four print document types available: <code>'pdf'</code>, <code>'html'</code>, <code>'image'</code> and <code>'json'</code>.</p>
                <p>The default type is <code>'pdf'</code>.</p>
                <p>It's basic usage is to call <code>printJS()</code> and just pass in a PDF document url: <code>printJS('docs/PrintJS.pdf')</code>.</p>
                <p>For image files, the idea is the same, but you need to pass a second argument: <code>printJS('images/PrintJS.jpg', 'image')</code>.</p>
                <p>To print HTML elements, in a similar way, pass in the element id and type: <code>printJS('myElementId', 'html')</code>.</p>

                <h2 id="configuration">Configuration</h2>
                <p>Print.js will accept an object as argument, where you can configure some options:</p>
                <div className="grid">
                  <div className="grid-row"  >
                    <div className="g1">Argument</div>
                    <div className="g1">Default Value</div>
                    <div className="g2">Description</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">printable</div>
                    <div className="g1">null</div>
                    <div className="g2">Document source: pdf or image url, html element id or json data object.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">type</div>
                    <div className="g1">'pdf'</div>
                    <div className="g2">Printable type. Availble print options are: pdf, html, image, json and raw-html.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">header</div>
                    <div className="g1">null</div>
                    <div className="g2">Optional header to be used with HTML, Image or JSON printing. It will be placed on the top of the page. This property will accept text or raw HTML.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">headerStyle</div>
                    <div className="g1">'font-weight: 300;'</div>
                    <div className="g2">Optional header style to be applied to the header text.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">maxWidth</div>
                    <div className="g1">800</div>
                    <div className="g2">Max document width in pixels. Change this as you need. Used when printing HTML, Images or JSON.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">css</div>
                    <div className="g1">null</div>
                    <div className="g2">This allow us to pass one or more css files URLs that should be applied to the html being printed. Value can be a string with a single URL or an array with multiple URLs.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">style</div>
                    <div className="g1">null</div>
                    <div className="g2">This allow us to pass a string with custom style that should be applied to the html being printed.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">scanStyles</div>
                    <div className="g1">true</div>
                    <div className="g2">When set to false, the library will not process styles applied to the html being printed. Useful when using the <code>css</code> parameter.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">targetStyle</div>
                    <div className="g1">null</div>
                    <div className="g2">By default, the library process some styles only, when printing HTML elements. This option allows you to pass an array of styles that you want to be processed. Ex.: ['padding-top', 'border-bottom']</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">targetStyles</div>
                    <div className="g1">null</div>
                    <div className="g2">Same as `targetStyle`, however, this will process any a range of styles. Ex.: ['border', 'padding'], will include 'border-bottom', 'border-top', 'border-left', 'border-right', 'padding-top', etc. <br/>You can also pass ['*'] to process all styles.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">ignoreElements</div>
                    <div className="g1">[ ]</div>
                    <div className="g2">Accepts an array of html ids that should be ignored when printing a parent html element.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">properties</div>
                    <div className="g1">null</div>
                    <div className="g2">Used when printing JSON. These are the object property names.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">gridHeaderStyle</div>
                    <div className="g1">'font-weight: bold;'</div>
                    <div className="g2">Optional style for the grid header when printing JSON data.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">gridStyle</div>
                    <div className="g1">'border: 1px solid lightgray; margin-bottom: -1px;'</div>
                    <div className="g2">Optional style for the grid rows when printing JSON data.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">repeatTableHeader</div>
                    <div className="g1">true</div>
                    <div className="g2">Used when printing JSON data. When set to <code>false</code>, the data table header will show in first page only.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">showModal</div>
                    <div className="g1">null</div>
                    <div className="g2">Enable this option to show user feedback when retrieving or processing large PDF files.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">modalMessage</div>
                    <div className="g1">'Retrieving Document...'</div>
                    <div className="g2">Message displayed to users when <code>showModal</code> is set to <code>true</code>.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">onLoadingStart</div>
                    <div className="g1">null</div>
                    <div className="g2">Function to be executed when PDF is being loaded</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">onLoadingEnd</div>
                    <div className="g1">null</div>
                    <div className="g2">Function to be executed after PDF has loaded</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">documentTitle</div>
                    <div className="g1">'Document'</div>
                    <div className="g2">When printing html, image or json, this will be shown as the document title.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">fallbackPrintable</div>
                    <div className="g1">null</div>
                    <div className="g2">When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. This allow you to pass a different pdf document to be opened instead of the original passed in `printable`. This may be useful if you inject javascript in your alternate pdf file.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">onPdfOpen</div>
                    <div className="g1">null</div>
                    <div className="g2">When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. A callback function can be passed here, which will be executed when this happens. It may be useful in some situations where you want to handle your print flow, update user interface, etc.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">onPrintDialogClose</div>
                    <div className="g1">null</div>
                    <div className="g2">Callback function executed once the browser print dialog is closed.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">onError</div>
                    <div className="g1">error =&gt; throw error</div>
                    <div className="g2">Callback function to be executed when an error occurs.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">base64</div>
                    <div className="g1">false</div>
                    <div className="g2">Used when printing PDF documents passed as base64 data.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">honorMarginPadding <span className="hint--top" aria-label="Use targetStyles, targetStyle, css or style parameters instead" >(deprecated <i className="fa fa-info-circle"></i>)</span></div>
                    <div className="g1">true</div>
                    <div className="g2">This is used to keep or remove padding and margin from elements that are being printed. Sometimes these styling settings are great on screen but it looks pretty bad when printing. You can remove it by setting this to false.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">honorColor <span className="hint--top" aria-label="Use targetStyles, targetStyle, css or style parameters instead" >(deprecated <i className="fa fa-info-circle"></i>)</span></div>
                    <div className="g1">false</div>
                    <div className="g2">To print text in color, set this property to true. By default all text will be printed in black.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">font <span className="hint--top" aria-label="Use css or style parameters instead" >(deprecated <i className="fa fa-info-circle"></i>)</span></div>
                    <div className="g1">'TimesNewRoman'</div>
                    <div className="g2">Typeface used when printing HTML or JSON.</div>
                  </div>
                  <div className="grid-row">
                    <div className="g1">font_size <span className="hint--top" aria-label="Use css or style parameters instead"  >(deprecated <i className="fa fa-info-circle"></i>)</span></div>
                    <div className="g1">'12pt'</div>
                    <div className="g2">Font size used when printing HTML or JSON.</div>
                                </div>
                  <div className="grid-row">
                    <div className="g1">imageStyle <span className="hint--top" aria-label="Use css or style parameters instead" >(deprecated <i className="fa fa-info-circle"></i>)</span></div>
                    <div className="g1">'width:100%;'</div>
                    <div className="g2">Used when printing images. Accepts a string with custom styles to be applied to each image.</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>


        <section id="footer">
          <ul className="icons">
            <li><a href="https://twitter.com/crabbly" className="icon fa-twitter" target="_blank"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li> 
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li> 
            <li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li> 
            <li><a href="https://github.com/crabbly/Print.js" className="icon fa-github"><span className="label">GitHub</span></a></li>
          </ul>
          <div className="copyright">
            <ul className="menu">
              <li>© 2020 Crabbly</li><li>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank">MIT License</a></li><li>HTML Template by <a href="https://html5up.net" target="_blank">HTML5 UP</a></li><li>CDN by <a href="https://www.keycdn.com/" target="_blank">KeyCDN</a></li>
            </ul>
          </div>
        </section>
 
        <a href="https://github.com/crabbly/print.js" className="github-corner">
          {/* <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" className="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path></svg> */}
        </a>
	
      </div>
    </div>
  )
}

export default  FilePrint
