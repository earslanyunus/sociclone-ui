import CompanyLogo from "./CompanyLogo"

const Navbar = () => {
  return (
    <header>
        <nav className="h-14 w-screen border-b flex items-center px-12  border-gray-200">
            <CompanyLogo extraClasses=" mb-auto text-red-500"/>
        </nav>
    </header>
  )
}

export default Navbar