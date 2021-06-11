import React from 'react';
import Header from './header';
import Search from './search';
import GridList from './grid';
import AddEditModal from './modal/add_edit_modal';
import RemoveModal from './modal/remove_modal';
import './currencies.scss';
import useGridActions from './actions/grid_actions';

const Currencies = () => {
  
  const {
    addEditModalMode,
    editModel,
    removeID,
    currencies,
    searchBy,
    setSearchBy,
    addCurrencyHandler,
    submitChanges,
    editHandler,
    deleteHandler,
    deleteSubmitHandler,
    modalClose,
  } = useGridActions();

  return(
    <>
      <Header addCurrencyHandler={addCurrencyHandler} />
      <main>
        <Search setSearchBy={setSearchBy}/>
        <GridList
          currencies={currencies.filter((x) => x.name.indexOf(searchBy) > -1)}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
        <AddEditModal
          mode={addEditModalMode}
          modalClose={modalClose}
          submitChanges={submitChanges}
          editModel={editModel}
        />
        <RemoveModal
          id={removeID}
          modalClose={modalClose}
          deleteSubmitHandler={deleteSubmitHandler}
        />
      </main>
    </>
  )
}

export default Currencies;