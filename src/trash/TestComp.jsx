import { useEffect } from 'react';
import "highlight.js/styles/a11y-dark.css";
import hljs from "highlight.js";


const lang = 'python';
const code = `
    print() 
`

export default function TestComp() {

    useEffect(() => hljs.highlightAll(), []);

    return <pre><code className={`language-${lang}`}>{code}</code></pre>
}