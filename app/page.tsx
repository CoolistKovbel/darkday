
import CardList from '@/components/CardList'
import CategoryList from '@/components/CategoryList'
import Featured from '@/components/Featured'
import Menu from '@/components/Menu'



interface HomeProps {
  searchParams: any;
}


export default function Home({searchParams}: HomeProps) {
  

  const page = parseInt(searchParams.page) || 1

  return (
    <main className="w-full">
      <Featured />

      <CategoryList />

      <div className='flex justify-between gap-[50px] flex-col md:flex-row'>
        
        <CardList page={page}  cat="code"/>

        <Menu />
        
      </div>
    </main>
  )
}
