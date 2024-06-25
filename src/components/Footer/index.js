import { Link, NavLink } from "react-router-dom";
import './footer.css';
import { DataListContext } from "../../contexts/context";
import { useContext, useEffect } from "react";

export default function Footer() {

    /* Contexto usado para o componente, ele irá ser renderizado em todas as 3 páginas */
    const { controller, setController, itemsLeft, setItemsLeft, list, setList } = useContext(DataListContext);

    /* Toda vez que a lista é atualizada, confere quais estão com o valor de isDone falso ainda, para atualizar o marcador de itens restantes.Como o list é um variável que está no 
    contexto, mesmo que outro componente altere ele, a mudança irá surtir efeito nesse componente também */
    useEffect(() => {
        let newCount = 0;
        list?.forEach(item => {
            if (!item.isDone) {
                newCount++;
            }
        });
        setItemsLeft(newCount);
    }, [list]);

    /* Função para o botão de limpar todos os itens da lista que já foram marcados como completo.*/
    const clearCompleted = () => {
        setList(list.filter(item => item.isDone === false));
    }


    /* Aqui coloquei renderizações condicionais:
    • A primeira conferindo se existe algum elemento na lista, pois se a lista está vazia, o footer não aparece.
    • A segunda é em relação ao plural, se existe somente um elemento na lista, é mostrado item no singular, se há mais de 1, itemS
    • Os links são para a borda, indicando qual filtro da lista está ativo  
    • Os cliques nos links alteram o valor do controller, de acordo com o nome do controller, o estilo será aplicado ao link ativo*/
    return (
        <footer className="footer">
            {list?.length > 0 && (
                <div className="footer__content">
                    <ul className="filters">
                        <li>{itemsLeft} {itemsLeft > 1 ? `items left` : `item left`}</li>
                        <nav className="nav">
                            <li><Link style={{ 'border': `${controller === 'all' ? '2px solid red' : 'none'} ` }} onClick={() => setController('all')} className="link" to={'/'}>all</Link></li>
                            <li><Link style={{ 'border': `${controller === 'active' ? '2px solid red' : 'none'} ` }} onClick={() => setController('active')} className="link" to={'/active'}>active</Link></li>
                            <li><Link style={{ 'border': `${controller === 'completed' ? '2px solid red' : 'none'} ` }} onClick={() => setController('completed')} className="link" to={'/completed'}>completed</Link></li>
                        </nav>
                        <li className="footer__btn-clear" onClick={clearCompleted}>Clear Completed</li>
                    </ul>
                </div>

            )}

        </footer>
    )
}