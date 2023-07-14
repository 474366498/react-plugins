
import ReactTinymce from './react-tinymce'
import UseTinymce from './use-tinymce'


function TinymceEditor() {
  
  return (
    <div className="flex flex-dir-c flex-ai-c">
      <div> Tinymce~Editor <a href="http://tinymce.ax-z.cn/integrations/integrate-index.php">中文文档</a> <a href="https://www.tiny.cloud/docs/">英文文档</a> <a href="https://www.wenjiangs.com/doc/media">tinymce帮助文档</a> <a href="https://blog.csdn.net/qq_46380656/article/details/117282921">tinymce 上传本地视频 </a></div>
      <div className="flex flex-jc-sa" style={{width:'100%'}}>
        <ReactTinymce />
        <UseTinymce />
      </div>
    </div>
  )
}

export default TinymceEditor



