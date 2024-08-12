export default function Header(){
    return (
        <div className="header">
            <img src={`${process.env.PUBLIC_URL}/assets/NOTEFLIX.png`} alt="Noteflix logo" height={80}/>
        </div>
    );
}