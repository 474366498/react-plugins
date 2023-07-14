import { SaveFilePicker } from "./components/save-file-picker-download"
import { FileSaverDownload } from './components/file-saver'
import { JsZipDownload } from './components/zip-download'
import {BigFileDownload} from './components/big-file-download'
function DownloadFile() {
  const filesList = [
      {name:'nodejs.rar' , src:'https://yy2.guiren21.com/201611/books/Node.jsqwzn_jb51.rar' } ,
      {name:'宣传资料' , src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2020-04-13/f7fcc50756a54ff1bb9d83504c8e094b.mp4' } ,
      {name:'成都北湖礼宴中心.rar',src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/9f68269d7e0d4823aa3d96db86d43f29.rar'},
      {name:'783293%%44#￥￥&&.jpg',src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg'},
      {name:'内江市公安局市中区分局业务技术用房及救灾物资储备库项目竣工结算审核服务采购项目.doc',src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/7099b7fefd4a43759ad33e99e02e8009.doc'},
      {name:'竣工报告-副本.pdf',src:'http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/1190c4f116c24c1bb25850f3ee00e214.pdf'}
  ]

  return (
    <section className="flex flex-dir-c">
      <p>
        <a href="https://juejin.cn/post/6989413354628448264#heading-8" target="__self">文件下载,搞懂这9种场景就够了</a>
        <a href="https://juejin.cn/post/7148832320277987342#heading-3" target="__self">前端文件上传和下载</a>
      </p>
      <p>https://yy2.guiren21.com/201611/books/Node.jsqwzn_jb51.rar  148M 左右 </p>
      <div className="flex flex-dir-c">
        <p>
          <a onClick={e => window.open('http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/72f1ef2237bd416687976abff229b5f5.xls')}> 1. window.open(address,'_self') <em> 这种方式在所有浏览器中(fireFox chrome edge ) 都可以下载(浏览器支持预览的则打开新标签页面),并且还会出现下载提示组件(浏览器自带的)</em>  </a>
        </p>
        <p>
          <a href='http://zcfile.cdxyun.cn/UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/9f68269d7e0d4823aa3d96db86d43f29.rar' download='成都北湖礼宴中心.rar'> 2. a标签(download)+href<em>
          这种方式在所有浏览器中(fireFox chrome edge ) 都可以下载(浏览器支持预览的则跳转到文件预览),并且还会出现下载提示组件(浏览器自带的) </em></a>
        </p>
        <SaveFilePicker />
        
        <FileSaverDownload />

        <JsZipDownload />
        <BigFileDownload /> 
      </div>
      download files
    </section>
  )
}
/* http://zcfile.cdxyun.cn/  
UploadFilesZCJD/UploadFiles/officepublicfiles/2020-04-13/f7fcc50756a54ff1bb9d83504c8e094b.mp4  宣传资料
 UploadFiles/officefile/20190604/20190604170827634.mp4 中文视频
UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/9f68269d7e0d4823aa3d96db86d43f29.rar 成都北湖礼宴中心.rar

UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg','783293%%44#￥￥&&.jpg
[
  {name:'宣传资料' , src:'UploadFilesZCJD/UploadFiles/officepublicfiles/2020-04-13/f7fcc50756a54ff1bb9d83504c8e094b.mp4' } ,
  {name:'成都北湖礼宴中心.rar',src:'UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/9f68269d7e0d4823aa3d96db86d43f29.rar'},
  {name:'783293%%44#￥￥&&.jpg',src:'UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/8c7a5b5bb9474471b7715ba7f020b9ac.jpg'},
  {name:'内江市公安局市中区分局业务技术用房及救灾物资储备库项目竣工结算审核服务采购项目.doc',src:'UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/7099b7fefd4a43759ad33e99e02e8009.doc'},
  {name:'竣工报告-副本.pdf',src:'UploadFilesZCJD/UploadFiles/officepublicfiles/2023-04-23/1190c4f116c24c1bb25850f3ee00e214.pdf'}
]
 
*/

export default DownloadFile
