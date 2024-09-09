export default function SpacerHeight(props) {

    const style = {
        width: "100%",
        height: `${props.height}px`,
    };

    return (    

        <div className={`custom-spacer w-full ${props.className}`} style={style}></div>

    )

}