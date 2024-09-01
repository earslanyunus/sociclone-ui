
type CompanyLogoProps = {
  extraClasses?: string
}

const CompanyLogo = ({extraClasses }: CompanyLogoProps) => {
  return (
    <div><p 
    className={`text-5xl p-4 font-bold text-white ${extraClasses}`}
    >SOCICLONE</p></div>
  )
}

export default CompanyLogo