import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Card,
  Box,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Fab,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import MusicIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

import WordInput from '../WordInput';
import SentenceWithWord from '../SentenceWithWord';
import URLS from '../../constants/APIUrls';

import styles from './WordCard.module.scss';

const cardState = {
  word: 'instruct',
  image: true,
  wordTranslateText: 'инструктирует',
  transcriptionText: '[instrʌ́kt]',
  textMeaningText: 'To <i>instruct</i> is to teach.',
  textExampleText: 'My teacher <b>instructs</b> us in several subjects.',
  textExampleTranslateText: 'Мой учитель учит нас нескольким предметам',
  PICTURE_URL: `${URLS.ASSETS}files/04_0070.jpg`,
  AUDIO: `${URLS.ASSETS}files/02_0621.mp3`,
  AUDIO_MEANING: `${URLS.ASSETS}files/02_0621_meaning.mp3`,
  AUDIO_EXAMPLE: `${URLS.ASSETS}files/02_0621_example.mp3`,
};

const WordCard = ({ settings }) => {
  const {
    isAnswerBtnShow,
    isDelFromLearnBtnShow,
    isFeedBackButtonsShow,
    isImageShow,
    // isAudioShow,
    isAudioMeaningShow,
    isAudioExampleShow,
    isTextMeaningShow,
    isTextExampleShow,
    isTranscriptionShow,
    isWordTranslateShow,
    isTextExampleTranslateShow,
  } = settings;
  const {
    word,
    wordTranslateText,
    transcriptionText,
    textExampleText,
    textExampleTranslateText,
    textMeaningText,
    PICTURE_URL,
    AUDIO,
    AUDIO_MEANING,
    AUDIO_EXAMPLE,
  } = cardState;

  const [isMute, setIsMute] = useState(false);
  const sound = new Audio(AUDIO);
  const soundMeaning = isAudioMeaningShow ? new Audio(AUDIO_MEANING) : null;
  const soundExample = isAudioExampleShow ? new Audio(AUDIO_EXAMPLE) : null;

  const playSoundMeaning = () => {
    if (isAudioMeaningShow) {
      soundMeaning.play();
    }
  };

  const playSoundExample = () => {
    if (isAudioExampleShow) {
      soundExample.play();
    }
    sound.removeEventListener('ended', handlerSoundEnded);
    if (isAudioMeaningShow) {
      soundMeaning.removeEventListener('ended', playSoundExample);
    }
  };

  const handlerSoundEnded = () => {
    if (isAudioMeaningShow) {
      soundMeaning.addEventListener('ended', playSoundExample);
      playSoundMeaning();
    } else {
      playSoundExample();
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (isMute) return;
    sound.addEventListener('ended', handlerSoundEnded);
    sound.play();
  };

  const handlerClickSayWord = () => {
    sound.play();
  };

  const muteSwitchHandler = () => {
    setIsMute(!isMute);
  };

  return (
    <Card className={styles.WordCard__wrapper}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Grid item className={styles.WordCard__header}>
          {isImageShow && (
            <CardMedia
              className={styles.WordCard__image}
              image={PICTURE_URL}
              title="Изучаемое слово"
            />
          )}
        </Grid>
        <Grid item>
          <div>
            {isWordTranslateShow && (
              <Typography className={styles.WordCard__word} gutterBottom variant="h6">
                {wordTranslateText}
              </Typography>
            )}
            {isTranscriptionShow && (
              <Typography className={styles.WordCard__word} gutterBottom variant="h6">
                {transcriptionText}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
      <CardContent className={styles.WordCard__content}>
        <Box mb={2}>
          <form onSubmit={handlerSubmit}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
              <Grid item>
                {isFeedBackButtonsShow && (
                  <Tooltip title="Добавить слово в 'Сложные'" aria-label="add">
                    <Fab color="primary" size="small">
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <WordInput word={word} />
              </Grid>
              <Grid item>
                <Tooltip title="Проверить слово" aria-label="add">
                  <Fab type="submit" color="primary" size="small">
                    <CheckIcon />
                  </Fab>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip onClick={handlerClickSayWord} title="Произнести слово" aria-label="add">
                  <Fab type="button" color="primary" size="small">
                    <VolumeUpIcon />
                  </Fab>
                </Tooltip>
              </Grid>
            </Grid>
          </form>
        </Box>
        {isTextExampleShow && <SentenceWithWord word={word} sentence={textExampleText} />}
        {isTextExampleTranslateShow && (
          <Typography
            className={styles.WordCard__text}
            variant="body1"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            {textExampleTranslateText}
          </Typography>
        )}
        {isTextMeaningShow && <SentenceWithWord word={word} sentence={textMeaningText} />}
      </CardContent>
      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item>
            {isAnswerBtnShow && (
              <Button variant="contained" color="secondary">
                Показать ответ
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Следующее слово
            </Button>
          </Grid>
        </Grid>
        {isDelFromLearnBtnShow && (
          <Box position="absolute">
            <Tooltip title="Удалить слово из изучения">
              <IconButton aria-label="delete">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box position="absolute" right="16px">
          <Tooltip title="Выключить звук">
            <IconButton onClick={muteSwitchHandler} aria-label="mute">
              {isMute ? <MusicOffIcon fontSize="small" /> : <MusicIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
      ;
    </Card>
  );
};

WordCard.propTypes = {
  settings: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.string])).isRequired,
};
export default WordCard;
