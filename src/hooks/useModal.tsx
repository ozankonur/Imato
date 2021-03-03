import {useState} from 'react';

const useModal = (initialState?: boolean | string) => {
  const [visible, setVisible] = useState<boolean | string | undefined>(
    !!initialState,
  );

  const close = () => {
    setVisible(undefined);
  };

  const open = (value?: boolean | string) => {
    setVisible(value ?? true);
  };

  return {
    visible,
    open,
    close,
  };
};

export default useModal;
