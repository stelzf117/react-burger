import { memo } from 'react';
import BurgerIngridients from '../burger-ingredients/burger-ingredients.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.js';
import AppHeader from '../app-header/app-header.js';
import styles from '../../styles/app.module.css';
// store
import { useSelector } from 'react-redux';
// DND
import { DndProvider  } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = memo(() => {
  const ingredientsFailed = useSelector(store => store.ingredientsReducer.ingredientsFailed)

  const { main } = styles;
  return (
    <>
      { ingredientsFailed ? ('произошла ошибка') : (
        <>
          <AppHeader />
          <main className={ main }>
            <DndProvider backend={ HTML5Backend }>
              <BurgerIngridients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      )}
    </>
  )
});

export default App;