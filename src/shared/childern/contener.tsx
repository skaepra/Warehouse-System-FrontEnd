interface Prop{
    children: React.ReactNode;
}

function Contener({children}:Prop) {
  return (
    <div className=""> {children} </div>
  )
}

export default Contener