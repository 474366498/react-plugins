



export default function AutoCropPlugin() {
  const onInputChange = (e) => {
     console.log(9, e)
    let files = e.target.files 
    let file = files[0] || null 
    fileToBase(file)
  }
  // 单文件转base64
  function fileToBase(f) {
    if (!f) return 
    console.log(149,f)
    let reader = new FileReader()
    reader.readAsDataURL(f)
    reader.onload = function (e) {
      let b = reader.result
      // setBase64(b) 
      // cropBase64(b)
    }
  }
  return <div className="flex flex-dir-c">
    <p className='flex flex-jc-c'> <a href="https://blog.csdn.net/NuoYan3327/article/details/108798924">JS通过canvas自动裁剪png图片多余的空白部分</a></p>
    <div className='flex flex-jc-c'>
      <input type='file' multiple="true" onChange={ e => onInputChange(e)} />
    </div>
    <div className='flex flex-dir-c'>
      {/* <div><img  src={base64} onLoad={e=>onBase64Load(e)} /> </div>
      <div><img src={newB64} /> </div> */}
      <div id='cropDiv'></div>
    </div>
  </div>
}