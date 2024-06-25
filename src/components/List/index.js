import './list.css';
import { useState, useEffect, useContext } from 'react';
import { DataListContext } from '../../contexts/context';
import { useFetchAPI } from '../../usefetchAPI';
import ListItem from '../ListItem';
import Footer from '../Footer';

export default function List(props) {

    let isDoneFilterOn = props.isDoneFilter;
    const [inputValue, setInputValue] = useState('');
    const { list, setList, controller } = useContext(DataListContext);
    const [toggleAll, setToggleAll] = useState(false);

    useFetchAPI(); /* Requisição do JSON, a pré-lista fornecida para o desafio */

    /* Adiciona uma tarefa na lista , com o valor isDone falso como pedido no desafio*/
    const addNewTask = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            const newTaskObject = { id: Date.now(), title: inputValue, isDone: false };
            setList([newTaskObject, ...list]);
            setInputValue('');
        }
    }

    /* Faz todos os elementos da lista alternarem entre false e true para a chave isDone. Serve para o botão do input de texto, a seta para baixo */
    const completedTasks = () => {
        const updatedTasks = list.map(task => ({
            ...task,
            isDone: !toggleAll,
        }));
        setList(updatedTasks);
    }

    return (
        <main className="main">
            <h1 className="main__title">todos</h1>
            <section className='list__container'>
                <div className='input__container'>
                    <input className='list__input-toogleAll' type='checkbox' value={toggleAll} onChange={() => { setToggleAll(!toggleAll); completedTasks() }}></input>
                    <input className='list__input' style={{ 'box-shadow': `${list}` ? '0 4px 8px rgba(0, 0, 0, 0.24);' : '0 4px 8px rgba(0, 0, 0, 0.12),0 4px 8px rgba(0, 0, 0, 0.24);' }} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={addNewTask} placeholder='What needs to be done?'></input>
                </div>
                <ul className='list__items-container'>
                    {
                        list?.map((item) => {
                            if (controller === 'all') {
                                return (
                                    <ListItem key={item.id} id={item.id} isDone={item.isDone} title={item.title}></ListItem>
                                )
                            } else if (controller === 'active' && !item.isDone) {
                                return (
                                    <ListItem key={item.id} id={item.id} isDone={item.isDone} title={item.title}></ListItem>
                                )
                            } else if (controller === 'completed' && item.isDone) {
                                return (
                                    <ListItem key={item.id} id={item.id} isDone={item.isDone} title={item.title}></ListItem>
                                )
                            }
                        })
                    }
                </ul>
            </section>
            <Footer />
            <ul className='main__tips-container'>
                <li className='main__tips'>Double-click to edit a todo</li>
                <li className='main__tips'>Created by the TodoMVC Team</li>
                <li className='main__tips'>Part of TodoMVC</li>
                <li className='main__tips'>Author: Fabio Akamine</li>
            </ul>

        </main>
    )
}

