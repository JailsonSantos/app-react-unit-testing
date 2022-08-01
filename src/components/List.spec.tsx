import { render, fireEvent, getByPlaceholderText, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import { List } from './List';
//Teste aleatório
test('Sum', () => {
  const { getByText } = render(<List initialItems={['Jailson', 'Davi', 'Langela']} />);

  expect(getByText('Hello World!')).toHaveAttribute('class', 'test');
});

describe('List Component', () => {

  /* 
  
    it('should render list items', async () => {
      const { getByText, rerender, queryByText } = render(<List initialItems={['Jailson', 'Davi', 'Langela']} />);

      expect(getByText('Jailson')).toBeInTheDocument()
      expect(getByText('Davi')).toBeInTheDocument()
      expect(getByText('Langela')).toBeInTheDocument()

      // Permite re-renderizar um componente, trocando as props que são passadas para ele
      rerender(<List initialItems={['Missilene']} />)

      expect(getByText('Julia')).toBeInTheDocument()
      expect(queryByText('Langela')).not.toBeInTheDocument()
    });

  */

  it('should render list items', () => {
    const { getByText } = render(<List initialItems={['Jailson', 'Davi', 'Langela']} />);

    expect(getByText('Jailson')).toBeInTheDocument()
    expect(getByText('Langela')).toBeInTheDocument()
    expect(getByText('Davi')).toBeInTheDocument()
  });

  it('should be able add new item to the list', async () => {
    const user = userEvent.setup();

    const { getByText, getByPlaceholderText, findByText, debug } = render(<List initialItems={[]} />);

    const inputElement = getByPlaceholderText("Novo Elemento");
    const addButton = getByText('Adicionar');

    //debug() mostra o componente em html no terminal do vscode

    await user.type(inputElement, 'Novo');
    await user.click(addButton);

    //debug()

    expect(await findByText('Novo')).toBeInTheDocument();

  });

  it('should be able to add remove new item from the list', async () => {
    const user = userEvent.setup();

    const { getByText, getAllByText, queryByText } = render(<List initialItems={['Jailson']} />);

    const removeButton = getAllByText('Remover');

    await user.click(removeButton[0]);

    /*     
      // Outra forma de fazer com o getByText
      await waitForElementToBeRemoved(() => {
        return getByText('Jailson')
      });
   */

    // Outra forma de fazer com o queryByText, pois eu quero garante que o test não falhe,
    // Já que eu esper que o elemento não seja encontrado
    await waitFor(() => {
      expect(queryByText('Jailson')).not.toBeInTheDocument()
    });

  });
});