
export default function TestComp() {

    const handleRange = ({ target }) => {
        console.log(target.value)
    }


    return <input onChange={handleRange} type='range' />
}