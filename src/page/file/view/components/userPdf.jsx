


import { useEffect , useState , useRef} from 'react'

import { Button ,Input } from 'antd' 

import { LeftOutlined ,
RightOutlined ,
ZoomInOutlined ,
RedoOutlined ,
ZoomOutOutlined} from '@ant-design/icons'

import * as PDF from 'pdfjs-dist'
new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url 
).toString()

function UserPdf({file}) {
  console.log(file, PDF)
  var pdfObj = null, _pdfInfo = {
    pages: 0,
    page: 1,
    pdfCtx: null,
    scale: 1
  };
  const c = useRef('canvas') , d = useRef('div')
  const [pdfInfo, setPdfInfo] = useState({ ..._pdfInfo }) // pdfjs 转pdf文件 后的pdf信息
  const [pdfSize, setPdfSize] = useState(280)      // pdf canvas 设置大小(宽度)
  const [pageText, setPageText] = useState(null)  // 当前页码下的文字内容
  useEffect(() => {
    console.log(17,)
    resolvePdf()
  }, [file])
  
  // 初加载
  const resolvePdf = () => {
    const loadingTask = PDF.getDocument(file)
    loadingTask.promise.then(pdf => {
      console.log(23, pdf)
      _pdfInfo.pdfCtx = pdf 
      pdfObj = pdf 
      _pdfInfo.pages = pdf.numPages 
      setPdfInfo({ ..._pdfInfo })

      pdf.getPage(_pdfInfo.page).then(P => {
        console.log(35, c, P)
        canvasDraw(P) 
      })
    }).catch(error => {
      console.log(52,error)
    })
  },
    renderPdf = (page) => {
      console.log('reset', page)
      if (pdfInfo.pdfCtx) {
        pdfInfo.pdfCtx.getPage(page).then(P => {
          canvasDraw(P) ;
        })
      }
    },
    
    canvasDraw = (pageInfo) => {
      const canvas = document.createElement('canvas'), div = d.current, divP = div.parentNode;
      const ctx = canvas.getContext('2d')
      const viewport = pageInfo.getViewport({ scale: 1 })
      canvas.width = viewport.width
      canvas.height = viewport.height

      let width = viewport.width > pdfSize ? pdfSize : viewport.width // 1000 / 280
      canvas.style.width = width + 'px' 
      canvas.style.height = viewport.height / viewport.width * width + 'px'

      div.style.width = width + 'px' 
      div.style.height = viewport.height / viewport.width * width + 'px'
      let oldCanvas = divP.querySelector('canvas')
      console.log(77, oldCanvas)
      if (oldCanvas) {
        divP.removeChild(oldCanvas)
      }
      divP.insertBefore(canvas, div)
      
      console.log(38,canvas , ctx,viewport)
      getPageText(pageInfo , [viewport.width , viewport.height])
      pageInfo.render({
        canvasContext: ctx,
        viewport
      })
    },
    getPageText = (pageInfo,pageSize) => {
      pageInfo.getTextContent().then(T => {
        console.log(54, pageSize, T)  
        let info = {
          items: [],
          style : Object.create({}) 
        }
        if (T.items && T.items.length > 0) {
          let stylesKey = Object.keys(T.styles)
          // console.log(99,stylesKey)
          if (stylesKey.length == 1) {
            for (let k in T.styles[stylesKey[0]]) {
              // console.log(102, k , T.styles[stylesKey[0]][k])
              info.style[k] = T.styles[stylesKey[0]][k]
            }
          }
          T.items.forEach(item => {
            let transform = item.transform
            item.left = transform[4] / pageSize[0] * 100 + '%' 
            item.top = (pageSize[1] - transform[5]) / pageSize[1] * 100 + '%'
            info.items.push(item)
          })
          // console.log(100,info)
          // items 中的 transform 前4位 应该是pdf页面四边的距离 后两位是坐标 xy位置
          setPageText(info)
        } else {
          console.log(118, '没有items')
          setPageText(null)
        }
      })
    }

  const onChangePageNumber = flg => {
    console.log(62, flg, _pdfInfo, pdfInfo)
    let info = Object.assign({},{...pdfInfo})
    let page = pdfInfo.page
    let _page
    if (flg) {
      if (page < pdfInfo.pages) {
        _page = page + 1 
      } else {
        _page = pdfInfo.pages
      }
      info.page = _page 
    } else {
      if (page > 1) {
        _page = page - 1
      } else {
        page = 1
      }
      info.page = _page 
    }
    console.log(87,info)
    setPdfInfo({ ...info })
    renderPdf(_page)
  },
  onInputPageNumber = e => {
    console.log(65,e)
  } ,
    onChangePageSize = flg => {
    
  },
    onResetPageSize = () => {
    
  }
  return (
    <div className='flex flex-dir-c'>
      <h4> UserPdf 自己动手 user pdf  <a target='_blank' href="https://www.npmjs.com/package/pdfjs-dist?activeTab=code"> npm pdfjs-dist</a> <a target='_blank' href="https://github.com/mozilla/pdf.js">github pdfjs</a>  </h4>
      <div className='flex flex-jc-c flex-ai-c'>
        <Button onClick={e=>onChangePageNumber(false)} icon={ <LeftOutlined /> }></Button> &nbsp;
        <Input style={{ display: 'inline-flex', width: '80px' }} value={pdfInfo.page} maxLength='4' onChange={e => onInputPageNumber(e)} /> &nbsp;
        <span>&nbsp;{ pdfInfo.pages } &nbsp;</span>
        <Button onClick={e=>onChangePageNumber(true)} icon={<RightOutlined />}></Button>&nbsp;
        {/* <Button.Group>
          <Button onClick={e => onChangePageSize(true)} icon={< ZoomInOutlined />}></Button>
          <Button onClick={ onResetPageSize} icon={ <RedoOutlined /> }></Button>
          <Button onClick={e=>onChangePageSize(false)} icon={< ZoomOutOutlined />  }></Button>
        </Button.Group> */}
        &nbsp;
      </div>
      <div>
        {/* {pdfInfo && pdfInfo.pdfCtx  ? pdfInfo.pdfCtx:'null'}  */}
        {/* {pageText?.styles?.g_d1_f1} */}
        <canvas ref={c} > </canvas>
      
        <div ref={d} className='page-text-info' style={{visibility:'hidden'}} >
          {
            pageText && pageText.items && pageText.items.length > 0
              ? pageText.items.map((item,i) => (<span style={{ left: item.left, top: item.top }} key={ i }>{ item.str }</span>))
              : null
          }
        </div>
          
      </div>
    </div>
  )
}
export default UserPdf;


// 14.031, 0, 0, 13.9977, 43.1997, 582.6295         14.031, 0, 0, 13.9977, 105.55346400000002, 582.6295
// 71.83872000000001                                // 14.031
// left: 7.38%; top: 26.79%;                        left: 18.02%; top: 26.79%;
// 280 388
// 585 812 
// 20                                               50.4