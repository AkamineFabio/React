import { useState, createContext, Children } from "react";

export const DataListContext = createContext({});

function ListProvider({ children }) {

    const [list, setList] = useState();
    const [itemsLeft, setItemsLeft] = useState(0)
    const [controller, setController] = useState('all');

    /* Contextos, uma para a lista das tarefas, outra para a quantidade de itens restantes a serem completados e outra para controlar em 
    qual página/filtro está */

    return (
        <DataListContext.Provider value={{ list, setList, controller, setController, itemsLeft, setItemsLeft }}>
            {children}
        </DataListContext.Provider>
    )
}

export default ListProvider;