import RoutesApp from "./routes";
import ListProvider from "./contexts/context";
import './App.css';
/* App.css faz o reset de algumas estilizações que o proprio navegador faz, assim como faz a fonte ser aplicada em todos os componentes */

/* Contexto em volta de tudo e Componente de Rotas */
function App() {
  return (
    <ListProvider>
      <RoutesApp />
    </ListProvider>
  );
}

export default App;
