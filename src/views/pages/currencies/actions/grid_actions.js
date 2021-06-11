import { useEffect, useState } from 'react';
import ModalModes from '../../../../constants/modal_modes';
import firebase from '../../../../utils/firebase';

const useGridActions = () =>{
  const [addEditModalMode, setAddEditModalMode] = useState(ModalModes.none);
  const [editModel, setEditModel] = useState(null);
  const [removeID, setRemoveID] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [searchBy, setSearchBy] = useState('');

  const addCurrencyHandler = () => {
    setAddEditModalMode(ModalModes.add);
  };

  const submitChanges = (event) => {
    event.preventDefault();
    const currencyRef = firebase.database().ref('Currencies');
    const formValues = new FormData(event.target);
    
    if (addEditModalMode === ModalModes.edit) {
      const updateCurrency = firebase.database().ref('Currencies').child(editModel.uniqueKey);
      updateCurrency.update({
        name: formValues.get('name'),
        rate: formValues.get('rate'),
      });
    }
    else if(addEditModalMode === ModalModes.add){
      const generateID = currencies.length > 0
        ? currencies[currencies.length - 1].id + 1
        : 1;

      let currencyData = {
        id: generateID,
        name: formValues.get('name'),
        rate: formValues.get('rate'),
      };
      currencyRef.push(currencyData);
    }
    modalClose();
    getCurrencies();
  }

  const editHandler = (editCurrency) => {
    setEditModel(editCurrency);
    setAddEditModalMode(ModalModes.edit);
  }

  const getCurrencies = () => {
    const currenciesData = firebase.database().ref('Currencies');

    currenciesData.on('value', (snapshot) => {
      const data = snapshot.val();
      const dataList = [];
      for(let uniqueKey in data){
        const dbData = {
          uniqueKey,
          ...data[uniqueKey],
          id: parseInt(data[uniqueKey].id),
        }
        dataList.push(dbData);
      }
      dataList.sort((a, b) => a.id - b.id)
      setCurrencies(dataList);
    })
  }

  const deleteHandler = (id) => {
    setRemoveID(id);
  }

  const deleteSubmitHandler = () => {
    if(removeID !== ''){
      const deleteCurrency = firebase.database().ref('Currencies').child(removeID);
      deleteCurrency.remove();
      setRemoveID('');
      getCurrencies();
    }
  }

  const modalClose = () => {
    setAddEditModalMode(ModalModes.none);
    setRemoveID('');
    setEditModel(null);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return {
    addEditModalMode,
    editModel,
    removeID,
    currencies,
    searchBy,
    setSearchBy,
    addCurrencyHandler,
    submitChanges,
    editHandler,
    getCurrencies,
    deleteHandler,
    deleteSubmitHandler,
    modalClose,
  }
}

export default useGridActions;
