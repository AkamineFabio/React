
import List from '../../components/List';

/* Simplesmente importa o componente de List, pois o bloco de lista é o mesmo para todas as páginas */
function Home() {

    return (
        <List isDoneFilter={false} />
    )
}

export default Home;