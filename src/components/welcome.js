
export const Welcome = (props) => {
    const {rocky , textInner, action, children, graduates} = props
    return (
    <>
        <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-bienvenida_114360-5022.jpg?t=st=1653359601~exp=1653360201~hmac=1043f10f004373027e1df2282cf24acfbf75902cc087a5970f59f673630fcfbb&w=400" alt=""/>
        {rocky}

        <button type="button" onClick={action}>SergioLUY</button>
        {textInner}

        {graduates && graduates.map(graduate => children(graduate))}
    </>
    )
}