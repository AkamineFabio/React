
import List from '../../components/List';

/* Simplesmente importa o componente de List, pois o bloco de lista é o mesmo para todas as páginas */
function Completed() {

    return (
        <List isDoneFilter={true} />
    )
}

export default Completed;