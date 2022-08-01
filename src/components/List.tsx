import { useState } from "react"

type ListProps = {
  initialItems: string[]
}

export function List({ initialItems }: ListProps) {

  const [newValue, setNewValue] = useState('');
  const [list, setList] = useState(initialItems);

  // Simulando uma chamada na API, com 500 milesegundos de atraso;
  function addToList() {
    setTimeout(() => {
      setList(state => [...state, newValue]);
    }, 500)
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList(state => state.filter(item => item !== item));
    }, 500)
  }

  return (
    <>
      <h1 className="test">Hello World!</h1>
      <input placeholder="Novo Elemento" value={newValue} onChange={e => setNewValue(e.target.value)} />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>)}
      </ul>
    </>
  )
}
