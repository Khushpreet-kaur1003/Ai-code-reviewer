import Prism from "prismjs"
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx" 
import axios from "axios"
import Markdown from "react-markdown"
import './App.css'

function App() {
  const [count, setCount ] = useState(0)
  const[ code, setCode] = useState(`function sum(){return 1+1}`)
const[review, setReview] = useState(``) 
  useEffect(() => { 
    Prism.highlightAll()
  }, [])

  async function reviewCode(){
    const response =await axios.post("http://localhost:3000/ai/get-review", {code})
    console.log("📤 Sent code:", code);   // 👈 yeh print karo
    console.log("📥 Response:", response.data);
    console.log(response.data);
    setReview(response.data)
  } 

  return (<>
    <main>
      <div className="left">
        <div className="code">
         <Editor 
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
          padding= {10}
          style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%"
            }}
          />

        </div>
        <div 
        onClick={reviewCode}        
        className="review">Review</div>
      </div>
      <div className="right">
        <Markdown>
          {review}
        </Markdown>
      </div>
    </main>
    </>
  )
}

export default App
