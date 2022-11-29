import React, {useState} from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Navigation from './navigations';
import {images} from './utils/images';
import { UserProvider } from './contexts';

//
// commit test

const App = () => {
    const [isReady, setIsReady] = useState(false);

    const _loadassets = async () => {
        const imagesAssets = cacheImages([
            require('../assets/splash.png'),
            ...Object.values(images),
        ]);
       // const fontAssets = cacheFonts([]);

        //await Promise.all([...imageAssets, ...fontAseets]);
    };

    return (
      <ThemeProvider theme={theme}>
        <UserProvider>
            <StatusBar barStyle="dark-content" />
            <Navigation/>
        </UserProvider>
      </ThemeProvider>
    );
  };
  
  export default App;