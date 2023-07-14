
import { createEditor, DomEditor , IDomEditor, IEditorConfig, SlateDescendant } from '@wangeditor/editor'
import React, { Component , useEffect, useRef , useState } from 'react'

interface Props {
  defaultContent?: SlateDescendant[]
  onCreated?: (editor: IDomEditor) => void
  defaultHtml?: string
  value?: string
  onChange: (editor: IDomEditor) => void
  defaultConfig: Partial<IEditorConfig>
  mode?: string
  style?: React.CSSProperties
  className?: string
}

function EditorComponent(props: Props) {
  const {
    defaultContent = [],
    onCreated,
    defaultHtml = '',
    value = '',
    onChange,
    defaultConfig = {},
    mode = 'default',
    style = {},
    className
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<IDomEditor | null>(null)
  const [curValue, setCurValue] = useState('')
  
  useEffect(() => { 
    if (!ref.current) return 
    if (editor) return 
    
    if (ref.current?.getAttribute('data-w-e-textarea')) return 
    

    const handleCreated = (editor: IDomEditor) => {
        if (onCreated) onCreated(editor)
        const { onCreated: onCreatedFromConfig } = defaultConfig
        if(onCreatedFromConfig) onCreatedFromConfig(editor)
      },
      handleChanged = (editor:IDomEditor)=>{
        setCurValue(editor.getHtml())
        if (onChange) onChange(editor)
        const { onChange: onChangeFromConfig } = defaultConfig 
        if(onChangeFromConfig) onChangeFromConfig(editor)
      },
      handleDestroyed = (editor)=>{
        const { onDestroyed } = defaultConfig 
        setEditor(null)
        if (onDestroyed) {
          onDestroyed(editor)
        }
      }
    console.log(59,'editor', defaultConfig)
    const newEditor = createEditor({
      selector: ref.current,
      config: {
        ...defaultConfig,
        onCreated: handleCreated,
        onChange: handleChanged,
        onDestroyed: handleDestroyed 
        
      },
      content: defaultContent,
      html: defaultHtml || value,
      mode
    })
    setEditor(newEditor)
  },[editor])


  return <div style={ style } ref = { ref } className = { className } > </div>
}

export default EditorComponent


// export default class editorComponent extends Component {
//   constructor(props: Props) {
//     super(props)

//   }

// }


