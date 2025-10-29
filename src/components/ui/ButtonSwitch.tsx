import * as React from 'react';
import Switch from '@mui/material/Switch';
import { useGlobal } from '../../context/GlobalContext';

export default function ControlledSwitches() {
  const { themeMode, setThemeMode } = useGlobal()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.checked ? "light" : "dark");
  };

  return (
    <Switch
      checked={themeMode === "light" ? true : false }
      onChange={handleChange}
      slotProps={{ input: { 'aria-label': 'controlled' } }}
      className='mr-4'
    />
  );
}