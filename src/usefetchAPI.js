import { DataListContext } from "./contexts/context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";


/* Hook para requisição do JSON. Aqui também apliquei a lista na sessionStorage para que não haja requisições subsequentes para talvez
as mesmas tarefas. Usei o axios, mas poderia ter feito sem, usando somente o fetch
O try/catch parece ser uma boa prática para lidar com erros ao usar o async/await */
export const useFetchAPI = () => {
    const { list, setList } = useContext(DataListContext);

    useEffect(() => {

        const fetchData = async () => {
            const requestAlreadyMade = sessionStorage.getItem('requestAlreadyMade');
            if (!requestAlreadyMade) {
                try {
                    const res = await axios.get('https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos');
                    console.log(res.data);
                    console.log(res.data[0].title);
                    setList(res.data);
                    sessionStorage.setItem('preData', JSON.stringify(res.data));
                    sessionStorage.setItem('requestAlreadyMade', 'true');
                } catch (e) {
                    alert(e.message);
                }
            } else {
                const preData = sessionStorage.getItem('preData');
                if (preData) {
                    if (list) {
                        setList(list);
                    } else {
                        setList(JSON.parse(preData));
                    }
                }

            }
        };

        fetchData();
        console.log(list);
    }, []);

}