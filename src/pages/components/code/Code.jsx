import { useEffect } from 'react';
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

export default function Code({ language, code }) {

    useEffect(() => hljs.highlightAll(), []);

    return (
        <pre>
            <code className={`language-${language}`}>
                {code}
            </code>
        </pre>
    )
}