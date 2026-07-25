
interface Props {
    className?: string;
}
const Separator = ({className}: Props) => {
  return (
    <div className={`bg-slate-200 h-px my-5 ${className}`}>

    </div>
  )
}

export default Separator
