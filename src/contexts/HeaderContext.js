import { createContext, useMemo, useState } from 'react';

export const HeaderContext = createContext('');

function HeaderProvider({ children }) {
  const [inputSearchValue, setInputSearchValue] = useState('');

  const contextValues = useMemo(() => ({
    inputSearchValue, setInputSearchValue,
  }), [inputSearchValue, setInputSearchValue]);

  return (
    <HeaderContext.Provider value={ contextValues }>
      { children }
    </HeaderContext.Provider>
  );
}

HeaderProvider.propTypes = {}.isRequired;

export default HeaderProvider;
