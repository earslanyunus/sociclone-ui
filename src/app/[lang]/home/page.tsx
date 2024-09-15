import SignoutBtn from "@/components/SignoutBtn";

const HomePage = ({ params: { lang } }: { params: { lang: string } }) => {
    return (
        <div>
            <h1> {lang === 'tr' ? 'Ana sayfa' : 'Home'} </h1>
            <SignoutBtn  lang={lang}/>
        
        </div>
    )
}

export default HomePage;