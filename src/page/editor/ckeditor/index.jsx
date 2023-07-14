
import React, { Component , useState } from 'react' 

import { CKEditor , CKEditorContext  } from '@ckeditor/ckeditor5-react'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import './editor.css'

function CkEditorReact() {
  const [data, setData] = useState(`<p>Hello from CKEditor 5!</p>`)
  const [editor, setEditor] = useState(null)
  
  const editorConfig = {
    // plugins: [ Paragraph, Bold, Italic, Essentials ],
    toolbar: [ 'bold', 'italic' ]
  }

  const onEditFocus = (env,edit) => {
      console.log('focus',env,edit)
    },
    onEditBlur = (env,edit) => {
      console.log('blur',env,edit)
    },
    onEditChange =( env,edit) => {
      console.log('change',env,edit)
    }

  return (
    <div className="flex flex-dir-c flex-ai-c">
      <div>CkEditorReact CKEditor 太难用了....</div>
      <div className="flex flex-jc-sa" style={{ width: '100%' }}>
        <CKEditor
          editor={ClassicEditor}
          data={data}
          onReady={editor => setEditor(editor)}
          onChange={(env,edit) => onEditChange(env,edit)}
          onFocus={(env,edit)=> onEditFocus(env,edit) }
          onBlur ={ (env,edit) => onEditBlur(env,edit) }
        />
      </div>
    </div>
  )
}
// "sass-loader": "^7.3.1",
export default CkEditorReact



