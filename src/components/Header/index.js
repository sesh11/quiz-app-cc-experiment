import React, { useState } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import useDarkMode from '../../hooks/useDarkMode';

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  let isAppInstalled = false;

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  return (
    <Menu stackable inverted>
      <Menu.Item header>
        <h1>QuizApp</h1>
      </Menu.Item>
      <Menu.Item position="right">
        <Button
          icon
          basic
          inverted
          onClick={toggleDarkMode}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <Icon name={isDarkMode ? 'sun' : 'moon'} />
        </Button>
        {promptEvent && !isAppInstalled && (
          <Button
            color="teal"
            icon="download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
            style={{ marginLeft: '10px' }}
          />
        )}
      </Menu.Item>
    </Menu>
  );
};

export default Header;
