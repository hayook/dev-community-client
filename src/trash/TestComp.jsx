
export default function TestComp() {

    const element = ''
    return (
        <>
          <div dangerouslySetInnerHTML={{__html: element}}></div>      
        </>
    )
}