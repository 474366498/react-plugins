import BuriedPoint from './base/buriedPoint'
import WebWorker from './base/webWorker'
import Encrypt from './base/encrypt'
import UserIcon from './base/userIcon'

import FileUpload from './file/upload'
import BigFile from './file/big'
import DownloadFile from './file/download'
import FileView from './file/view'
import FilePrint from './file/print'
import ImgEdit from './file/imgEdit'
import AutoCrop from './file/AutoCrop'


import MultiMedia from './media/multimedia'
import MusicPlayer from './media/musicPlayer'
import MoviePlayer from './media/moviePlayer'

import TinymceEditor from './editor/tinymce'
import WangEditor from './editor/wangEditor'
import CkEditorReact from './editor/ckeditor'
import DraftEditor from './editor/draft'
import QuillEditor from './editor/quill'

import BMap from './map/bMap'
import TxMap from './map/tMap'
import GdMap from './map/gdMap'

import VirtualList from './package/virtual'

import WebLive from './other/webLive'


export const pageMap = new Map([
  ['buriedPoint', <BuriedPoint />],
  ['webWorker', <WebWorker />],
  ['encrypt', <Encrypt />],
  ['userIcon', <UserIcon />],

  ['upload', <FileUpload />],
  ['bigFile', <BigFile />],
  ['download', <DownloadFile />],
  ['fileView', <FileView />],
  ['filePrint', <FilePrint />],
  ['imgEdit', <ImgEdit />],
  ['autoCrop', <AutoCrop />],

  ['multimedia', <MultiMedia />],
  ['useMusicPlayer', <MusicPlayer />],
  ['moviePlayer', <MoviePlayer />],

  ['tinymceEditor', <TinymceEditor />],
  ['wangEditor', <WangEditor />],
  ['CKEditor', <CkEditorReact />],
  ['DraftJs', <DraftEditor />],
  ['quill', <QuillEditor />],


  ['bMap', <BMap />],
  ['tMap', <TxMap />],
  ['gdMap', <GdMap></GdMap>],

  ['virtual', <VirtualList />],



  ['webLive', <WebLive />],
])


