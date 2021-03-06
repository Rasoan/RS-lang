import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Box, Divider } from '@material-ui/core';

import AppSectionCard from '../../components/AppSectionCard';
import UserProgressCard from '../../components/UserProgressCard';
import PATH from '../../constants/path';
import { GAMES, WORD_CARD } from '../../constants/section';
import style from './MainPage.module.scss';

const MainPage = ({ setGameName, serverSynchronization }) => {
  useEffect(() => {
    serverSynchronization();
  }, []);
  const { name: cardName, description: cardDescription } = WORD_CARD;
  const gameCards = GAMES.map((game) => {
    const { path, name, description } = game;

    return (
      <Box onClick={() => setGameName(name)} m={1} key={`MainPage__${name}`}>
        <AppSectionCard path={path} name={name} description={description} />
      </Box>
    );
  });

  return (
    <div className={style.Main}>
      <Container maxWidth="sm">
        <Grid container justify="space-around" mb={2}>
          <Box mb={2}>
            <AppSectionCard path={PATH.WORD_CARD} name={cardName} description={cardDescription} />
          </Box>
          <Box mb={2}>
            <UserProgressCard />
          </Box>
        </Grid>
        <Divider />
        <Box m={2}>
          <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
            {gameCards}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

MainPage.propTypes = {
  setGameName: PropTypes.func.isRequired,
  serverSynchronization: PropTypes.func.isRequired,
};

export default MainPage;
