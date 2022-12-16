import { useNewQuestionContext } from '../NewQuestionPage';
import { useRef } from 'react'

export default function QuestionCode() {

    const contentEditable = useRef(null);

    const { postInfo, updatePostInfo } = useNewQuestionContext()

    const handleCode = ({ target }) => {
        updatePostInfo('questionCode', target.value);
        // const control = contentEditable.current.scrollHeight > contentEditable.current.clientHeight; 
        // contentEditable.current.style.overflowY = control ? 'scroll' : 'hidden'
    }


    return (
        <div className="question-code">
            <lable>Code</lable>
            <textarea 
            className="main-textarea code"
            value={postInfo.questionCode}
            onChange={handleCode}
            rows={7}
            ></textarea>
            
            {/* <ContentEditable
                innerRef={contentEditable}
                html={postInfo.questionCode}
                disabled={false}
                onChange={handleCode}
                tagName='pre'
                className='code'
            /> */}
        </div>
    )
}