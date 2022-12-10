import { useShareSpecialPostContext } from '../ShareYourWorkForm';
import ContentEditable from 'react-contenteditable'
import { useRef } from 'react'

export default function QuestionCode() {

    const contentEditable = useRef(null);

    const { postInfo, updatePostInfo } = useShareSpecialPostContext()

    const handleCode = ({ target }) => {
        updatePostInfo('questionCode', target.value);
        const control = contentEditable.current.scrollHeight > contentEditable.current.clientHeight; 
        contentEditable.current.style.overflowY = control ? 'scroll' : 'hidden'
    }


    return (
        <div className="question-code">
            <h3>Code</h3>
            <ContentEditable
                innerRef={contentEditable}
                html={postInfo.questionCode}
                disabled={false}
                onChange={handleCode}
                tagName='pre'
                className='code'
            />
        </div>
    )
}