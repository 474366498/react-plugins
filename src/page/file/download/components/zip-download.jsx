




import { Button, Image, Input } from "antd"
import { saveAs } from "file-saver"
import  JSZip  from "jszip"
import JSZipUtils from 'jszip-utils'

console.log(111111111,JSZip , new JSZip ,JSZipUtils )
export function JsZipDownload() {
  const files = [
    { name: 'big.jpg', src: 'http://192.168.2.10:8081/static/tender/68fcb2c8dfa442279699ba7612341c64/performance/8ffb11e8ef17498ea60f9ca35e4f9528.jpg' },
    { name: '783293%%44#￥￥&&.jpg', src: 'http://192.168.2.10:8081/static/tender/68fcb2c8dfa442279699ba7612341c64/performance/c3fda867d1ae481b8a7fb136129947c8.jpg' }
  ]
  
  const downloadFile = async () => {
    let imageNames = files.map(file=>file.name)
    let imageUrls = files.map(file => file.src)
    let zip = new JSZip() 
    console.log(20,zip)
    Promise.all(imageUrls.map(getFileContent)).then(contents => {
      contents.forEach((content, i) => {
       zip.file(imageNames[i],content)
      })
      zip.generateAsync({type:'blob'}).then(function (blob) {
        saveAs(blob,'合并.zip')
      })
    })
  },
    getFileContent = (url) => {
      return new JSZip.external.Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
          console.log(27,err , data )
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
    };
  
  return (
    <div className="flex flex-dir-c">
      <h3>js zip 注意文件来源服务器是否开启了跨域</h3>

      <div className="flex flex-jc-sa">
        {files.map(item => (
          <Image width={200} src={item.src + '?' + new Date()} key={item.name} crossOrigin='anonymous' />
        ))}
      </div>
      <div className="flex flex-jc-c">
        <Button.Group>
          <Button type='primary' onClick={downloadFile}>zip 下载</Button>
        </Button.Group>
      </div>
    </div>
  )
}











