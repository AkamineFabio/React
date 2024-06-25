import { useState, useContext, useEffect, useRef } from "react";
import './listitem.css';
import { DataListContext } from "../../contexts/context";


/* Componente para a tarefa, não para a lista completa */
export default function ListItem(props) {

    const { list, setList } = useContext(DataListContext);
    const { id, title, isDone } = props;
    const [done, setDone] = useState(isDone);
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState(title);

    const inputEdit = useRef();


    /* alterna entre completo e incompleto para a tarefa */
    const toogleDone = () => {
        setList(
            list.map(task =>
                task.id === id ? { ...task, isDone: !isDone } : task
            )
        )
        setDone(!done);
    }

    /* remove a tarefa da lista, função para o botão X
    Usa o filter para remover o elemento com o ID */
    const removeItem = () => {
        setList(list.filter(task => task.id !== id));
    }

    /* confirma a edição da tarefa, trocando o title pelo valor do input de edição */
    const editItem = (e) => {
        if (e.key === 'Enter') {
            setList(
                list.map(task =>
                    task.id === id ? { ...task, title: editValue } : task
                )
            )
            setEdit(false);
        }
    }

    /* clique fora do input de edição faz o modo edição sumir */
    const handleClick = (e) => {
        if (inputEdit.current && !inputEdit.current.contains(e.target)) {
            setEdit(false);
        }
    }

    /* troca o state conforme a chave isDone é trocada também. Usei isso pois outros componentes alteram o valor de isDone também
    não só esse componente, então se por exemplo, o usuário clicar no botão de alternar as tarefas entre todas completas e todas incompletas,
    esse useEffect irá observar se mudanças estão sendo feitas na chave isDone, para o efeito de line-through na tarefa ser aplicado e o "check"
    do input também */
    useEffect(() => {
        if (isDone) {
            setDone(true);
        } else {
            setDone(false);
        }
    }, [isDone]);


    /* Lida com o clique do mouse do usuário, quando clicar fora do input por exemplo, assim como no modelo, sai do modo de edição e a edição 
    não é aplicada */
    useEffect(() => {
        if (edit) {
            document.addEventListener('mousedown', handleClick);
        } else {
            document.removeEventListener('mousedown', handleClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [edit]);


    /* a classe hidden para o botão de excluir tarefa. No CSS, quando o hover é ativado, muda o display da classe .hidden */
    return (
        <li key={id} className="item__li">
            <div className="item__view">
                <input type="checkbox" onChange={toogleDone} checked={done} className="item__input" />
                <label className="item__label" onDoubleClick={() => { setEdit(true); setEditValue(title) }}>{title}</label>
            </div>
            <button className="hidden item__btn-remove" onClick={removeItem}>&times;</button>
            {
                edit && (
                    <input ref={inputEdit} className="item__input-edit" value={editValue} onChange={(e) => { setEditValue(e.target.value) }} onKeyDown={editItem} />
                )
            }
        </li>

    )
}