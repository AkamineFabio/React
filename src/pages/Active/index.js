import './active.css';
import List from '../../components/List';


/* Simplesmente importa o componente de List, pois o bloco de lista é o mesmo para todas as páginas */
function Active() {

    return (
        <List isDoneFilter={false} />
    )
}

export default Active;